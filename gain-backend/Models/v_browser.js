import ollama from 'ollama'

const message = { role: 'user', content: 'what'+'meow' }
const response = await ollama.chat({ model: 'llama3', messages: [message], stream: true })
for await (const part of response) {
    process.stdout.write(part.message.content)
}