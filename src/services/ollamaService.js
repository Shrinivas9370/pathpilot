export async function generateOllamaResponse(prompt, chatHistory, onChunk) {
  try {
    // If we want contextual chat, we should use /api/chat instead of /api/generate
    const response = await fetch('/api/ollama/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen3.5:397b-cloud',
        messages: chatHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        })).concat([{ role: 'user', content: prompt }]),
        stream: true
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.message && parsed.message.content) {
            onChunk(parsed.message.content);
          }
        } catch (e) {
          console.warn("Could not parse chunk:", line);
        }
      }
    }
  } catch (error) {
    console.error("Ollama API Error:", error);
    onChunk("\n**Error:** Could not connect to local Qwen model. Is Ollama running?");
  }
}
