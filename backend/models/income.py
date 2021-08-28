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


class FromPerson(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    donor_name: str
    registration: Optional[str] = None
    phone: Optional[str] = None
    amount: float
    type: str
    date: str
    user: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "donor_name": "Jane Doe",
                "registration": "222/333",
                "phone": "01100101010",
                "amount": "5000",
                "type": "yoga",
                "date": "2021.8.29 11:20:30",
                "user": "user"
            }
        }


class FromProgram(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    program_name: str
    total_participant: Optional[str] = None
    amount: float
    date: str
    user: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "program_name": "Jane Doe",
                "total_participant": "20",
                "amount": "400",
                "date": "2021.8.29 11:20:30",
                "user": "user"
            }
        }
    
