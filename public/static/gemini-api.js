// Gemini API 호출 모듈
const GEMINI_API_KEY = 'AIzaSyD8fQqvZp1_jLvXM3uW0Nqu_IArcnh4lLY';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Gemini API 호출
async function callGemini(prompt) {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API 호출 실패');
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error('응답 형식 오류');
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

// ============================================
// 블로그 제목 생성
// ============================================
async function generateBlogTitles(mainKeyword, topicHint = '', region = '') {
  const prompt = `너는 방문요양·장기요양 분야 SEO 전문가야.

입력된 키워드로 클릭을 유도하는 블로그 제목 15개를 생성해.

[규칙]
- 제목에 메인 키워드 필수 포함
- 감정·상황·질문을 담아서 "이거 우리 얘기네?" 느낌
- 후킹 요소 포함: 질문형, 숫자, 후회/손해 프레임, 실제 사례
- 45자 이내
- "안내", "정리", "소개"로 끝나지 않게

[입력]
메인 키워드: ${mainKeyword}
${topicHint ? `주제 힌트: ${topicHint}` : ''}
${region ? `지역: ${region}` : ''}

[출력 형식] 
번호. 제목
(15개 출력, 번호와 제목만 출력)`;

  const result = await callGemini(prompt);
  
  // 결과 파싱 - 번호. 제목 형식
  const lines = result.split('\n').filter(line => line.trim());
  const titles = lines
    .filter(line => /^\d+[\.\)]\s*/.test(line))
    .map(line => line.replace(/^\d+[\.\)]\s*/, '').trim())
    .filter(title => title.length > 0);
  
  return titles.length > 0 ? titles : lines.slice(0, 15);
}

// ============================================
// 블로그 글 생성
// ============================================
async function generateBlogPost(topic, keyword, centerName, centerInfo = null) {
  const corePrinciple = centerInfo?.core_principle || '';
  const uniqueDetail = centerInfo?.unique_detail || '';
  const originStory = centerInfo?.origin_story || '';
  const carePhilosophy = centerInfo?.care_philosophy || '';

  const prompt = `너는 전문직 블로그 SEO 전문가야.

아래 정보를 바탕으로 2500자 이상의 블로그 글을 작성해.

[구조]
1. 제목 (키워드 맨 앞 배치)
2. 서론 (독자 공감, 문제 제기, 해결 약속)
3. 본론 (핵심 주장 2-3개, 각각 근거와 사례 포함)
4. 결론 (요약 + CTA: 상담 문의 유도)

[규칙]
- 키워드 6-8회 자연스럽게 포함
- 한 문단 3-4문장 이내
- 전문 용어는 쉽게 풀어서
- 친근하지만 전문적인 톤
- 업체 정보를 자연스럽게 녹여서 신뢰감 형성

[입력]
주제: ${topic}
상위노출 키워드: ${keyword}
업체명: ${centerName}
${corePrinciple ? `업체 핵심 원칙: ${corePrinciple}` : ''}
${uniqueDetail ? `업체 차별화 디테일: ${uniqueDetail}` : ''}
${carePhilosophy ? `운영 철학: ${carePhilosophy}` : ''}
${originStory ? `시작 계기: ${originStory}` : ''}

[출력] 
완성된 블로그 글 전문 (마크다운 형식으로)`;

  return await callGemini(prompt);
}

// ============================================
// 네이버 플레이스 소식 생성
// ============================================
async function generatePlaceNews(centerName, region, sourceContent, pattern, centerInfo = null) {
  const patternDesc = {
    'A': '이웃 호출형 (특정 타겟 콕 집어서 혜택 강조)',
    'B': '상황 공감형 (고민 해결, 문제 상황 공감)',
    'C': '전문성 강조형 (경험, 자격, 노하우 어필)'
  };

  const prompt = `너는 네이버 플레이스 알고리즘 전문가야.

아래 내용을 플레이스 소식으로 변환해.

[규칙]
- 제목: 5-40자, 지역명+키워드+혜택/상황
- 본문: 5-7줄, 팩트+도움 중심
- 마지막 줄: CTA (전화/길찾기 유도)
- 지역 랜드마크 언급

[적용 패턴]
${patternDesc[pattern] || patternDesc['A']}

[입력]
업체명: ${centerName}
지역: ${region}
원본 내용: ${sourceContent || '방문요양 서비스를 제공하는 센터입니다. 어르신의 일상을 따뜻하게 돌봐드립니다.'}
${centerInfo?.care_philosophy ? `운영 철학: ${centerInfo.care_philosophy}` : ''}
${centerInfo?.unique_detail ? `차별화 포인트: ${centerInfo.unique_detail}` : ''}

[출력 형식 - 반드시 이 형식으로만 출력]
제목: (제목 내용)
본문: (본문 내용)`;

  const result = await callGemini(prompt);
  
  // 파싱
  const titleMatch = result.match(/제목[:\s]*(.+?)(?=\n|본문)/s);
  const bodyMatch = result.match(/본문[:\s]*(.+)/s);
  
  return {
    title: titleMatch ? titleMatch[1].trim() : '플레이스 소식',
    body: bodyMatch ? bodyMatch[1].trim() : result
  };
}

