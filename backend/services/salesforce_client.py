from typing import List, Dict

def query_salesforce_accounts(sample_limit: int =3) -> List[Dict]:

    """
    stub: simulates a consult of salesforce and return  dummy accounts.
    then we will after replace this stub with a real salesforce client
    """
    return [
        {"Name": "Acme Corp", "Industry": "Energy", "Phone": "+1-555-0100"},
        {"Name": "Globex", "Industry": "Manufacturing", "Phone": "+1-555-0200"},
        {"Name": "Initech", "Industry": "Tech", "Phone": "+1-555-0300"},
    ][:sample_limit]
