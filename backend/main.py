from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import income, user, expenditure, auth, balance
import os
from functools import lru_cache
from dotenv import load_dotenv


app = FastAPI()


@lru_cache()
def cached_dotenv():
    load_dotenv()


cached_dotenv()


origins = [
    os.environ.get("URL_ONE"),
    os.environ.get("URL_TWO"),
    os.environ.get("URL_THREE"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(income.router)
app.include_router(expenditure.router)
app.include_router(auth.router)
app.include_router(balance.router)
