import React from "react";
import Navbar from "./Navbar";
const Home = () => {
  return (
    <div>
        <Navbar/>
    
    <main className="max-w-6xl mx-auto px-4 py-10 md:py-12">
      {/* 搜尋區 */}
      <div className="text-center mb-14 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          發現健康美食靈感
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          精選營養均衡的食譜，讓每一餐都充滿驚喜與健康
        </p>

        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="輸入食材或食譜名稱…"
            className="w-full py-3 md:py-4 px-5 md:px-6 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent"
          />
          <button className="absolute right-2 top-2 bg-green-400 hover:bg-green-500 text-white py-2 px-5 rounded-full transition flex items-center">
            🔍 搜尋
          </button>
        </div>
      </div>
    </main>
    </div>
  );
};

export default Home;
