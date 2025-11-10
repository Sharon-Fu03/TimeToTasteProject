import './App.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
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
  const [coverImage,setcoverImage] = useState('');
  // 新增食材
  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '' }]);
  };
  //轉換圖片檔
  async function blobUrlToBase64(blobUrl) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

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
  // 上傳照片（接收 File，檢查存在性並建立預覽 URL）
  const uploadImage = (file) =>{
    if (!file) return;
    try {
      const previewUrl = URL.createObjectURL(file);
      setcoverImage(previewUrl);
      console.log('上傳照片:', file);
    } catch (err) {
      console.error('建立預覽失敗:', err);
    }
  }

  // 隱藏的 input ref，用於觸發檔案對話框
  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  }

  const handleBoxKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openFilePicker();
    }
  }

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
    try {
      const base64Image = await blobUrlToBase64(coverImage);
      console.log('Base64 圖片字串:', base64Image);
      const recipeData = {
        title: recipeName,
        description: description,
        cookingTime: cookingTime,
        servings: servings,
        ingredients: ingredients.filter(ing => ing.name.trim()),
        steps: steps.filter(step => step.trim()),
        coverImage: base64Image,
        usersId: 1  // TODO: 實作登入後，從 session/localStorage 取得真實的使用者 ID
      };

      console.log('食譜資料:', recipeData);
      // 這裡可以加入API調用來保存食譜 
      const response = await axios.post('/api/recipe/saveRecipe', recipeData);
      
      // 檢查成功狀態碼：200 OK 或 201 Created
      if (response.status === 200 || response.status === 201) {
        alert('食譜新增成功！');
        console.log('已儲存的食譜:', response.data);
        // 重置表單
        resetForm();
      } else {
        console.error('食譜保存失敗:', response);
        alert('食譜保存失敗，請重試');
      }
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
    <div>
    <div className="App min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">新增食譜</h2>
          
          <form onSubmit={handleSubmit} className="">
            {/* 食譜基本資訊 */}
            <div className="grid grid-cols-1 md:grid-cols-2 ">
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
              <br/>
              <div className="flex items-center justify-center w-full">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={openFilePicker}
                  onKeyDown={handleBoxKeyDown}
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt="cover preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => uploadImage(e.target.files?.[0])}
                  />
                </div>
              </div>
              {/* <div  className = "">
   
                <input
                   type="file"
                   onChange={(e) => uploadImage(e.target.files[0])}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 />
                  {coverImage && <img src={coverImage} alt="cover" className="w-32 h-32 object-cover" />}

              </div>  */}
              <div className="flex flex-col md:flex-row md:items-end md:gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    烹飪時間(分)
                  </label>
                  <input
                    type="number"
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="例如：30"
                  />
                </div>

                <div className="w-40 md:w-32">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    份數
                  </label>
                  <input
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="例如：4"
                  />
                </div>
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
      
      
    </div>
    {/* <Footer /> */}
    </div>
  );
}

export default Recipe;

