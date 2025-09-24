import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts';
import Navbar from './Navbar';
import './index.css';
import Footer from './Footer';

function App() {
  const [ingredientName, setIngredientName] = useState('');
  const [gram, setGram] = useState(200);
  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [suggestions, setSuggestions] = useState([]); // 搜尋候選結果


  const totals = items.reduce(
    (acc, item) => {
      acc.energyKcal += item.energyKcal || 0;
      acc.protein += item.protein || 0;
      acc.fat += item.fat || 0;
      acc.carbs += item.carbs || 0;
      acc.sugar += item.sugar || 0;
      acc.sodium += item.sodium || 0;
      acc.water += item.water || 0;
      return acc;
    },
    { energyKcal: 0, protein: 0, fat: 0, carbs: 0, sugar: 0, sodium: 0, water: 0 }
  );

  // 即時搜尋
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (ingredientName.length < 1) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await axios.get('/api/searchIngredients', {
          params: { keyword: ingredientName },
        });
        console.log('搜尋結果:', res.data);
        setSuggestions(res.data);
      } catch (err) {
        console.error('搜尋失敗:', err);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timer);
  }, [ingredientName]);

  // 按下新增食材
  const handleAdd = async () => {
    if (!ingredientName) {
      setErrorMsg('請輸入食材名稱');
      return;
    }

    try {
      const response = await axios.post('/getIngredient', {
          cname: ingredientName,
        gram,
      });

      setItems([...items, { ...response.data, gram }]);
      setIngredientName('');
      setGram(200);
      setErrorMsg('');
      setSuggestions([]);
    } catch (error) {
      console.error('API 呼叫失敗:', error);
      setErrorMsg('連接後端失敗');
    }
  };

  return (
    <div className="App">
      <Navbar />
      <h2 className="text-xl font-bold my-4">輸入食材與重量</h2>


      {/* 食材名稱與重量輸入區塊 */}
      <div className="mb-3 flex flex-col items-center justify-center" >
        <div style={{ maxWidth: '300px', width: '100%' }}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <label className="block mb-1 mr-2" style={{ minWidth: '70px' }}>食材：</label>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  value={ingredientName}
                  onChange={(e) => setIngredientName(e.target.value)}
                  placeholder="例如：chicken breast"
                  className="border rounded p-1 w-full"
                />
                {suggestions.length > 0 && (
                  <ul
                    className="absolute left-0 mt-1 border bg-white shadow-lg z-10"
                    style={{
                      top: '100%',
                      left: 0,
                      width: '100%',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      boxSizing: 'border-box',
                    }}
                  >
                    {suggestions.map((s, idx) => (
                      <li
                        key={idx}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setIngredientName(s.cname || s.ingredientName);
                          setSuggestions([]);
                        }}
                      >
                        {s.cname}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex items-center mt-2">
              <label className="block mb-1 mr-2" style={{ minWidth: '70px' }}>重量 (克)：</label>
              <input
                type="number"
                value={gram}
                onChange={(e) => setGram(Number(e.target.value))}
                className="border rounded p-1 w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 新增按鈕 */}
      <button
        type="button"
        onClick={handleAdd}
        className="py-2.5 px-5 mb-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
      >
        新增食材
      </button>

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

        {/* 食材清單 Table */}
        {items.length > 0 && (
            <div style={{ marginTop: '20px' }}>
                <h3>已新增的食材清單</h3>
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        marginTop: '10px'
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>名稱</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>重量 (g)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>熱量 (kcal)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>蛋白質 (g)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>脂肪 (g)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>碳水化合物 (g)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>糖 (g)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>鈉 (mg)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>水分 (g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {item.cname}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {item.gram}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {item.energyKcal}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {item.protein}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {item.fat}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {item.carbs}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {item.sugar}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {item.sodium}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {item.water}
                                </td>
                            </tr>
                        ))}

                        <tr style={{ backgroundColor: '#e6f7ff', fontWeight: 'bold' }}>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>合計</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>-</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{totals.energyKcal}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{totals.protein}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{totals.fat}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{totals.carbs}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{totals.sugar}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{totals.sodium}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{totals.water}</td>
                        </tr>
                    </tbody>
                </table>
                <PieChart
                    series={[
                            {
                            data: [
                            { id: 0, value: totals.protein, label: '蛋白質' },
                            { id: 1, value: totals.fat, label: '脂肪' },
                            { id: 2, value: totals.carbs, label: '碳水' },
                            ],
                             innerRadius: 30,
                            // outerRadius: 100,
                             paddingAngle: 5,
                             cornerRadius: 5,
                             startAngle: -45,
                            }
                    ]}
                    />
            </div>
        )}
        <Footer />
    </div>
);
}

export default App;
