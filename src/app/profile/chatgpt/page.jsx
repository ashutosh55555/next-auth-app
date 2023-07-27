"use client"
import React, { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from"openai";


const imageStyle = {
  width: '500px',
  height: '500px',
  display: 'block',
  margin: '0 auto',
  /* Add any other styles you want here */
};


const ChatGPTConversation = () => {
  console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY,"process.env.OPENAI_API_KEY")
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [url,setUrl]=useState('')
  const [imageFlag,setImageflag]=useState(false)

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    
  };

  const configuration = new Configuration({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
        });
        const openai = new OpenAIApi(configuration);
    
        const generateImage = async() => {
          try {
            if(imageFlag){
            const res = await openai.createImage({
              prompt: `${inputText} image`, // Fixed typo: 'atest' to 'a test'
              n: 1,
              size: '1024x1024', // Enclose size value in quotes as it's a string
            });
            setUrl(res.data.data[0].url);
        
            console.log(res.data.data[0].url, "res");
            setImageflag(false)
          }
          } catch (error) {
            console.error('Error generating image:', error);
          }

        };

        useEffect(()=>{
          if(imageFlag){
            generateImage()

          }

        },[imageFlag])
      
    

  const handleSendMessage = async() => {
    if (inputText.trim() === '') return;
    setImageflag(true)
    const chat_completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: inputText}],
  });
   setMessages([...messages, { text: chat_completion?.data?.choices[0]?.message?.content, sender: 'user' }]);
  
   };

  return (
 <>
    <h1 className='title1 my-4'>ChatGPT Conversation App</h1>
    <div className="chat-container">
    
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
            <img src={url} style={imageStyle} alt="Awesome Image" />

          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
 </>
  );
};

export default ChatGPTConversation;