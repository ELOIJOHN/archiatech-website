from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class NewsArticle(BaseModel):
    title: str
    description: Optional[str] = None
    url: str
    image_url: Optional[str] = None
    published_at: Optional[datetime] = None
    source: str
    category: str = "IA"
    
class NewsResponse(BaseModel):
    articles: List[NewsArticle]
    total_count: int
    last_updated: datetime
    source: str

class MCPRequest(BaseModel):
    method: str
    params: Optional[dict] = None

class MCPResponse(BaseModel):
    result: Optional[dict] = None
    error: Optional[str] = None
    success: bool = True
