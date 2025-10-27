"""
Shared types for AI services
"""
from typing import Optional, List, Dict, Any
from pydantic import BaseModel
from enum import Enum

class AIModel(str, Enum):
    """Supported AI models"""
    GPT_4 = "gpt-4"
    GPT_3_5 = "gpt-3.5-turbo"
    CLAUDE = "claude-3-opus"
    DALL_E = "dall-e-3"
    STABLE_DIFFUSION = "stable-diffusion-xl"
    CODE_BISON = "code-bison-32k"

class GenerationConfig(BaseModel):
    """Configuration for AI generation"""
    model: Optional[str] = None
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 1000
    top_p: Optional[float] = 1.0
    frequency_penalty: Optional[float] = 0.0
    presence_penalty: Optional[float] = 0.0

class ImageGenerationConfig(BaseModel):
    """Configuration for image generation"""
    width: Optional[int] = 1024
    height: Optional[int] = 1024
    num_images: Optional[int] = 1
    style: Optional[str] = "natural"

class APIResponse(BaseModel):
    """Standard API response"""
    success: bool
    data: Any
    message: Optional[str] = None
    error: Optional[str] = None

