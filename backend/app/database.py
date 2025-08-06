# database.py
import os
import sqlalchemy
import databases
from dotenv import load_dotenv , find_dotenv

# Load environment variables from .env file
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Database object for executing queries
database = databases.Database(DATABASE_URL)

# SQLAlchemy metadata for schema definition
metadata = sqlalchemy.MetaData()