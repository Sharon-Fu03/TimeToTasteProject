import React from 'react';
import Navbar from './Navbar.jsx';
import axios from 'axios';

function AiChat() {
    const [messages, setMessages] = React.useState([]);
    const [userInput, setUserInput] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleChange = (event) => {
        setUserInput(event.target.value);
    };

    const sendMessage = async () => {
        if (!userInput || userInput.trim() === '') return;
        setLoading(true);
        try {
            // send the user input to backend
            const res = await axios.post('/api/gemini/chat', { prompt: userInput });

            // assume backend returns { reply: '...' } or plain text
            const botText = res?.data?.reply ?? res?.data ?? '';

            // append messages: user then bot
            setMessages(prev => [...prev, { role: 'user', text: userInput }, { role: 'bot', text: botText }]);
            setUserInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <h1>AI聊天機器人</h1>
            <div style={{ maxWidth: '60%', maxHeight: '90%', height: '100%', margin: '0 auto', padding: '20px', border: '2px solid red' }}>
                <textarea
                    value={userInput}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        height: '150px',
                        border: '1px solid gray',
                        borderRadius: '8px',
                        padding: '10px',
                        fontSize: '16px',
                    }}
                    placeholder="今天吃甚麼呢？"
                />

                <div className="flex justify-end mt-2">
                    <button onClick={sendMessage} className="px-4 py-2 bg-green-500 text-white rounded" disabled={loading}>
                        {loading ? '傳送中...' : '傳送'}
                    </button>
                </div>

                <div className="mt-4">
                    {messages.map((m, idx) => (
                        <div key={idx} style={{ marginBottom: '8px' }}>
                            <strong>{m.role === 'user' ? '你：' : '小幫手：'}</strong> {m.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AiChat;