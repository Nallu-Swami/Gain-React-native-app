import json
import requests
import ollama

def read_json(file_name):
    with open(file_name, 'r') as file:
        return json.load(file)

loans_data = read_json('/Users/aringy/Desktop/MATH/gain-backend/Models/suggest/loans.json')
fd_data = read_json('/Users/aringy/Desktop/MATH/gain-backend/Models/suggest/fd.json')
mutualfunds_data = read_json('/Users/aringy/Desktop/MATH/gain-backend/Models/suggest/Mutual Funds.json')
category_data = read_json('/Users/aringy/Desktop/MATH/gain-backend/Models/suggest/categorise.json')

prompt1 = """
okay so for the input i provide you with. parse through the input and fetch information that we require.
(as an example the input could be: Hello I am Saahil Ahmad, a college student with an internship with a stipend of 15k ruppees per month which might convert into a ppo after 1 year which will have a salary of 12lac yearly. out of which my expenses are of about 5k per month and I send 5k to my home every month. (which means I have 5k as savings) and after my salary the expenses might increase to 4lac. I'm open to high risk and would like to increase my wealth over time and buy a Car after 5 years that can be of around 30lacs)
put it into input categories like {name, occupation, sourceofincome, expenses, savings, familysize, goal, goal amount, term,risk} which will contain these in this case: {Saahil Ahmad, Student, Internship for 1 year and ppo afterwards, 10k for 1 year and 4lac for 4 years, 5k for 1 year and 8 lac for 4 years,1 , car, 30lac, 5 year, high risk} ) give me the output of the categorization for an example. \n\n
"""

def llama_generate(prompt):
    response = ollama.chat(model="llama3", messages=[{"role": "user", "content": prompt}])
    return response['message']['content']

response_text1 = llama_generate(prompt1)
print("Categorization Output:")
print(response_text1)

prompt2 = response_text1 + "\n\n"
prompt2 += "Loans Data:\n" + json.dumps(loans_data, indent=2)+"\n\n"
prompt2 += "Based on the following given json, suggest the best 5 loans that match the goal along with calculation based on the interest rate given such that it gives a clarity. (for ex-if the goal is home then suggest me home loans from the json along with the monthly-based EMI calculations)\n"

response_text2 = llama_generate(prompt2)
print("Loan Suggestions:")
print(response_text2)

prompt5 = response_text1 + "\n\n"
prompt5 += "Category Data:\n" + json.dumps(category_data, indent=2)+"\n\n"
prompt5 += "Based on the category data and the data available in the profile, output the investment breakdown based on the category that the profile falls into."

response_text5 = llama_generate(prompt5)
print("Category Breakdown:")
print(response_text5)

prompt3 = "Mutual Funds Data:\n" + json.dumps(mutualfunds_data, indent=2)+"\n\n"
prompt3 += "Based on the following given json, suggest the best 5 schemes that have the best return percentage\n"

response_text3 = llama_generate(prompt3)
print("Mutual Fund Suggestions:")
print(response_text3)

prompt4 = "FD Data:\n" + json.dumps(fd_data, indent=2)+"\n\n"
prompt4 += "Based on the following given json, suggest the best 5 FDs that have the best return percentage\n"

response_text4 = llama_generate(prompt4)
print("FD Suggestions:")
print(response_text4)

final_response = response_text2 + response_text3 + response_text4 + response_text5
print("Final Combined Suggestions:")
print(final_response)
