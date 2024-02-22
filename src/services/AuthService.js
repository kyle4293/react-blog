// AuthService.js
import axios from 'axios';
import Cookies from 'js-cookie';

class AuthService {
  // 로그인 요청을 보내는 메소드
  async login(username, password) {
    try {
      Cookies.remove('Authorization'); // 쿠키에서 토큰 제거

      const response = await axios.post('/api/user/login', { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // 회원가입 요청을 보내는 메소드
  async signup(userData) {
    try {
      const response = await axios.post('/api/user/signup', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // 로그아웃 메소드
  logout() {
    Cookies.remove('Authorization'); // 쿠키에서 토큰 제거
    window.location.href = '/login'; // 로그인 페이지로 리다이렉트
  }

  // 현재 로그인한 사용자 정보를 가져오는 메소드
  async getCurrentUser() {
    const token = Cookies.get('Authorization');
    if (!token) {
      return null; // 토큰이 없으면 null 반환
    }

    try {
      const response = await axios.get('/api/user-info', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("res",response.data);
      return response.data; // 사용자 정보 반환
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;