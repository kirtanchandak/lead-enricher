from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl, validator
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class EnrichmentRequest(BaseModel):
    company_name: str
    website: HttpUrl

    # Validate that both fields are populated and correctly formatted
    @validator("company_name", "website")
    def check_not_empty(cls, value):
        if not value or value.strip() == "":
            raise ValueError("Field cannot be empty")
        return value

CLEARBIT_API_KEY = os.getenv("CLEARBIT_API_KEY") 

@app.post("/api/enrich")
async def enrich_company(data: EnrichmentRequest):
    if not CLEARBIT_API_KEY:
        raise HTTPException(status_code=500, detail="API key not set")

    clearbit_url = "https://company.clearbit.com/v1/domains/find"

    response = requests.get(
        clearbit_url,
        headers={"Authorization": f"Bearer {CLEARBIT_API_KEY}"},
        params={"domain": data.website},
    )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to retrieve data")

    return response.json()
