"""
Text Generation Service
FastAPI service for AI text generation
"""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
from typing import Optional

app = FastAPI(title="Text Generation Service")

class GenerationRequest(BaseModel):
    prompt: str
    max_tokens: Optional[int] = 1000
    temperature: Optional[float] = 0.7
    model: Optional[str] = "gpt-4"

class GenerationResponse(BaseModel):
    text: str
    tokens_used: int
    finish_reason: str

@app.post("/generate", response_model=GenerationResponse)
async def generate_text(request: GenerationRequest):
    """
    Generate text content using AI models
    """
    try:
        # Initialize OpenAI client
        client = openai.OpenAI()
        
        # Generate text
        response = client.chat.completions.create(
            model=request.model,
            messages=[{"role": "user", "content": request.prompt}],
            max_tokens=request.max_tokens,
            temperature=request.temperature
        )
        
        generated_text = response.choices[0].message.content
        
        return GenerationResponse(
            text=generated_text,
            tokens_used=response.usage.total_tokens,
            finish_reason=response.choices[0].finish_reason
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "text_generation"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

