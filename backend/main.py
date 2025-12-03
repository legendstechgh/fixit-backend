from fastapi import FastAPI
import json, os

app = FastAPI()

# Load issues JSON
DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "issues.json")
with open(DATA_PATH, "r") as f:
    ISSUES = json.load(f)

@app.get("/")
def home():
    return {"message": "FixIt API is running"}

@app.get("/issues")
def get_issues():
    return ISSUES
