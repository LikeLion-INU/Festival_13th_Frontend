import axios from "axios";

// API 기본 설정
const API = axios.create({
  baseURL: "https://api.example.com", // 실제 API 주소로 변경해야 합니다
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 토큰 추가 등의 작업 수행
API.interceptors.request.use(
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
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 에러 시 로그아웃 처리 등을 수행할 수 있습니다
    if (error.response && error.response.status === 401) {
      // 로그아웃 로직
    }
    return Promise.reject(error);
  }
);

export default API;
