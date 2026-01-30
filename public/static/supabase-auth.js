// Supabase 인증 관리 모듈
const SUPABASE_URL = 'https://ohqujuoruhnfdlxssgrc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_fcOuA9Jev0CyUPUHzUcb6g_Jkvs02aj';

// Supabase 클라이언트 초기화
let supabaseClient = null;
let authInitialized = false;
let authInitPromise = null;

async function initSupabase() {
  if (supabaseClient && authInitialized) return supabaseClient;
  
  // 이미 초기화 중이면 완료될 때까지 대기
  if (authInitPromise) return authInitPromise;
  
  authInitPromise = new Promise(async (resolve) => {
    // Supabase JS 라이브러리가 로드될 때까지 대기
    if (typeof supabase === 'undefined') {
      console.error('Supabase library not loaded');
      resolve(null);
      return;
    }
    
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
    }
    
    // 세션 복원을 기다림 - onAuthStateChange의 INITIAL_SESSION 이벤트 대기
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') {
        authInitialized = true;
        subscription.unsubscribe();
        resolve(supabaseClient);
      }
    });
    
    // 타임아웃 설정 (3초 후에는 어쨌든 진행)
    setTimeout(() => {
      if (!authInitialized) {
        authInitialized = true;
        resolve(supabaseClient);
      }
    }, 3000);
  });
  
  return authInitPromise;
}

// 회원가입
async function signUp(email, password, userData) {
  const client = await initSupabase();
  if (!client) throw new Error('Supabase not initialized');
  
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: userData.name,
        center_name: userData.centerName,
        credits: 15 // 초기 크레딧
      }
    }
  });
  
  if (error) throw error;
  return data;
}

// 로그인
async function signIn(email, password) {
  const client = await initSupabase();
  if (!client) throw new Error('Supabase not initialized');
  
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
}

// 로그아웃
async function signOut() {
  const client = await initSupabase();
  if (!client) throw new Error('Supabase not initialized');
  
  const { error } = await client.auth.signOut();
  if (error) throw error;
  
  return true;
}

// 현재 세션 가져오기
async function getSession() {
  const client = await initSupabase();
  if (!client) return null;
  
  const { data: { session }, error } = await client.auth.getSession();
  if (error) {
    console.error('Session error:', error);
    return null;
  }
  return session;
}

// 현재 사용자 가져오기
async function getCurrentUser() {
  const client = await initSupabase();
  if (!client) return null;
  
  // 먼저 세션에서 사용자 가져오기 시도 (더 빠름)
  const session = await getSession();
  if (session?.user) {
    return session.user;
  }
  
  // 세션이 없으면 getUser 호출
  const { data: { user }, error } = await client.auth.getUser();
  if (error) {
    console.error('User error:', error);
    return null;
  }
  return user;
}

// 사용자 크레딧 조회
async function getUserCredits(userId) {
  const client = await initSupabase();
  if (!client) return 15; // 기본값
  
  try {
    const { data, error } = await client
      .from('credits')
      .select('balance')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      // 크레딧 테이블이 없거나 데이터가 없으면 user_metadata에서 가져옴
      const user = await getCurrentUser();
      return user?.user_metadata?.credits || 15;
    }
    return data?.balance || 15;
  } catch (e) {
    // 테이블이 없는 경우 기본값 반환
    const user = await getCurrentUser();
    return user?.user_metadata?.credits || 15;
  }
}

// 인증 상태 변경 리스너
function onAuthStateChange(callback) {
  initSupabase().then(client => {
    if (client) {
      client.auth.onAuthStateChange((event, session) => {
        // INITIAL_SESSION은 초기화 시에만 발생하므로 제외
        if (event !== 'INITIAL_SESSION') {
          callback(event, session);
        }
      });
    }
  });
}

// 로그인 상태 확인
async function isLoggedIn() {
  const session = await getSession();
  return !!session;
}

