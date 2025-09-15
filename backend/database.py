from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# declaring sqlite local database url
db_url = "sqlite:///./food_ordering.db"

# creating database engine
db_engine = create_engine(db_url,
                          connect_args = {"check_same_thread": False})

# specifying session factory for db operations
session_local = sessionmaker(autocommit = False,
                             autoflush = False,
                             bind = db_engine)

# specifying base class for models
Base = declarative_base()

# creating dependency function to get db session
def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()
