import json
import requests

# Function to read JSON data from a file
def read_json(file_name):
    with open(file_name, 'r') as file:
        return json.load(file)


loans_data = read_json('loans.json')
fd_data = read_json('fd.json')
mutualfunds_data = read_json('mutualfunds.json')
category_data = read_json('categorise.json')


final_response = ""
# Prepare the initial prompt
prompt1 = """okay so for the input i provide you with. parse through the input and fetch information that we require.
(as an example the input could be: Hello I am Saahil Ahmad, a college student with an internship with a stipend of 15k ruppees per month which might convert into a ppo after 1 year which will have a salary of 12lac yearly. out of which my expenses are of about 5k per month and I send 5k to my home every month. (which means I have 5k as savings) and after my salary the expenses might increase to 4lac. I'm open to high risk and would like to increase my wealth over time and buy a Car after 5 years that can be of around 30lacs)
put it into input categories like {name, occupation, sourceofincome, expenses, savings, familysize, goal, goal amount, term,risk} which will contain these in this case: {Saahil Ahmad, Student, Internship for 1 year and ppo afterwards, 10k for 1 year and 4lac for 4 years, 5k for 1 year and 8 lac for 4 years,1 , car, 30lac, 5 year, high risk} ) give me the output of the categorization for an example. \n\n"""


response1 = requests.post(url, headers=headers, json=data)
response1_json = response1.json()







# Check for errors
if response1.status_code == 200:
    response1_json = response1.json()
    response_text1 = response1_json['choices'][0]['message']['content']
    print("Categorization Output:")
    print(response_text1)
    
    # Define the new prompt based on the goal
    prompt2 = response_text1 + "\n\n"
    prompt2 += "Loans Data:\n" + json.dumps(loans_data, indent=2)+"\n\n"
    prompt2 += "Based on the following given json, suggest the best 5 loans that match the goal along with calculation based on the interest rate given such that it gives a clarity.(for ex-if the goal is home then suggest me home loans from the json along with the montly based emi calculations)\n"
    
    

# Define the data for the API request
data = {
    'model': 'gpt-4',
    'messages': [
        {'role': 'system', 'content': 'You are a helpful assistant.'},
        {'role': 'user', 'content': prompt2}
    ],
    'temperature': 0.5,
    'max_tokens': 1000
}

response2 = requests.post(url, headers=headers, json=data)
response2_json = response2.json()

# Extract and print the content
content = response2_json['choices'][0]['message']['content']
final_response += content


prompt5 = response_text1 + "\n\n"
prompt5 += "Category Data:\n" + json.dumps(category_data, indent=2)+"\n\n"
prompt5 += "based on the category data and the data available in profile output the investment breakdown based on the category that the profile falls in"
    
    

# Define the data for the API request
data = {
    'model': 'gpt-4',
    'messages': [
        {'role': 'system', 'content': 'You are a helpful assistant.'},
        {'role': 'user', 'content': prompt5}
    ],
    'temperature': 0.5,
    'max_tokens': 1000
}

response5 = requests.post(url, headers=headers, json=data)
response5_json = response5.json()

print(response5_json)


prompt3 = "Mutual Funds Data:\n" + json.dumps(mutualfunds_data, indent=2)+"\n\n"
prompt3 += "Based on the following given json, suggest the best 5 schemes that has the best return percentage\n"
    
    

# Define the data for the API request
data = {
    'model': 'gpt-4',
    'messages': [
        {'role': 'system', 'content': 'You are a helpful assistant.'},
        {'role': 'user', 'content': prompt3}
    ],
    'temperature': 0.5,
    'max_tokens': 1000
}

response3 = requests.post(url, headers=headers, json=data)
response3_json = response3.json()

# Extract and print the content
content1 = response3_json['choices'][0]['message']['content']
final_response += content1




prompt4 = "FD Data:\n" + json.dumps(fd_data, indent=2)+"\n\n"
prompt4 += "Based on the following given json, suggest the best 5 fds that has the best return percentage\n"
    
    

# Define the data for the API request
data = {
    'model': 'gpt-4',
    'messages': [
        {'role': 'system', 'content': 'You are a helpful assistant.'},
        {'role': 'user', 'content': prompt4}
    ],
    'temperature': 0.5,
    'max_tokens': 1000
}

response4 = requests.post(url, headers=headers, json=data)
response4_json = response4.json()

# Extract and print the content
content2 = response4_json['choices'][0]['message']['content']
final_response += content2




print(final_response)


#     # Define the data for the second API request
#     data2 = {
#         'model': 'gpt-4',
#         'messages': [
#             {'role': 'system', 'content': 'You are a helpful assistant.'},
#             {'role': 'user', 'content': prompt2}
#         ],
#         'temperature': 0.5,
#         'max_tokens': 1000
#     }

#     # Send the second API request
#     response2 = requests.post(url, headers=headers, json=data2)

#     # Check for errors
#     if response2.status_code == 200:
#         response2_json = response2.json()
#         final_response_text = response2_json['choices'][0]['message']['content']
#         print("Loan Suggestions:")
#         print(final_response_text)
#     else:
#         print(f"Error in second request: {response2.status_code} - {response2.text}")
# else:
#     print(f"Error in first request: {response1.status_code} - {response1.text}")
