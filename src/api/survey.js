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
      message: '돌아가서 답변을 다시 제출해주세요.' 
    };
  }
}; 