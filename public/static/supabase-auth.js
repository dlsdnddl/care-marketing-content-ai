// Supabase 인증 및 데이터베이스 관리 모듈
const SUPABASE_URL = 'https://ohqujuoruhnfdlxssgrc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_fcOuA9Jev0CyUPUHzUcb6g_Jkvs02aj';

// Supabase 클라이언트 초기화
let supabaseClient = null;
let authInitialized = false;
let authInitPromise = null;

async function initSupabase() {
  if (supabaseClient && authInitialized) return supabaseClient;
  
  if (authInitPromise) return authInitPromise;
  
  authInitPromise = new Promise(async (resolve) => {
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
    
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') {
        authInitialized = true;
        subscription.unsubscribe();
        resolve(supabaseClient);
      }
    });
    
    setTimeout(() => {
      if (!authInitialized) {
        authInitialized = true;
        resolve(supabaseClient);
      }
    }, 3000);
  });
  
  return authInitPromise;
}

// ============================================
// 인증 함수
// ============================================

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
        credits: 15
      }
    }
  });
  
  if (error) throw error;
  
  // 회원가입 시 credits 테이블에 초기 크레딧 생성
  if (data.user) {
    try {
      await client.from('credits').insert({
        user_id: data.user.id,
        balance: 15
      });
    } catch (e) {
      console.log('Credits table may not exist yet');
    }
  }
  
  return data;
}

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

async function signOut() {
  const client = await initSupabase();
  if (!client) throw new Error('Supabase not initialized');
  
  const { error } = await client.auth.signOut();
  if (error) throw error;
  return true;
}

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

async function getCurrentUser() {
  const client = await initSupabase();
  if (!client) return null;
  
  const session = await getSession();
  if (session?.user) {
    return session.user;
  }
  
  const { data: { user }, error } = await client.auth.getUser();
  if (error) {
    console.error('User error:', error);
    return null;
  }
  return user;
}

function onAuthStateChange(callback) {
  initSupabase().then(client => {
    if (client) {
      client.auth.onAuthStateChange((event, session) => {
        if (event !== 'INITIAL_SESSION') {
          callback(event, session);
        }
      });
    }
  });
}

async function isLoggedIn() {
  const session = await getSession();
  return !!session;
}

async function requireAuth(redirectUrl = '/login') {
  try {
    const session = await getSession();
    if (!session) {
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

async function redirectIfLoggedIn(redirectUrl = '/dashboard') {
  try {
    const session = await getSession();
    if (session) {
      window.location.href = redirectUrl;
      return true;
    }
    return false;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}

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
// Centers 테이블 함수
// ============================================

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
  
  await client.auth.updateUser({
    data: { center_name: centerData.centerName }
  });
  
  return data;
}

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

async function checkOnboardingRequired() {
  const session = await getSession();
  if (!session?.user) return false;
  
  const center = await getUserCenter(session.user.id);
  return !center;
}

// ============================================
// Credits 테이블 함수
// ============================================

async function getUserCredits(userId) {
  const client = await initSupabase();
  if (!client) return 15;
  
  try {
    const { data, error } = await client
      .from('credits')
      .select('balance')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      const user = await getCurrentUser();
      return user?.user_metadata?.credits || 15;
    }
    return data?.balance || 15;
  } catch (e) {
    const user = await getCurrentUser();
    return user?.user_metadata?.credits || 15;
  }
}

async function deductCredits(amount, contentType, description) {
  const client = await initSupabase();
  if (!client) throw new Error('Supabase not initialized');
  
  const session = await getSession();
  if (!session?.user) throw new Error('User not authenticated');
  
  const userId = session.user.id;
  
  // 현재 크레딧 확인
  const currentCredits = await getUserCredits(userId);
  if (currentCredits < amount) {
    throw new Error('INSUFFICIENT_CREDITS');
  }
  
  // 크레딧 차감
  const { error: updateError } = await client
    .from('credits')
    .update({ 
      balance: currentCredits - amount,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId);
  
  if (updateError) {
    // credits 테이블이 없으면 생성
    const { error: insertError } = await client
      .from('credits')
      .insert({
        user_id: userId,
        balance: 15 - amount
      });
    
    if (insertError) throw insertError;
  }
  
  // 히스토리 기록
  try {
    await client.from('credit_history').insert({
      user_id: userId,
      amount: -amount,
      type: contentType,
      description: description
    });
  } catch (e) {
    console.log('Credit history insert failed:', e);
  }
  
  return currentCredits - amount;
}

async function getCreditHistory(userId, limit = 10) {
  const client = await initSupabase();
  if (!client) return [];
  
  try {
    const { data, error } = await client
      .from('credit_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) return [];
    return data || [];
  } catch (e) {
    return [];
  }
}

// ============================================
// Contents 테이블 함수
// ============================================

async function saveContent(contentData) {
  const client = await initSupabase();
  if (!client) throw new Error('Supabase not initialized');
  
  const session = await getSession();
  if (!session?.user) throw new Error('User not authenticated');
  
  const { data, error } = await client
    .from('contents')
    .insert({
      user_id: session.user.id,
      type: contentData.type,
      title: contentData.title,
      content: contentData.content,
      metadata: contentData.metadata || {}
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

async function getContents(userId, type = null, limit = 50) {
  const client = await initSupabase();
  if (!client) return [];
  
  try {
    let query = client
      .from('contents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (type) {
      query = query.eq('type', type);
    }
    
    const { data, error } = await query;
    
    if (error) return [];
    return data || [];
  } catch (e) {
    return [];
  }
}

async function getRecentContents(userId, limit = 5) {
  return getContents(userId, null, limit);
}

async function deleteContent(contentId) {
  const client = await initSupabase();
  if (!client) throw new Error('Supabase not initialized');
  
  const session = await getSession();
  if (!session?.user) throw new Error('User not authenticated');
  
  const { error } = await client
    .from('contents')
    .delete()
    .eq('id', contentId)
    .eq('user_id', session.user.id);
  
  if (error) throw error;
  return true;
}

// ============================================
// 유틸리티 함수
// ============================================

function showToast(message, type = 'info') {
  // 기존 토스트 제거
  const existingToast = document.querySelector('.toast-message');
  if (existingToast) existingToast.remove();
  
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-primary-500',
    warning: 'bg-yellow-500'
  };
  
  const toast = document.createElement('div');
  toast.className = `toast-message fixed bottom-20 left-1/2 transform -translate-x-1/2 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('클립보드에 복사되었습니다', 'success');
    return true;
  } catch (err) {
    showToast('복사에 실패했습니다', 'error');
    return false;
  }
}

// 전역으로 내보내기
window.SupabaseAuth = {
  init: initSupabase,
  signUp,
  signIn,
  signOut,
  getSession,
  getCurrentUser,
  onAuthStateChange,
  isLoggedIn,
  requireAuth,
  redirectIfLoggedIn,
  formatUserInfo,
  // Centers
  getUserCenter,
  saveCenter,
  updateCenter,
  checkOnboardingRequired,
  // Credits
  getUserCredits,
  deductCredits,
  getCreditHistory,
  // Contents
  saveContent,
  getContents,
  getRecentContents,
  deleteContent,
  // Utils
  showToast,
  copyToClipboard
};

console.log('Supabase Auth & DB module loaded');
