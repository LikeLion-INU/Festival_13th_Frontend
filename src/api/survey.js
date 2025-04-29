// 설문 관련 API 호출 함수들
import axios from 'axios';
import API_BASE_URL from './apiConfig';

// axios 인스턴스 사용
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 답변 제출 API
export const submitAnswers = async (answers) => {
  try {
    const response = await api.post('/member/submit', { answers });
    
    return response.data;
  } catch (error) {
    console.error('답변 제출 중 오류 발생:', error);
    return { 
      status: 'error', 
      message: '서버 연결에 실패했습니다. 다시 시도해주세요.' 
    };
  }
}; 