import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts';
import Navbar from './Navbar';
import './index.css';
import Footer from './Footer';


function Recipe() {
  // 狀態管理
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
  const [steps, setSteps] = useState(['']);
  const [description, setDescription] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');

  // 新增食材
  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '' }]);
  };

  // 刪除食材
  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  // 更新食材
  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  // 新增步驟
  const addStep = () => {
    setSteps([...steps, '']);
  };

  // 刪除步驟
  const removeStep = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  // 更新步驟
  const updateStep = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  // 提交表單
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 驗證必填欄位
    if (!recipeName.trim()) {
      alert('請輸入食譜名稱');
      return;
    }
    
    if (ingredients.some(ing => !ing.name.trim())) {
      alert('請填寫所有食材名稱');
      return;
    }
    
    if (steps.some(step => !step.trim())) {
      alert('請填寫所有步驟內容');
      return;
    }

    const recipeData = {
      title: recipeName,
      description: description,
      cookingTime: cookingTime,
      servings: servings,
      ingredients: ingredients.filter(ing => ing.name.trim()),
      steps: steps.filter(step => step.trim())
    };

    try {
      console.log('食譜資料:', recipeData);
      // 這裡可以加入API調用來保存食譜 
      const response = await axios.post('/api/recipe/saveRecipe', recipeData);
      if (response.status === 200) {
        alert('食譜新增成功！');
      }
      else {
        console.error('食譜保存失敗:', response);
      }
      
      // 重置表單
      resetForm();
    } catch (error) {
      console.error('新增食譜失敗:', error);
      alert('新增食譜失敗，請重試');
    }
  };

  // 重置表單
  const resetForm = () => {
    setRecipeName('');
    setDescription('');
    setCookingTime('');
    setServings('');
    setIngredients([{ name: '', amount: '' }]);
    setSteps(['']);
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">新增食譜</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 食譜基本資訊 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="">
                <label className="block text-sm  font-medium text-gray-700 mb-2">
                  食譜名稱 *
                </label>
                <input
                  type="text"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="請輸入食譜名稱"
                  required
                />
              </div>
              
              <div  className = "md:grid-cols-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  烹飪時間(分)
                </label>
                <input
                  type="number"
                  value={cookingTime}
                  onChange={(e) => setCookingTime(e.target.value)}
                  className=" py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="例如：30分鐘"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  份數
                </label>
                <input
                  type="number"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="例如：4人份"
                />
              </div>
            </div>

            {/* 食譜描述 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                食譜描述
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="簡單描述這道料理..."
              />
            </div>

            {/* 食材列表 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">食材清單</h3>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  + 新增食材
                </button>
              </div>
              
              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="食材名稱"
                      required
                    />
                    <input
                      type="text"
                      value={ingredient.amount}
                      onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="用量"
                    />
                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        刪除
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 烹飪步驟 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">烹飪步驟</h3>
                <button
                  type="button"
                  onClick={addStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  + 新增步驟
                </button>
              </div>
              
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mt-1">
                      {index + 1}
                    </span>
                    <textarea
                      value={step}
                      onChange={(e) => updateStep(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="2"
                      placeholder={`第 ${index + 1} 步驟...`}
                      required
                    />
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="flex-shrink-0 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors mt-1"
                      >
                        刪除
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 操作按鈕 */}
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                重置
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                保存食譜
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Recipe;

