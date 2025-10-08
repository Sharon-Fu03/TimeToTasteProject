import React, { useEffect } from 'react';
import './Login.css';

const LoginDialog = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted');
    // TODO: 加入登入 API 調用
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="關閉">
          ×
        </button>

        <div className="login-dialog-container">
          <div className="login-form-section">
            <div className="login-header">
              <span className="plane-icon">✈</span>
            </div>
            
            <h2>Welcome</h2>
            <p className="login-subtext">Login with Email</p>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email id</label>
                <input type="email" id="email" placeholder="thiouix@gmail.com" required />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="••••••••••••" required />
              </div>
              
              <a href="#" className="forgot-password">忘記密碼?</a>

              <button type="submit" className="login-button">LOGIN</button>
            </form>

            <div className="or-divider">
              <span>OR</span>
            </div>

            <div className="social-login-buttons">
              <button type="button" className="social-button google">G</button>
              <button type="button" className="social-button facebook">f</button>
              <button type="button" className="social-button apple">🍎</button>
            </div>

            <div className="register-link">
              Don't have account? <a href="#">Register Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
