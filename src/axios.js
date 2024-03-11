import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://52.79.190.78', // 서버의 기본 URL
  withCredentials: true, // CORS 요청 시 자격 증명 정보를 포함합니다.
});

export default instance;
