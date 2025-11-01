# services/salesforce_client.py

import os
from simple_salesforce import Salesforce
from dotenv import load_dotenv

# Cargar variables de entorno (.env)
load_dotenv()

def connect_salesforce():
    """
    Conecta con Salesforce usando credenciales seguras del .env.
    Devuelve un objeto Salesforce autenticado.
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
        print("Error al conectar con Salesforce:", e)
        return None


def query_salesforce_accounts(limit=5):
    """
    Consulta real a Salesforce para traer cuentas.
    Si no logra conectar, devuelve una lista vacía.
    """
    sf = connect_salesforce()
    if not sf:
        return []

    try:
        soql = f"SELECT Name, Industry, Phone FROM Account LIMIT {limit}"
        result = sf.query(soql)
        return result.get("records", [])
    except Exception as e:
        print("Error al consultar Salesforce:", e)
        return []
