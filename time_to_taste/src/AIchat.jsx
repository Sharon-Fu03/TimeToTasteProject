import React from 'react';
import Navbar from './Navbar.jsx';
import axios from 'axios';
import { Container } from 'lucide-react';

function AiChat() {
    const [messages, setMessages] = React.useState([]);
    const [userInput, setUserInput] = React.useState("");
    const handleChange = (event) => {
        setUserInput(event.target.value);
    };
    const [loading, setLoading] = React.useState(false);
   //  setMessages([...messages, { role: "user", text: "hi~我是營養小幫手!今天有甚麼需要我幫忙解惑的呢?" }]);
    return(
        <div>
        <Navbar />
        <div></div>
        <h1>AI聊天機器人</h1>
        <div style={{ maxWidth: "60%",maxHeight:"90%",height:"100%", margin: "0 auto", padding: "20px", border:" 2px solid red " }}>
            <textarea
            value={userInput}
            onChange={handleChange}
            
            style={{
            width: "100%",
            height: "150px",
            border: "1px solid  gray",
            borderRadius: "8px",
            padding: "10px",
            fontSize: "16px",
            }}
            placeholde="今天吃甚麼呢甚麼呢"
            />
            <div className="flex justify-end mt-2">
            <button onClick={sendMessage} disabled={loading} className="px-4 py-2 bg-green-500 text-white rounded">
                {loading ? '傳送中...' : '傳送'}
            </button>
            </div>
            </div>
        </div>
    );

}

async function sendMessage(){
    try{
        const res = await axios.post("http://localhost:8080/api/chat", { message: userInput });

    }
   catch (error){
    console.error("Error sending message:", error);
   }
    return res.data;
}


export default AiChat;