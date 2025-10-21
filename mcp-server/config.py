import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # API Keys
    NEWSAPI_KEY = os.getenv('NEWSAPI_KEY', '')
    BING_NEWS_KEY = os.getenv('BING_NEWS_KEY', '')
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')
    
    # Server Configuration
    MCP_SERVER_PORT = int(os.getenv('MCP_SERVER_PORT', 8000))
    MCP_SERVER_HOST = os.getenv('MCP_SERVER_HOST', '0.0.0.0')
    
    # News Configuration
    MAX_ARTICLES = int(os.getenv('MAX_ARTICLES', 10))
    CACHE_DURATION = int(os.getenv('CACHE_DURATION', 3600))
    
    # AI Keywords for filtering
    AI_KEYWORDS = [
        'intelligence artificielle', 'IA', 'AI', 'machine learning', 'ML',
        'deep learning', 'neural network', 'GPT', 'ChatGPT', 'OpenAI',
        'automatisation', 'robotique', 'algorithm', 'data science',
        'transformation digitale', 'innovation', 'tech', 'startup'
    ]
