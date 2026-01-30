// Supabase 클라이언트 설정
// 이 파일은 프론트엔드에서 사용되므로 CDN으로 Supabase 클라이언트를 로드합니다.

const SUPABASE_URL = 'https://ohqujuoruhnfdlxssgrc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_fcOuA9Jev0CyUPUHzUcb6g_Jkvs02aj';

// Supabase 클라이언트 초기화 스크립트 (프론트엔드용)
export const supabaseConfig = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY
};

// 백엔드 API에서 사용할 설정
export const getSupabaseClient = () => {
  return {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY
  };
};
