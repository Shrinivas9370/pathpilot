import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { generateOllamaResponse } from '../services/ollamaService';
import './AIChat.css';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your PathPilot AI assistant powered by Qwen 3.5. How can I help map out your learning journey today?" }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    // Initial empty assistant message that will be populated by chunks
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    await generateOllamaResponse(userMessage.content, messages, (chunk) => {
      setMessages(prev => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        newMessages[lastIndex].content += chunk;
        return newMessages;
      });
    });

    setIsGenerating(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-chat flex-col">
      <div className="chat-header flex items-center gap-2">
        <Bot className="bot-icon" />
        <div>
          <h3>PathPilot AI</h3>
          <span className="status">qwen3.5:397b-cloud</span>
        </div>
      </div>
      
      <div className="chat-messages flex-col">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-wrapper ${msg.role}`}>
            <div className={`message-avatar ${msg.role}`}>
              {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
            </div>
            <div className="message-content">
              {msg.role === 'assistant' ? (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {isGenerating && (
          <div className="message-wrapper assistant generating">
            <span className="typing-indicator flex items-center gap-2">
              <Loader2 className="spinner" size={16} /> Generating response...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me about full-stack roadmaps..."
          rows={1}
        />
        <button className="btn-icon send-btn" onClick={handleSend} disabled={!input.trim() || isGenerating}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
