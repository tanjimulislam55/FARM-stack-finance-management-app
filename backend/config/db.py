import motor.motor_asyncio
from functools import lru_cache
import os
from dotenv import load_dotenv

@lru_cache()
def cached_dotenv():
    load_dotenv()


cached_dotenv()

client = motor.motor_asyncio.AsyncIOMotorClient(os.environ.get("MONGODB_URL"))

db = client.finance
