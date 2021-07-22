import dotenv
from linkedin_api import Linkedin
import os
import json

dotenv.load_dotenv()

api = Linkedin(os.getenv('LN_EMAIL'), os.getenv('LN_PASSWORD'))

def check_company(lnCompany):
    # WIP
    # voir avec farid pour savoir a quoi ressemble le format de ladresse
    # print(lnCompany["url"])
    # print(lnCompany["confirmedLocations"][0]["city"]) 
    # print(lnCompany["headquarter"])
    return True

def main():
    f = open('fakeCompanies.json', "r+")
    companies = json.load(f)
    f.close()
    f = open('newFakeCompanies.json', "w")
    f.write('[')
    for company in companies:
        try:
            lnCompany = api.get_company(company["name"])
            print('Company found on Linkedin ! Let\'s check it...')
            if check_company(lnCompany):
                # ecrire une nouvelle ligne dans le JSON pour la certifier
                rawLine = {"isOnLinkedin": True}
                company.update(rawLine)
                json.dump(company, f, indent=4)
                f.write(',')
        except KeyError:
            print('Company not found on Linkedin...')
    f.write(']')
    f.close()


main()