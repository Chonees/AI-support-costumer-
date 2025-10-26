from typing import List, Dict 
import os 
from openai import OpenAI

def generate_response_from_context(question: str, context_records: List[Dict]) -> str:
    """  Generate a real response using the GPT-4o-mini model.
    Receives a question and records (e.g. Salesforce accounts).""" 
    # create  textual context 
    context = "\n".join(
        [f"- {r['Name']} ({r['Industry']}, {r['Phone']})" for r in context_records]
    )

    #prompt for the model
    system_prompt = ("""
    "Sos Tauro,  an expert customer support agent. "
        "Use the Salesforce information to answer clearly, briefly and professionally."
    """)
    user_prompt = f"Datos del CRM: \n{context}\n\nUser question:\n{question}"

    # Initialize OpenAI client with API key from environment
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    #call   GPT-4o-mini
    completion = client.chat.completions.create(
        model= "gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.4,
        max_tokens=300,
    )

    #extract final text 
    answer = completion.choices[0].message.content.strip()
    return answer