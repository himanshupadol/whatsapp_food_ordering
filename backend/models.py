from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base

# creating class of menu items structure
class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key = True, index = True)
    name = Column(String, index = True, nullable = False)
    description = Column(String, nullable = True)
    price = Column(Float, nullable = False)
    available = Column(Boolean, default = True)

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key = True, index = True)
    customer_name = Column(String, nullable = False)
    whatsapp_number = Column(String, nullable = False)
    status = Column(String, default = "pending")

    items = Column(String, nullable = False)
