from pydantic import BaseModel
from datetime import datetime

class FileNameInput(BaseModel):
    file_name: str
    content: str

class FileResponse(BaseModel):
    file_name: str
    creation_date: datetime
   
