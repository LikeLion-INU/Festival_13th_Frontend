import axios from "axios";
import API_BASE_URL from './apiConfig';

// 전역 axios 설정
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// 요청 인터셉터 - 토큰 추가 등의 작업 수행
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리 등의 작업 수행
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 에러 시 로그아웃 처리 등을 수행할 수 있습니다
    if (error.response && error.response.status === 401) {
      // 로그아웃 처리
      console.log('인증 만료, 로그아웃 필요');
    }
    return Promise.reject(error);
  }
);

// 모든 API 함수를 한곳에서 export

// auth.js에서 내보낸 함수들 재내보내기
export { 
  checkInstagramId,
  loginUser,
  signupUser 
} from './auth';

// survey.js에서 내보낸 함수들 재내보내기
export { 
  submitAnswers 
} from './survey';

// matching.js에서 내보낸 함수들 재내보내기
export {
  getMatchingResult
} from './matching';
