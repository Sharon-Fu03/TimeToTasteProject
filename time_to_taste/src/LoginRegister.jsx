import React, { useState } from 'react';
// Google OAuth
import { GoogleLogin } from '@react-oauth/google';
import Navbar from './Navbar';

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('請輸入帳號與密碼');
      return;
    }
    // TODO: 串接 /login 或 /register API
    alert(`${isLogin ? '登入' : '註冊'}成功 (僅前端示範)`);
  };

  const handleGoogleLogin = (credentialResponse) => {
    // TODO: 串接後端 Google OAuth API
    alert('Google 登入成功: ' + credentialResponse.credential);
  };

  return (
    <div>
      <Navbar />

      <div className="_02-travel-login-page flex flex-col items-center justify-center min-h-screen bg-gray-50">
        {/* 背景圖或裝飾 */}
        <img className="vector" src="vector0.svg" />
        <img className="group-688" src="group-6880.svg" />
  <img className="rectangle-26 absolute left-0 top-1/2 -translate-y-1/2" src="rectangle-260.png" style={{maxHeight: '80vh'}} />

        {/* 文字標題 */}
        <div className="travelista-tours text-3xl font-bold mt-4">Travelista Tours</div>
        <div className="travel-is-the-only-purchase-that-enriches-you-in-ways-beyond-material-wealth text-center mt-2 mb-8">
          Travel is the only purchase that enriches you in ways
          <br />
          beyond material wealth
        </div>

        {/* 登入表單 */}
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="group-90">
              <div className="group-88">
                <div className="rectangle-24"></div>
                <input
                  type="email"
                  placeholder="Email Id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded p-2 w-full"
                  required
                />
              </div>
            </div>

            <div className="group-92">
              <div className="group-882">
                <div className="rectangle-242"></div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded p-2 w-full"
                  required
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          <div className="my-4 text-center">
            {/* <button className="text-blue-600 underline" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? '沒有帳號？註冊' : '已有帳號？登入'}
            </button> */}
          </div>

          <div className="my-4 text-center group-56">
            <div className="group-3 flex items-center justify-center">
              <img className="subtract mr-2" src="subtract0.svg" />
              <div className="or">OR</div>
              <img className="subtract ml-2" src="subtract0.svg" />
            </div>

            {/* Google 登入 */}
            <div className="group-682 mt-4 flex justify-center">
              {/* <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => setError('Google 登入失敗')}
              /> */}
            </div>
          </div>
        </div>

        {/* Footer / 註冊連結 */}
        <div className="group-685 mt-4 text-center">
          <span>
            <span className="don-t-have-account-register-now-span">
              Don’t have account?
            </span>{' '}
            <span
              className="don-t-have-account-register-now-span2 text-blue-600 cursor-pointer"
              onClick={() => setIsLogin(false)}
            >
              Register Now
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
