import React, { useState } from 'react';
import AuthService from '../../services/AuthService';

function Signup() {
  const [formData, setFormData] = useState({ username: '', email:'', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // AuthService.login 메소드에 사용자 이름과 비밀번호 전달
      await AuthService.signup(formData);
      // 로그인 성공 후 처리, 예: 홈페이지로 리다이렉트
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error);
      // 로그인 실패 처리, 예: 오류 메시지 표시
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="email" name="email" placeholder="email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
