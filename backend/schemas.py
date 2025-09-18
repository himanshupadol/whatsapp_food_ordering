from pydantic import BaseModel
from typing import List
from datetime import datetime

# Schema for each item in the order
class ItemCreate(BaseModel):
    name: str
    quantity: int

class ItemRead(BaseModel):
    name: str
    quantity: int

# Schema for creating an order
class OrderCreate(BaseModel):
    customer_name: str
    whatsapp_number: str
    items: List[ItemCreate]
    status: str | None = "pending"  # default if not provided
    total: int

class OrderBase(BaseModel):
    customer_name: str
    whatsapp_number: str
    items: str
    status: str = "pending"
    total: int

# Schema for reading an order (response)
class OrderRead(BaseModel):
    id: int
    customer_name: str
    whatsapp_number: str
    items: List[ItemRead]
    status: str
    total: int
    created_at: datetime

    class Config:
        orm_mode = True
