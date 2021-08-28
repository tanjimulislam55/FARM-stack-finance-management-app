from logging import disable
from pydantic import BaseModel
from typing import Optional


class Token(BaseModel):
    access_token: str
    token_type: str
    disabled: bool


class TokenData(BaseModel):
    username: Optional[str] = None
