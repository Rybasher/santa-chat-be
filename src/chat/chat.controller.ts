import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatSession } from './entities/chat.entity';
import { SantaService } from '../santa/santa.service';
import { SessionId } from '../common/decorators/session.decorator';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly santaService: SantaService,
  ) {}

  @Get('chat-session')
  async getOrCreateChatSession(
    @SessionId() sessionId: string,
  ): Promise<ChatSession> {
    return this.chatService.getOrCreateChatSession(sessionId);
  }

  @Post('chat-session')
  async createChatSession(
    @SessionId() sessionId: string,
  ): Promise<ChatSession> {
    return this.chatService.createChatSession(sessionId);
  }
  @Get('chat-session/messages/:id')
  async getChatSession(@Param('id') id: string): Promise<ChatSession> {
    return this.chatService.getChatSession(id);
  }

  @ApiOperation({ summary: 'Get all user chats' })
  @Get('user-chats')
  async getAllUserChats(
    @SessionId() sessionId: string,
  ): Promise<ChatSession[]> {
    const chatSessions = await this.chatService.getAllUserChats(sessionId);
    if (!chatSessions || chatSessions.length === 0) {
      throw new NotFoundException(
        'No chat sessions found for the provided user.',
      );
    }
    return chatSessions;
  }
}
