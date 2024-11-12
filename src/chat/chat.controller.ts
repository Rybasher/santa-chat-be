import { Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatSession } from './entities/chat.entity';
import { SantaService } from '../santa/santa.service';
import { SessionId } from '../common/decorators/session.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly santaService: SantaService,
  ) {}

  @ApiOperation({ summary: 'Get chat info' })
  @Get('chat-session')
  async getOrCreateChatSession(
    @SessionId() sessionId: string,
  ): Promise<ChatSession> {
    return this.chatService.getOrCreateChatSession(sessionId);
  }

  @ApiOperation({ summary: 'Create chat' })
  @Post('chat-session')
  async createChatSession(
    @SessionId() sessionId: string,
  ): Promise<ChatSession> {
    return this.chatService.createChatSession(sessionId);
  }

  @ApiOperation({ summary: 'Get all messages for chat' })
  @Get('chat-session/messages/:id')
  async getChatSession(@Param('id') id: string): Promise<ChatSession> {
    return this.chatService.getChatSession(id);
  }

  @ApiOperation({ summary: 'Get all user chats' })
  @Get('user-chats')
  async getAllUserChats(
    @SessionId() sessionId: string,
  ): Promise<ChatSession[]> {
    return await this.chatService.getAllUserChats(sessionId);
  }
}
