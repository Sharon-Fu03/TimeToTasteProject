import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './index.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function Recipe() {
  // 狀態管理
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  // 載入食譜列表
  useEffect(() => {
    fetchRecipes();
  }, []);
  const addNewRecipe = () => {
    // 導向新增食譜頁面
    navigate('/add-recipe');
  }

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/recipe/list');
      setRecipes(response.data);
      setError('');
    } catch (err) {
      console.error('載入食譜失敗:', err);
      setError('載入食譜失敗，請重試');
    } finally {
      setLoading(false);
    }
  };
  const editRecipe = (id) => {
    if (id == null ) return;
    navigate(`/edit/${id}`);
  }
  return (
    <div>
      <div className="App min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">食譜列表</h2>
              <button
                onClick={addNewRecipe}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span className="text-xl">+</span>
                <span>新增食譜</span>
              </button>
            </div>

            
            {/* 載入中 */}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600">載入中...</p>
              </div>
            )}

            {/* 錯誤訊息 */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* 食譜列表 */}
            {!loading && !error && (
              <div>
                {recipes.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">目前沒有食譜</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                      >
                        {/* 食譜卡片 */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {recipe.title}
                          </h3>
                          
                          {recipe.description && (
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {recipe.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-3 mb-4">
                            {recipe.time && (
                              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                ⏱️ {recipe.time} 分鐘
                              </span>
                            )}
                            {recipe.servings && (
                              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                👥 {recipe.servings} 人份
                              </span>
                            )}
                            <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                              {recipe.status === 'draft' ? '草稿' : '已發布'}
                            </span>
                          </div>
                          <div className="mb-4">
                          </div>
                          {recipe.coverImageBase64 && (
                            <img src={recipe.coverImageBase64} alt={recipe.title} />
                          )}
                          

                          <div className="text-xs text-gray-400 mt-4">
                            建立時間: {new Date(recipe.createdAt).toLocaleDateString('zh-TW')}
                          </div>
                        </div>

                        {/* 操作按鈕 */}
                        <div className="bg-gray-50 px-6 py-3 flex gap-2">
                          <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm">
                            查看詳情
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors text-sm" onClick={() => editRecipe(recipe.id)}>
                            編輯
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  }


export default Recipe;
