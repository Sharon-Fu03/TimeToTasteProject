import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import LoginDialog from "./LoginDialog";
import './index.css';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          <span className="mr-2 text-green-500">🍴</span>
          知食光
        </Link>

        {/* 桌面版選單 */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-green-600">首頁</Link>
          <Link to="/recipe" className="hover:text-green-600">食譜</Link>
          <Link to="/app" className="hover:text-green-600">食材資料庫</Link>      
          <button onClick={() => setShowLoginDialog(true)} className="hover:text-green-600">登入</button>
        </div>
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 手機版選單 */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-3">
          <Link to="/" className="block hover:text-green-600">首頁</Link>
          <Link to="/recipe" className="block hover:text-green-600">食譜</Link>
          <Link to="/app" className="block hover:text-green-600">食材資料庫</Link>
          <button onClick={() => setShowLoginDialog(true)} className="block hover:text-green-600 text-left">登入</button>
        </div>
      )}

      {/* Login Dialog */}
      <LoginDialog isOpen={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
    </nav>
  );
}
