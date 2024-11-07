from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed, "*" allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define the request body schema
class EnrichmentRequest(BaseModel):
    company: str
    website: str

# Coresignal API key (Bearer token) from environment variables
CORESIGNAL_API_KEY = os.getenv("CORESIGNAL_API_KEY")

@app.post("/api/enrich")
async def enrich_company(data: EnrichmentRequest):
    # Coresignal API URL for company search
    coresignal_url = "https://api.coresignal.com/cdapi/v1/professional_network/company/search/filter"
    
    # Prepare headers with the API key
    headers = {
        "Authorization": f"Bearer {CORESIGNAL_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Prepare the payload for the API request
    payload = {
        "website": data.website,
        "name": data.company
    }
    
    # Make the API request
    response = requests.post(coresignal_url, headers=headers, json=payload)

    # Check if the request was successful
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to retrieve data from Coresignal")

    # Parse the JSON response
    company_data = response.json()

    # Check if company data is a list, and handle accordingly
    if isinstance(company_data, list):
        company_ids = company_data  # Directly use the list as company IDs
    else:
        company_ids = company_data.get("data", [])

    # If no data is returned, raise an error
    if not company_ids:
        raise HTTPException(status_code=404, detail="No companies found")

    # For example, we are selecting the first company ID for the GET request
    company_id = company_ids[0]

    # Now make a GET request with the company ID to get the detailed record
    get_url = f"https://api.coresignal.com/cdapi/v1/professional_network/company/collect/{company_id}"

    get_response = requests.get(get_url, headers=headers)

    if get_response.status_code != 200:
        raise HTTPException(status_code=get_response.status_code, detail="Failed to retrieve detailed company data")

    # Parse and return the detailed company data
    detailed_company_data = get_response.json()

    return detailed_company_data
