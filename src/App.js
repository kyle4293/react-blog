import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthService from './services/AuthService';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import PostList from './components/Post/PostList';
import PostDetail from './components/Post/PostDetail';
import PostForm from './components/Post/PostForm'; 
import Navbar from './Navbar';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userInfo = await AuthService.getCurrentUser();
        if (userInfo && userInfo.username) {
          setCurrentUser(userInfo);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    AuthService.logout(); // AuthService에서 로그아웃 처리
    setCurrentUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  return (
    <Router>
      <div className="app-container"> {/* 중앙 정렬을 위한 컨테이너 */}
        <Navbar currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={currentUser ? <PostList currentUser={currentUser} /> : <Navigate replace to="/login" />} />
          <Route path="/create-post" element={currentUser ? <PostForm /> : <Navigate replace to="/login" />} /> 
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/edit-post/:postId" element={<PostForm editMode={true} />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
