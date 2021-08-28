from typing import List
from fastapi import APIRouter, Depends
from config.db import db
from config.auth import get_current_active_user
from models.user import UserInfo


router = APIRouter()
collection = db.user

@router.get("/")
async def root():
    return {"response": "Welcome to your app!"}

@router.get('/api/users', response_model=List[UserInfo], response_description="List of all users")
async def get_all_users(current_user: UserInfo = Depends(get_current_active_user)):
    users = await collection.find().to_list(100)
    return users

@router.get("/api/users/me/", response_model=UserInfo)
async def read_users_me(current_user: UserInfo = Depends(get_current_active_user)):
    return current_user
