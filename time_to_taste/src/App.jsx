import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { PieChart } from '@mui/x-charts';
import Navbar from './Navbar';
import './index.css';
function App() {
  const [ingredientName, setIngredientName] = useState('');
  const [gram, setGram] = useState(200);
  const [items, setItems] = useState([]); // 存放所有新增的食材
  const [errorMsg, setErrorMsg] = useState('');


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
    {
      energyKcal: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      sugar: 0,
      sodium: 0,
      water: 0,
    }
  );
  // 按下新增食材
  const handleAdd = async () => {
    if (!ingredientName) {
      setErrorMsg('請輸入食材名稱');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/getIngredient', {
        ingredientName: ingredientName,
        gram: gram
      });

      // 把新的食材加到清單
      setItems([...items, { ...response.data, gram }]);
      setIngredientName('');
      setGram(200);
      setErrorMsg('');
    } catch (error) {
      console.error('API 呼叫失敗:', error);
      setErrorMsg('連接後端失敗');
    }
  };

return (
    
    <div className="App" style={{ padding: '20px' }}>
         <div className="p-10 bg-green-200 text-center text-2xl font-bold">
      Tailwind v4 OK 🚀
    </div>
        <Navbar />
        <h2>輸入食材與重量</h2>

        <div style={{ marginBottom: '10px' }}>
            <label>食材名稱：</label>
            <input
                type="text"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
                placeholder="例如：chicken breast"
            />
        </div>

        <div style={{ marginBottom: '10px' }}>
            <label>重量 (克)：</label>
            <input
                type="number"
                value={gram}
                onChange={(e) => setGram(Number(e.target.value))}
            />
        </div>

        <button onClick={handleAdd} style={{ margin: '10px', padding: '10px' }}>
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
    </div>
);
}

export default App;
