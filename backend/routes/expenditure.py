from typing import List, Optional
from fastapi import APIRouter, status, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from models.expenditure import Expenditure
from config.db import db
from config.auth import get_current_active_user
from models.user import UserInfo


router = APIRouter()
collection1 = db.expenditure


@router.get('/api/expenditure', response_model=List[Expenditure], response_description="List of all expenditures")
async def get_all_expenditures(current_user: UserInfo = Depends(get_current_active_user), q: Optional[str] = None):
    if q:
        document = await collection1.find({"type": q}).to_list(10000)
    else:
        document = await collection1.find().to_list(10000)
    return JSONResponse(status_code=status.HTTP_200_OK, content=document)
    

@router.post('/api/expenditure', response_model=Expenditure, response_description="Add expenditure")
async def insert_expenditure(expenditure: Expenditure, current_user: UserInfo = Depends(get_current_active_user)):
    new_entry = await collection1.insert_one(jsonable_encoder(expenditure))
    document = await collection1.find_one(({"_id": new_entry.inserted_id}))
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=document)


# ---------------------------------------------------------------------------------------------


@router.get('/api/expenditure/{start_date}_{end_date}', response_model=Expenditure)
async def query_date_expenditure(start_date: str, end_date: str, current_user: UserInfo = Depends(get_current_active_user), q: Optional[str] = None):
    if q:
        document = await collection1.find({"date": {"$gte": start_date, "$lte": end_date}, "type": q}).to_list(10000)
    else:    
        document = await collection1.find({"date": {"$gte": start_date, "$lte": end_date}}).to_list(10000)
    return JSONResponse(status_code=status.HTTP_200_OK, content=document)
