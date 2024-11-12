import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatService } from '../chat/chat.service';
import { ChatCompletionMessageParam } from 'openai/resources';
import OpenAI from 'openai';

@Injectable()
export class SantaService {
  private openai: OpenAI;

  constructor(
    private configService: ConfigService,
    private chatService: ChatService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateSantaResponseStream(
    sessionId: string,
    userMessage: string,
  ): Promise<any> {
    await this.chatService.saveMessage(sessionId, 'user', userMessage);
    const chatHistory = await this.chatService.getChatSession(sessionId);

    const history = chatHistory.messages.map(
      (message): ChatCompletionMessageParam =>
        ({
          role: message.sender,
          content: message.content,
        }) as ChatCompletionMessageParam,
    );

    const stream = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You talk like Santa Claus. Answer all questions with holiday cheer, jokes, and festive spirit.',
        },
        ...history,
      ],
      stream: true,
    });

    const chatService = this.chatService;

    return (async function* () {
      let botResponse = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          botResponse += content;
          yield { content };
        }
      }

      await chatService.saveMessage(sessionId, 'system', botResponse);
    })();
  }
}
