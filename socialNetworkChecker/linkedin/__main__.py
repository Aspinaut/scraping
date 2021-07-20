import dotenv
from linkedin_api import Linkedin
import os
# replace following JSON by any df
import "./fakeCompanies.json" as companies

dotenv.load_dotenv()

api = Linkedin(os.getenv('LN_EMAIL'), os.getenv('LN_PASSWORD'))

def check_company(lnCompany):
    
    return false

def main():
    for company of companies:
        lnCompany = api.get_company('culturius')
        if check_company(lnCompany):
            # ecrire une nouvelle ligne dans le JSON pour la certifier

main()