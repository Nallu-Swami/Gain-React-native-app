import json
import ollama
from concurrent.futures import ThreadPoolExecutor, as_completed

# Function to read the JSON files
def read_json(file_name):
    with open(file_name, 'r') as file:
        return json.load(file)

# Load the necessary data
loans_data = read_json('/Users/aringy/Desktop/MATH/gain-backend/Models/suggest/loans.json')
fd_data = read_json('/Users/aringy/Desktop/MATH/gain-backend/Models/suggest/fd.json')
mutualfunds_data = read_json('/Users/aringy/Desktop/MATH/gain-backend/Models/suggest/Mutual Funds.json')
category_data = read_json('/Users/aringy/Desktop/MATH/gain-backend/Models/suggest/categorise.json')
uti_schema_data = read_json('/Users/aringy/Desktop/MATH/gain-backend/Models/suggest/uti_scheme_returns.json')
uti_schema = read_json('/Users/aringy/Desktop/MATH/gain-backend/Models/suggest/uti_schemes.json')

# Function to interact with Llama model
def llama_generate(prompt):
    response = ollama.chat(model="llama3", messages=[{"role": "user", "content": prompt}])
    return response['message']['content']

# Prepare all the prompts
prompt1 = """
I want you to parse the following input and extract relevant information. You must return the output strictly as JSON. No other type of response is acceptable.

the input is: "Hello I am Saahil Ahmad, a college student with an internship with a stipend of 15k rupees per month which might convert into a PPO after 1 year with a salary of 12 lac yearly. Out of that, my expenses are about 5k per month and I send 5k to my home. I have 5k savings per month, and after my salary increases, my expenses might rise to 4 lac per year. I am open to high risk and aim to increase my wealth over time to buy a car in 5 years for around 30 lacs."

You should output it in the following format:

{
  "name": "Saahil Ahmad",
  "occupation": "Student",
  "source_of_income": "Internship for 1 year and PPO afterwards",
  "expenses": "10k for 1 year and 4lac for 4 years",
  "savings": "5k for 1 year and 8 lac for 4 years",
  "family_size": 1,
  "goal": "Car",
  "goal_amount": "30 lac",
  "term": "5 years",
  "risk": "High"
}

Input:
\n\n
Please return the output strictly in JSON format.
"""

# Create an executor for parallel processing
def run_parallel_prompts():
    with ThreadPoolExecutor() as executor:
        futures = []
        futures.append(executor.submit(llama_generate, prompt1))

        response_text1 = futures[0].result()

        prompt2 = f"""
        Based on the profile information provided below and the loans data, suggest the 5 best loans that match the individual's goal. Please include clear calculations, such as EMI breakdown based on the interest rates provided. All data should be returned in JSON format only.

        Profile Data:
        \n{response_text1}\n\n
        Loans Data:
        \n{json.dumps(loans_data, indent=2)}
        Make sure the response is in pure JSON format with no other kind of data or comments. The response must only be JSON data.
        """
        futures.append(executor.submit(llama_generate, prompt2))

        prompt5 = f"""
        Using the profile data below, classify the individual into a category based on the category data and return an investment breakdown for that category. All information should be returned in JSON format only.

        Profile Data:
        \n{response_text1}\n\n
        Category Data:
        \n{json.dumps(category_data, indent=2)}
        The output must strictly be JSON and no other type of response is acceptable.
        """
        futures.append(executor.submit(llama_generate, prompt5))

        prompt3 = f"""
        Using the provided mutual funds data, suggest the top 5 schemes with the best return percentages. The response must be in JSON format only.

        Mutual Funds Data:
        \n{json.dumps(mutualfunds_data, indent=2)}
        Return the output strictly as JSON and ensure that no other information is included.
        """
        futures.append(executor.submit(llama_generate, prompt3))

        prompt4 = f"""
        Using the provided fixed deposit data, suggest the top 5 FDs with the best return percentages. Return the data only in JSON format.

        FD Data:
        \n{json.dumps(fd_data, indent=2)}
        Make sure to return the output strictly as JSON with no other types of responses or explanations.
        """
        futures.append(executor.submit(llama_generate, prompt4))

        # New UTI scheme prompt
        prompt6 = f"""
        Using the provided UTI schemes data, suggest the top 5 schemes based on return percentages. The response must be strictly in JSON format.

        UTI Schemes Data:
        \n{json.dumps(uti_schema, indent=2)}
        Ensure the response is pure JSON, with no other comments or data.
        """
        futures.append(executor.submit(llama_generate, prompt6))

        # UTI scheme returns breakdown prompt
        prompt7 = f"""
        Based on the UTI scheme returns data, suggest the best returns over different time periods and output them in JSON format only.

        UTI Scheme Returns Data:
        \n{json.dumps(uti_schema_data, indent=2)}
        Return the response strictly as JSON with no other types of responses or explanations.
        """
        futures.append(executor.submit(llama_generate, prompt7))

        for future in as_completed(futures):
            result = future.result()
            print("Result:", result)

run_parallel_prompts()