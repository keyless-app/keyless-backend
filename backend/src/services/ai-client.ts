import axios from "axios";

/**
 * Client for communicating with Python AI services
 */
export class AIClient {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:8000") {
    this.baseUrl = baseUrl;
  }

  /**
   * Call text generation service
   */
  async generateText(prompt: string, config?: any) {
    const response = await axios.post(`${this.baseUrl}/text/generate`, {
      prompt,
      config,
    });
    return response.data;
  }

  /**
   * Call image generation service
   */
  async generateImage(prompt: string, config?: any) {
    const response = await axios.post(`${this.baseUrl}/image/generate`, {
      prompt,
      config,
    });
    return response.data;
  }

  /**
   * Call code generation service
   */
  async generateCode(prompt: string, config?: any) {
    const response = await axios.post(`${this.baseUrl}/code/generate`, {
      prompt,
      config,
    });
    return response.data;
  }

  /**
   * Call audio generation service
   */
  async generateAudio(prompt: string, config?: any) {
    const response = await axios.post(`${this.baseUrl}/audio/generate`, {
      prompt,
      config,
    });
    return response.data;
  }

  /**
   * Call data analysis service
   */
  async analyzeData(prompt: string, data?: any) {
    const response = await axios.post(`${this.baseUrl}/analysis/analyze`, {
      prompt,
      data,
    });
    return response.data;
  }

  /**
   * Call search and research service
   */
  async searchAndResearch(query: string, config?: any) {
    const response = await axios.post(`${this.baseUrl}/search/research`, {
      query,
      config,
    });
    return response.data;
  }
}
