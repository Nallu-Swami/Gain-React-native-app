import ollama from 'ollama'
const response = await ollama.chat({
    model: 'llama3',
    messages: [{ role: 'user', content: 'what meow'}],
})
console.log(response.message.content)