// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white py-4 border-t border-gray-100 text-center shadow-md">
      <p className="text-gray-600 mb-2">
        © 2025 知食光 - 健康食譜分享平台
      </p>
      <div className="flex justify-center space-x-6 text-gray-600 text-sm">
        <a href="#" className="hover:text-green-500">使用條款</a>
        <a href="#" className="hover:text-green-500">隱私政策</a>
        <a href="#" className="hover:text-green-500">聯絡我們</a>
      </div>
    </footer>
  );
};

export default Footer;
