import httpx
import asyncio
from typing import List, Dict, Any
from datetime import datetime, timedelta
from config import Config
from models import NewsArticle, NewsResponse

class NewsAPIProvider:
    def __init__(self):
        self.api_key = Config.NEWSAPI_KEY
        self.base_url = "https://newsapi.org/v2"
        
    async def fetch_ai_news(self) -> List[NewsArticle]:
        """Récupère les actualités IA depuis NewsAPI"""
        if not self.api_key:
            return []
            
        async with httpx.AsyncClient() as client:
            try:
                # Recherche avec mots-clés IA
                query = "intelligence artificielle OR IA OR AI OR machine learning OR GPT OR ChatGPT"
                url = f"{self.base_url}/everything"
                params = {
                    'q': query,
                    'language': 'fr',
                    'sortBy': 'publishedAt',
                    'pageSize': Config.MAX_ARTICLES,
                    'apiKey': self.api_key
                }
                
                response = await client.get(url, params=params)
                response.raise_for_status()
                data = response.json()
                
                articles = []
                for item in data.get('articles', []):
                    if self._is_ai_related(item.get('title', '') + ' ' + item.get('description', '')):
                        article = NewsArticle(
                            title=item.get('title', ''),
                            description=item.get('description', ''),
                            url=item.get('url', ''),
                            image_url=item.get('urlToImage'),
                            published_at=datetime.fromisoformat(item.get('publishedAt', '').replace('Z', '+00:00')) if item.get('publishedAt') else None,
                            source=item.get('source', {}).get('name', 'NewsAPI'),
                            category="IA"
                        )
                        articles.append(article)
                
                return articles
                
            except Exception as e:
                print(f"Erreur NewsAPI: {e}")
                return []
    
    def _is_ai_related(self, text: str) -> bool:
        """Vérifie si le texte est lié à l'IA"""
        text_lower = text.lower()
        return any(keyword.lower() in text_lower for keyword in Config.AI_KEYWORDS)

class BingNewsProvider:
    def __init__(self):
        self.api_key = Config.BING_NEWS_KEY
        self.base_url = "https://api.bing.microsoft.com/v7.0/news/search"
        
    async def fetch_ai_news(self) -> List[NewsArticle]:
        """Récupère les actualités IA depuis Bing News"""
        if not self.api_key:
            return []
            
        async with httpx.AsyncClient() as client:
            try:
                headers = {'Ocp-Apim-Subscription-Key': self.api_key}
                params = {
                    'q': 'intelligence artificielle OR IA OR AI',
                    'mkt': 'fr-FR',
                    'count': Config.MAX_ARTICLES,
                    'sortBy': 'Date'
                }
                
                response = await client.get(self.base_url, headers=headers, params=params)
                response.raise_for_status()
                data = response.json()
                
                articles = []
                for item in data.get('value', []):
                    article = NewsArticle(
                        title=item.get('name', ''),
                        description=item.get('description', ''),
                        url=item.get('url', ''),
                        image_url=item.get('image', {}).get('contentUrl') if item.get('image') else None,
                        published_at=datetime.fromisoformat(item.get('datePublished', '').replace('Z', '+00:00')) if item.get('datePublished') else None,
                        source=item.get('provider', [{}])[0].get('name', 'Bing News') if item.get('provider') else 'Bing News',
                        category="IA"
                    )
                    articles.append(article)
                
                return articles
                
            except Exception as e:
                print(f"Erreur Bing News: {e}")
                return []

class NewsAggregator:
    def __init__(self):
        self.newsapi = NewsAPIProvider()
        self.bing = BingNewsProvider()
        
    async def get_all_ai_news(self) -> NewsResponse:
        """Agrège les actualités de toutes les sources"""
        tasks = [
            self.newsapi.fetch_ai_news(),
            self.bing.fetch_ai_news()
        ]
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        all_articles = []
        for result in results:
            if isinstance(result, list):
                all_articles.extend(result)
            elif isinstance(result, Exception):
                print(f"Erreur source: {result}")
        
        # Supprimer les doublons basés sur l'URL
        unique_articles = []
        seen_urls = set()
        for article in all_articles:
            if article.url not in seen_urls:
                unique_articles.append(article)
                seen_urls.add(article.url)
        
        # Trier par date de publication
        unique_articles.sort(key=lambda x: x.published_at or datetime.min, reverse=True)
        
        return NewsResponse(
            articles=unique_articles[:Config.MAX_ARTICLES],
            total_count=len(unique_articles),
            last_updated=datetime.now(),
            source="ArchiaTech MCP Server"
        )
