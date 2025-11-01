
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel #pydantic allow us to validate the data
from services.salesforce_client import query_salesforce_accounts
from services.llm_agent import generate_response_from_context
from fastapi.middleware.cors import CORSMiddleware
import pathlib, datetime

print("🔥 Archivo ejecutado:", pathlib.Path(__file__).resolve())
print("🕒 Hora de carga:", datetime.datetime.now())


app = FastAPI(title="AI Customer Support Agent")
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://localhost:5174"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            #what origins can access
    allow_credentials=True,           #allow cookies/autenticatión if needed
    allow_methods=["*"],              #allow all methods (GET, POST, etc.)
    allow_headers=["*"],              #allow all headers (Content-Type, Authorization, etc.)
)
class Query(BaseModel):
    question: str


@app.get("/health")
def health_check():
    return {"status": "ok"}
   



@app.post("/ask")
async def ask_agent(query: Query):
    try:
        # recibe question and validate with pydantic
        user_question = query.question
        
        # Simulate context crm
        context = query_salesforce_accounts(limit=3)
        ai_reply = generate_response_from_context(user_question, context)  

        # respond to  client
        return {"answer": ai_reply}


    except Exception as e:
        # if something fails, return HTTP 500 with the detail
        raise HTTPException(status_code=500, detail=str(e))

        
        