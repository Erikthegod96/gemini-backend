
import { BasicPromptDto } from '../dtos/basic-prompt.dto';
import Anthropic from '@anthropic-ai/sdk';

interface Options {
    model?: string;
}

export const basicPromptClaudeUseCase = async (
    ai: Anthropic,
    basicPromptDto: BasicPromptDto,
    options?: Options,
) => {
    const { prompt, files = [] } = basicPromptDto;

    const { model = 'claude-sonnet-4-5' } = options ?? {};

    const params: Anthropic.MessageCreateParams = {
        max_tokens: 10,
        messages: [{ role: "user", content: prompt }],
        model
    };
    const message: Anthropic.Message = await ai.messages.create(params);
    console.log(message.usage)
    return message;
};
