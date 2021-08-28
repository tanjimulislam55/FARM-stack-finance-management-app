from fastapi import Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.routing import APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from passlib.context import CryptContext
from models.user import User, UserInDB, UserInfo
from models.auth import Token
from config.db import db
from config.auth import get_password_hash, authenticated_user, create_access_token


collection = db.user
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pass_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

router = APIRouter()


@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticated_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer", "disabled": user.disabled}


@router.post('/register', response_model=UserInfo, response_description="Add new user")
async def register(user: User):
    new_user = user.dict()
    new_user["hashed_password"] = get_password_hash(new_user["password"])
    new_user["disabled"] = True
    new_user.pop("password")
    all_users = await collection.find().to_list(9999)
    if any(x["username"] == new_user["username"] for x in all_users):
        # return JSONResponse(status_code=status.HTTP_201_CREATED, content=document)
        raise HTTPException(status_code=400, detail="The username is taken")

    if any(x["email"] == new_user["email"] for x in all_users):
        raise HTTPException(status_code=400, detail="The email is already in use")
    new_entry = await collection.insert_one(jsonable_encoder(UserInDB(**new_user)))
    document = await collection.find_one({"_id": new_entry.inserted_id}, {"hashed_password": 0, "disabled": 0})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=document)
    # note: here response_model won't work as it's not returning as (return user)
