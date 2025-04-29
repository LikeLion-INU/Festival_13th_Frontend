import axios from 'axios';
import API_BASE_URL from './apiConfig';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 세션 쿠키 포함
  headers: {
    'Content-Type': 'application/json'
  }
});

// 인증 관련 API 호출 함수들

// 인스타그램 ID 확인 API
export const checkInstagramId = async (instagramId) => {
  try {
    const response = await api.post('/auth/check', { 
      instaId: instagramId 
    });
    
    return response.data;
  } catch (error) {
    console.error('인스타그램 ID 확인 중 오류 발생:', error);
    return { 
      status: 'error', 
      message: '서버 연결에 실패했습니다.' 
    };
  }
};

// 로그인 API
export const loginUser = async (instagramId) => {
  try {
    const response = await api.post('/login', { 
      instaId: instagramId 
    });
    
    return response.data;
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    return { 
      status: 'error', 
      message: '서버 연결에 실패했습니다. 다시 시도해주세요.' 
    };
  }
};

export const signupUser = async (instagramId, gender) => {
  try {
    const response = await api.post('/auth/signup', { gender: gender });
    return response.data;
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    return { 
      status: 'error', 
      message: '서버 연결에 실패했습니다. 다시 시도해주세요.' 
    };
  }
};

// 로그인 상태 확인 API 추가
export const checkLoginStatus = async () => {
  try {
    const response = await api.get('/auth/status');
    return response.data;
  } catch (error) {
    console.error('로그인 상태 확인 중 오류 발생:', error);
    return { 
      status: 'error', 
      isLoggedIn: false,
      message: '서버 연결에 실패했습니다.' 
    };
  }
};
