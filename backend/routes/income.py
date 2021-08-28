from fastapi import APIRouter, status, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import List, Optional
from config.db import db
from models.income import FromProgram, FromPerson
from config.auth import get_current_active_user
from models.user import UserInfo


router = APIRouter()
collection1 = db.income_from_person
collection2 = db.income_from_program


@router.get('/api/income_from_person', response_model=List[FromPerson], response_description="List of all donations")
async def get_all_donations_from_person(current_user: UserInfo = Depends(get_current_active_user), q: Optional[str] = None):
    if q:
        document = await collection1.find({"type": q}).to_list(10000)
    else:    
        document = await collection1.find().to_list(10000)
    return JSONResponse(status_code=status.HTTP_200_OK, content=document)


@router.post('/api/income_from_person', response_model=FromPerson, response_description="Add donation from person")
async def insert_donation_from_person(from_person: FromPerson, current_user: UserInfo = Depends(get_current_active_user)):
    new_entry = await collection1.insert_one(jsonable_encoder(from_person))
    document = await collection1.find_one(({"_id": new_entry.inserted_id}))
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=document)


@router.get('/api/income_from_program', response_model=List[FromProgram], response_description="List of all donations")
async def get_all_donations_from_program(current_user: UserInfo = Depends(get_current_active_user), q: Optional[str] = None):
    if q:
        document = await collection2.find({"type": q}).to_list(10000)
    else:
        document = await collection2.find().to_list(10000)
    return JSONResponse(status_code=status.HTTP_200_OK, content=document)


@router.post('/api/income_from_program', response_model=FromProgram, response_description="Add donation from program")
async def insert_donation_from_program(from_program: FromProgram, current_user: UserInfo = Depends(get_current_active_user)):
    new_entry = await collection2.insert_one(jsonable_encoder(from_program))
    document = await collection2.find_one(({"_id": new_entry.inserted_id}))
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=document)


# ---------------------------------------------------------------------------------------------


@router.get('/api/income_from_person/{start_date}_{end_date}', response_model=FromPerson)
async def query_date_from_person(start_date: str, end_date: str, current_user: UserInfo = Depends(get_current_active_user), q: Optional[str] = None):
    if q:
        document = await collection1.find({"date": {"$gte": start_date, "$lte": end_date}, "type": q}).to_list(10000)
    else:
        document = await collection1.find({"date": {"$gte": start_date, "$lte": end_date}}).to_list(10000)
    return JSONResponse(status_code=status.HTTP_200_OK, content=document)


@router.get('/api/income_from_program/{start_date}_{end_date}', response_model=FromProgram)
async def query_date_from_program(start_date: str, end_date: str, current_user: UserInfo = Depends(get_current_active_user), q: Optional[str] = None):
    if q:
        document = await collection2.find({"date": {"$gte": start_date, "$lte": end_date}, "type": q}).to_list(10000)
    else:
        document = await collection2.find({"date": {"$gte": start_date, "$lte": end_date}}).to_list(10000)
    return JSONResponse(status_code=status.HTTP_200_OK, content=document)

