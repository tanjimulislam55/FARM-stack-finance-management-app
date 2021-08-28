from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class Expenditure(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    amount: float
    details: Optional[str] = None
    type: str
    date: str
    user: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "amount": "3000",
                "details": "Some details",
                "type": "yoga",
                "date": "2021.8.29 11:20:30",
                "user": "user"
            }
        }
