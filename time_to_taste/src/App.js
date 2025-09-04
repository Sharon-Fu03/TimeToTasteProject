import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';



function App() {
  const [message, setMessage] = useState('');
  const testBackend = async () => {
        try {
          const response = await axios.get('/hello');
          setMessage(response.data);
        } catch (error) {
          console.error('API 呼叫失敗:', error);
          setMessage('連接後端失敗');
        }
      };
  return (
    <div className="App">
      <header className="App-header">
      
        <p>雞胸肉</p>
        <p>雞胸肉的營養成分如下：</p>
     <button onClick={testBackend} style={{margin: '10px', padding: '10px'}}>
          測試後端 API
        </button>

{message && <p style={{color: 'lightgreen'}}>{message}</p>}

      </header>
    </div>
  );
}

export default App;
