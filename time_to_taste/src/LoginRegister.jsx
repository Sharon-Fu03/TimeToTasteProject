import React from 'react';
import './Login.css'; // 假設您有一個 Login.css 檔案來存放樣式

const LoginPage = () => {
  return (
    <div className="login-page-container">
      {/* 左側宣傳區塊 */}
      <div className="travel-info-section">
        <div className="travel-logo">知時光</div>
        <p className="travel-quote">
          Travel is the only purchase that enriches you in ways beyond material wealth
        </p>
        <img 
          src="path/to/your/image.jpg" // 請替換成您圖片的路徑
          alt="A woman standing on a mountain top" 
          className="travel-image" 
        />
      </div>

      {/* 右側登入表單區塊 */}
      <div className="login-form-section">
        <div className="login-header">
          <span className="plane-icon"></span>
        </div>
        
        <h2>Welcome</h2>
        <p className="login-subtext">Login with Email</p>

        <form className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email id</label>
            <input type="email" id="email" placeholder="thiouix@gmail.com" />
           
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••••••" />
            
          </div>
          
          <a href="#" className="forgot-password">忘記密碼?</a>

          <button type="submit" className="login-button">LOGIN</button>
        </form>

        <div className="or-divider">
          <span>OR</span>
        </div>

        <div className="social-login-buttons">
          <button className="social-button google">G</button>
          <button className="social-button facebook">f</button>
          <button className="social-button apple"></button>
        </div>

        <div className="register-link">
          Don't have account? <a href="#">Register Now</a>
        </div>
        
        <div className="city-illustration">
          {/* 城市剪影圖片或 SVG */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;