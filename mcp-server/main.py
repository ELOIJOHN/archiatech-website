from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import Dict, Any
from datetime import datetime
import json

from config import Config
from models import MCPRequest, MCPResponse, NewsResponse
from news_sources import NewsAggregator

app = FastAPI(
    title="ArchiaTech MCP Server",
    description="Serveur MCP pour la veille IA ArchiaTech",
    version="1.0.0"
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En production, spécifier les domaines autorisés
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instance de l'agrégateur de news
news_aggregator = NewsAggregator()

@app.get("/")
async def root():
    """Endpoint de base"""
    return {
        "message": "ArchiaTech MCP Server - Veille IA",
        "version": "1.0.0",
        "endpoints": {
            "/mcp": "Endpoint MCP principal",
            "/health": "Health check",
            "/news": "Actualités IA directes",
            "/docs": "Documentation Swagger"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "server": "ArchiaTech MCP"
    }

@app.post("/mcp")
async def mcp_endpoint(request: MCPRequest) -> MCPResponse:
    """Endpoint principal MCP"""
    try:
        if request.method == "get_ai_news":
            news_response = await news_aggregator.get_all_ai_news()
            
            # Conversion en format MCP
            result = {
                "articles": [
                    {
                        "title": article.title,
                        "description": article.description,
                        "url": article.url,
                        "image_url": article.image_url,
                        "published_at": article.published_at.isoformat() if article.published_at else None,
                        "source": article.source,
                        "category": article.category
                    }
                    for article in news_response.articles
                ],
                "total_count": news_response.total_count,
                "last_updated": news_response.last_updated.isoformat(),
                "source": news_response.source
            }
            
            return MCPResponse(
                result=result,
                success=True
            )
        
        elif request.method == "ping":
            return MCPResponse(
                result={"message": "pong", "timestamp": datetime.now().isoformat()},
                success=True
            )
        
        else:
            return MCPResponse(
                error=f"Méthode non supportée: {request.method}",
                success=False
            )
            
    except Exception as e:
        return MCPResponse(
            error=f"Erreur serveur: {str(e)}",
            success=False
        )

@app.get("/news")
async def get_ai_news_direct():
    """Endpoint direct pour récupérer les actualités IA"""
    try:
        news_response = await news_aggregator.get_all_ai_news()
        return news_response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/news/json")
async def get_ai_news_json():
    """Endpoint pour récupérer les actualités en JSON brut"""
    try:
        news_response = await news_aggregator.get_all_ai_news()
        return {
            "success": True,
            "data": news_response.dict(),
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }

if __name__ == "__main__":
    print("🚀 Démarrage du serveur MCP ArchiaTech...")
    print(f"📍 URL: http://{Config.MCP_SERVER_HOST}:{Config.MCP_SERVER_PORT}")
    print("📖 Documentation: http://localhost:8000/docs")
    
    uvicorn.run(
        "main:app",
        host=Config.MCP_SERVER_HOST,
        port=Config.MCP_SERVER_PORT,
        reload=True
    )
