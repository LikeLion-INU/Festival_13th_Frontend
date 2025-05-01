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

// 매칭 관련 API 호출 함수들

// 매칭 결과 조회 API
export const getMatchingResult = async () => {
  try {
    const response = await api.get('/matching-result');
    
    return response.data;
  } catch (error) {
    console.error('매칭 결과 조회 중 오류 발생:1', error);
    return { 
      status: 'error', 
      message: '서버 연결에 실패했습니다.1' 
    };
  }
}; 