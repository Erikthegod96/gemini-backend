import { Injectable } from '@nestjs/common';
import { BasicPromptDto } from './dtos/basic-prompt.dto';
import { GoogleGenAI } from '@google/genai';
import { basicPromptUseCase } from './use-cases/basic-prompt.use-case';
import { basicPromptStreamUseCase } from './use-cases/basic-prompt-stream.use-case';
import Anthropic from '@anthropic-ai/sdk';
import { basicPromptClaudeUseCase } from './use-cases/basic-prompt-claude.use-case';

@Injectable()
export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  private aiClaude = new Anthropic({
    apiKey: process.env["ANTHROPIC_API_KEY"] // This is the default and can be omitted
  });

  async basicPrompt(basicPromptDto: BasicPromptDto) {
    return basicPromptUseCase(this.ai, basicPromptDto);
  }

  async basicPromptClaude(basicPromptDto: BasicPromptDto) {
    return basicPromptClaudeUseCase(this.aiClaude, basicPromptDto);
  }

  async basicPromptStream(basicPromptDto: BasicPromptDto) {
    return basicPromptStreamUseCase(this.ai, basicPromptDto);
  }
}