// ============================================
// 당근마켓 소식 생성
// ============================================
async function generateCarrotPost(centerName, region, sourceContent, blogUrl, type, centerInfo = null) {
  const typeDesc = {
    'A': '이웃 소개형 (친근하게 이웃에게 인사하는 스타일)',
    'B': '고민 해결형 (문제 상황 공감, 해결책 제시)',
    'C': '혜택 알림형 (이벤트/특별 서비스 안내)'
  };

  const prompt = `너는 당근마켓 동네 커뮤니티 전문가야.

아래 내용을 당근 비즈프로필 소식으로 변환해.

[규칙]
- 제목: 30자 내외, 이모지 활용 (🥕🏡💚)
- 본문: 500-600자, 친근한 해요체
- "안녕하세요"로 시작 금지 - 바로 본론으로
- 지역 랜드마크/특색 언급
${blogUrl ? '- 마지막에 블로그 주소 CTA 포함' : ''}

[적용 유형]
${typeDesc[type] || typeDesc['A']}

[입력]
업체명: ${centerName}
지역: ${region}
원본 내용: ${sourceContent || '방문요양 서비스를 제공하는 센터입니다. 어르신의 일상을 따뜻하게 돌봐드립니다.'}
${blogUrl ? `블로그 주소: ${blogUrl}` : ''}
${centerInfo?.origin_story ? `센터 스토리: ${centerInfo.origin_story}` : ''}
${centerInfo?.unique_detail ? `차별화 포인트: ${centerInfo.unique_detail}` : ''}

[출력 형식 - 반드시 이 형식으로만 출력]
제목: (제목 내용)
본문: (본문 내용)`;

  const result = await callGemini(prompt);
  
  // 파싱
  const titleMatch = result.match(/제목[:\s]*(.+?)(?=\n|본문)/s);
  const bodyMatch = result.match(/본문[:\s]*(.+)/s);
  
  return {
    title: titleMatch ? titleMatch[1].trim() : '당근마켓 소식',
    body: bodyMatch ? bodyMatch[1].trim() : result
  };
}

// ============================================
// 스레드 게시물 생성
// ============================================
async function generateThreads(sourceContent, strategy, centerInfo = null) {
  const strategyDesc = {
    'A': '스토리텔링형 (일화/경험담, 감동 스토리)',
    'B': '정보 공유형 (팁/노하우 리스트, 유용한 정보)',
    'C': '감성 공감형 (공감/위로, 따뜻한 메시지)'
  };

  const prompt = `너는 스레드 인플루언서야.

아래 내용을 스레드 타래 (3-5개)로 변환해.

[규칙]
- 무조건 반말 (~야, ~했어, ~함, ~거든)
- 단문 위주, 줄바꿈 많이
- 첫 글: 강렬한 훅 (스크롤 멈추게)
- 마지막: CTA + 댓글 유도
- "안녕하세요" 절대 금지
- AI스러운 완벽한 문장 금지
- 각 글 200자 내외

[적용 전략]
${strategyDesc[strategy] || strategyDesc['A']}

[입력]
원본 내용: ${sourceContent}
${centerInfo?.center_name ? `센터명: ${centerInfo.center_name}` : ''}

[출력 형식 - 각 글을 구분자 ---로 구분]
(첫 번째 글 내용)
---
(두 번째 글 내용)
---
(세 번째 글 내용)
...`;

  const result = await callGemini(prompt);
  
  // 파싱 - ---로 구분된 타래 분리
  let threads = result.split('---').map(t => t.trim()).filter(t => t.length > 0);
  
  // 번호 형식 제거
  threads = threads.map(t => t.replace(/^\(\d+\/\d+\)\s*/gm, '').replace(/^\d+[\.\)]\s*/gm, '').trim());
  
  // 최소 3개는 보장
  if (threads.length < 3) {
    // 줄바꿈 두 번으로 분리 시도
    threads = result.split(/\n\n+/).map(t => t.trim()).filter(t => t.length > 20);
  }
  
  return threads.slice(0, 5);
}

// 전역으로 내보내기
window.GeminiAPI = {
  call: callGemini,
  generateBlogTitles,
  generateBlogPost,
  generatePlaceNews,
  generateCarrotPost,
  generateThreads
};

console.log('Gemini API module loaded');
