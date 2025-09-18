from fastapi import FastAPI
from backend import models, database
from backend.routes import menu, orders
from fastapi.middleware.cors import CORSMiddleware

# creating database tables
models.Base.metadata.create_all(bind = database.db_engine)

app = FastAPI(title = "WhatsApp Food Ordering System")

# to allow frontend to connect with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],)

# including routes
app.include_router(menu.api_router)
app.include_router(orders.api_router)


@app.get("/")
def root():
    return {"message": "Backend with menu and orders is running!"}
