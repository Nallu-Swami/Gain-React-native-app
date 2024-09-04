import ollama # type: ignore

content_string = ""

response = ollama.chat(model='llama3', messages=[
  {
    'role': 'user',
    'content': 'My name is Arin Yadav i am a student of 19 years of with no source of income as of now and by the time i am 25 years of age i want to roam the world and visit 30 countries with my wife", from this paragraph i want you yo extract {name,sourceofincome,whattheuseraimstodo} and provide it in the  same format only give me the {} format no other text',
  },
])
print(response['message']['content'])