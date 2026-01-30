// Supabase 인증 관리 모듈
const SUPABASE_URL = 'https://ohqujuoruhnfdlxssgrc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_fcOuA9Jev0CyUPUHzUcb6g_Jkvs02aj';

// Supabase 클라이언트 초기화
let supabaseClient = null;

async function initSupabase() {
  if (supabaseClient) return supabaseClient;
  
  // Supabase JS 라이브러리가 로드될 때까지 대기
  if (typeof supabase === 'undefined') {
    console.error('Supabase library not loaded');
    return null;
  }
  
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supabaseClient;
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
  
  // 로컬 스토리지 정리
  localStorage.removeItem('user');
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
        callback(event, session);
      });
    }
  });
}

// 로그인 상태 확인
async function isLoggedIn() {
  const session = await getSession();
  return !!session;
}

// 인증 필요 페이지 보호
async function requireAuth(redirectUrl = '/login') {
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    window.location.href = redirectUrl;
    return false;
  }
  return true;
}

// 이미 로그인된 경우 리다이렉트
async function redirectIfLoggedIn(redirectUrl = '/dashboard') {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    window.location.href = redirectUrl;
    return true;
  }
  return false;
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
  formatUserInfo
};

console.log('Supabase Auth module loaded');
