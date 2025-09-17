import { useState } from "react";
import { Menu, X } from "lucide-react"; // 用於漢堡選單圖示

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-green-600">
          知食光
        </a>

        {/* 桌面版選單 */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="/" className="hover:text-green-600">首頁</a>
          <a href="/recipes" className="hover:text-green-600">食譜</a>
          <a href="/foods" className="hover:text-green-600">食材資料庫</a>
          <a href="/about" className="hover:text-green-600">關於</a>
        </div>

        {/* 手機版按鈕 */}
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
          <a href="/" className="block hover:text-green-600">首頁</a>
          <a href="/recipes" className="block hover:text-green-600">食譜</a>
          <a href="/foods" className="block hover:text-green-600">食材資料庫</a>
          <a href="/about" className="block hover:text-green-600">關於</a>
        </div>
      )}
    </nav>
  );
}
