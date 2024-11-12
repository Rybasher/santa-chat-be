import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatSession } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { UserSession } from '../session/entities/session.entity';
import { SessionService } from '../session/session.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatSession)
    private readonly chatSessionRepo: Repository<ChatSession>,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    @InjectRepository(UserSession)
    private readonly userRepo: Repository<UserSession>,
    private readonly userSessionService: SessionService,
  ) {}
  public async getOrCreateChatSession(sessionId: string): Promise<ChatSession> {
    let chatSession = await this.chatSessionRepo.findOne({
      where: { sessionId },
    });
    if (!chatSession) {
      chatSession = await this.createChatSession(sessionId);
    }
    return chatSession;
  }

  public async createChatSession(sessionId: string): Promise<ChatSession> {
    const timestamp = Date.now();
    const combinedSessionId = `${sessionId}-${timestamp}`;
    const userSession =
      await this.userSessionService.getOrCreateSession(sessionId);
    const chatSession = this.chatSessionRepo.create({
      sessionId: combinedSessionId,
      userSession: userSession,
    });
    await this.chatSessionRepo.save(chatSession);
    return chatSession;
  }

  async saveMessage(sessionId: string, sender: string, content: string) {
    const chatSession = await this.chatSessionRepo.findOne({
      where: { id: +sessionId },
    });
    const message: Message = this.messageRepo.create({
      content,
      sender,
      chatSession,
    });
    return await this.messageRepo.save(message);
  }

  public async getChatSession(id: string): Promise<ChatSession> {
    const chatSession = await this.chatSessionRepo.findOne({
      where: { id: Number(id) },
      relations: ['messages'],
    });

    if (!chatSession) {
      throw new NotFoundException('Chat session not found');
    }
    return chatSession;
  }
  public async getAllUserChats(userSessionId: string): Promise<ChatSession[]> {
    const userSession = await this.userRepo.findOne({
      where: {
        id: userSessionId,
      },
      relations: ['chatSessions'],
    });

    if (userSession) {
      return userSession.chatSessions;
    }
    throw new NotFoundException(
      'No chat sessions found for the provided user.',
    );
  }
}