// 인증 필요 페이지 보호 - 개선된 버전
async function requireAuth(redirectUrl = '/login') {
  try {
    const session = await getSession();
    
    if (!session) {
      console.log('No session found, redirecting to login');
      window.location.href = redirectUrl;
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Auth check error:', error);
    window.location.href = redirectUrl;
    return false;
  }
}

// 이미 로그인된 경우 리다이렉트
async function redirectIfLoggedIn(redirectUrl = '/dashboard') {
  try {
    const session = await getSession();
    
    if (session) {
      console.log('Session found, redirecting to dashboard');
      window.location.href = redirectUrl;
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}

// 사용자 정보 포맷팅
function formatUserInfo(user) {
  if (!user) return null;
  
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.name || user.email?.split('@')[0] || '사용자',
    centerName: user.user_metadata?.center_name || null,
    credits: user.user_metadata?.credits || 15,
    createdAt: user.created_at
  };
}

// ============================================
// Centers 테이블 관련 함수
// ============================================

// 사용자의 센터 정보 조회
async function getUserCenter(userId) {
  const client = await initSupabase();
  if (!client) return null;
  
  try {
    const { data, error } = await client
      .from('centers')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      // 데이터가 없는 경우 (PGRST116) 또는 테이블이 없는 경우
      if (error.code === 'PGRST116' || error.code === '42P01') {
        return null;
      }
      console.error('Center fetch error:', error);
      return null;
    }
    return data;
  } catch (e) {
    console.error('Center fetch exception:', e);
    return null;
  }
}

// 센터 정보 저장
async function saveCenter(centerData) {
  const client = await initSupabase();
  if (!client) throw new Error('Supabase not initialized');
  
  const session = await getSession();
  if (!session?.user) throw new Error('User not authenticated');
  
  const { data, error } = await client
    .from('centers')
    .insert({
      user_id: session.user.id,
      center_name: centerData.centerName,
      origin_story: centerData.originStory,
      care_philosophy: centerData.carePhilosophy,
      core_principle: centerData.corePrinciple,
      unique_detail: centerData.uniqueDetail,
      vision: centerData.vision,
      other_strengths: centerData.otherStrengths
    })
    .select()
    .single();
  
  if (error) throw error;
  
  // user_metadata에도 센터명 업데이트
  await client.auth.updateUser({
    data: { center_name: centerData.centerName }
  });
  
  return data;
}

// 센터 정보 업데이트
async function updateCenter(centerId, centerData) {
  const client = await initSupabase();
  if (!client) throw new Error('Supabase not initialized');
  
  const { data, error } = await client
    .from('centers')
    .update({
      center_name: centerData.centerName,
      origin_story: centerData.originStory,
      care_philosophy: centerData.carePhilosophy,
      core_principle: centerData.corePrinciple,
      unique_detail: centerData.uniqueDetail,
      vision: centerData.vision,
      other_strengths: centerData.otherStrengths,
      updated_at: new Date().toISOString()
    })
    .eq('id', centerId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// 온보딩 필요 여부 확인 (센터 정보 없으면 온보딩 필요)
async function checkOnboardingRequired() {
  const session = await getSession();
  if (!session?.user) return false;
  
  const center = await getUserCenter(session.user.id);
  return !center; // 센터 정보가 없으면 true
}

// 대시보드 진입 시 온보딩 체크
async function requireOnboarding() {
  const needsOnboarding = await checkOnboardingRequired();
  if (needsOnboarding) {
    window.location.href = '/onboarding';
    return true;
  }
  return false;
}

// 전역으로 내보내기
window.SupabaseAuth = {
  init: initSupabase,
  signUp,
  signIn,
  signOut,
  getSession,
  getCurrentUser,
  getUserCredits,
  onAuthStateChange,
  isLoggedIn,
  requireAuth,
  redirectIfLoggedIn,
  formatUserInfo,
  // Centers 관련
  getUserCenter,
  saveCenter,
  updateCenter,
  checkOnboardingRequired,
  requireOnboarding
};

console.log('Supabase Auth module loaded');
