# services/salesforce_client.py

import os
from simple_salesforce import Salesforce
from dotenv import load_dotenv

# load variables from .env
load_dotenv()

def connect_salesforce():
    """
    connect to Salesforce using secure credentials from .env.
    Returns an authenticated Salesforce object.
    """
    try:
        sf = Salesforce(
            username=os.getenv("SALESFORCE_USERNAME"),
            password=os.getenv("SALESFORCE_PASSWORD"),
            security_token=os.getenv("SALESFORCE_TOKEN"),
            domain=os.getenv("SALESFORCE_DOMAIN", "login")
        )
        return sf
    except Exception as e:
        print("error connecting to Salesforce:", e)
        return None


def query_salesforce_accounts(limit=10):
    """
    Query real to Salesforce to get accounts.
    If it fails to connect, returns an empty list.
    """
    sf = connect_salesforce()
    if not sf:
        print("Error connecting to Salesforce")
        return []

    try:
        soql = f"SELECT Name, Industry, Phone FROM Account LIMIT {limit}"
        result = sf.query(soql)
        return result.get("records", [])
    except Exception as e:
        print("Error querying Salesforce:", e)
        return []
        
