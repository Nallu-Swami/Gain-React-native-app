import ollama

const  = 'Aarav Mehta is a 28-year-old entrepreneur from Bengaluru, India, with a passion for building tech startups. After completing his MBA, Aarav founded a software development company that focuses on providing innovative solutions for small businesses. His expertise lies in project management and digital transformation, helping clients optimize their operations using technology. Outside of work, Aarav is an avid traveler and enjoys exploring new cultures. Hes also a fitness enthusiast, regularly participating in marathons and outdoor activities. With a strong drive to succeed, Aarav continuously seeks opportunities to grow and expand his business ventures.'

stream = ollama.chat(
    model='llama3',
    messages=[{'role': 'user', 'content': const + 'I want you to extarct data in this form {name,surname,age,occupation} give me this only'}],
    stream=True,
)

for chunk in stream:
  print(chunk['message']['content'], end='', flush=True)