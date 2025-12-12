import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/recipe/getRecipeById/${id}`);
        setRecipe(res.data);
        setError('');
      } catch (err) {
        console.error('載入食譜失敗', err);
        setError('載入食譜失敗，請稍後重試');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="App min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">載入中...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="App min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center text-red-600">{error}</div>
        <div className="container mx-auto px-4 text-center">
          <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-gray-200 rounded">回上一頁</button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className="App min-h-screen bg-gray-50">
      <Navbar />
      <div className="fluid-container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {recipe.coverImageBase64 && (
            <img src={recipe.coverImageBase64} alt={recipe.title} className="w-full h-64 object-cover" />
          )}
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
            <div className="text-sm text-gray-500 mb-4">建立時間: {new Date(recipe.createdAt).toLocaleString('zh-TW')}</div>
            <div className="mb-4 text-gray-700">{recipe.description}</div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">材料</h3>
              {recipe.ingredients && recipe.ingredients.length > 0 ? (
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((ing) => (
                    <li key={ing.id}>{ing.name}{ing.amount ? ` — ${ing.amount}` : ''}</li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500">無</div>
              )}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">作法</h3>
              {recipe.steps && recipe.steps.length > 0 ? (
                <ol className="list-decimal list-inside">
                  {recipe.steps.map((s, idx) => (
                    <li key={idx} className="mb-2">{s}</li>
                  ))}
                </ol>
              ) : (
                <div className="text-gray-500">尚未提供作法</div>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              {recipe.time && <div className="px-3 py-1 bg-blue-100 rounded">⏱️ {recipe.time} 分鐘</div>}
              {recipe.servings && <div className="px-3 py-1 bg-green-100 rounded">👥 {recipe.servings} 人份</div>}
              <div className="px-3 py-1 bg-gray-100 rounded">{recipe.status === 'draft' ? '草稿' : '已發布'}</div>
            </div>

            <div className="mt-6 flex gap-2">
              <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded">回上一頁</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
