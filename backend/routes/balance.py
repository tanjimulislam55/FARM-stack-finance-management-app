from typing import List
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from config.db import db
from config.auth import get_current_active_user
from models.user import User, UserInfo
import time

router = APIRouter()
collection1 = db.income_from_person
collection2 = db.income_from_program
collection3 = db.expenditure

async def foo(text):
    time.sleep(3)
    return text

async def boo():
    text = await foo('some texts')
    print(text)
    print('before text prints')
    time.sleep(3)


@router.get('/api/balance')
async def get_balance(current_user: UserInfo = Depends(get_current_active_user)):
    balance = 0
    x = await collection1.find().to_list(100000)
    for item in x:
        balance += item["amount"]
    y = await collection2.find().to_list(100000)
    for item in y:
        balance += item["amount"]
    z = await collection3.find().to_list(100000)
    for item in z:
        balance -= item["amount"]

    # print('started')
    # boo()
    # print('finished')
    
    return JSONResponse(status_code=status.HTTP_200_OK, content=balance)
