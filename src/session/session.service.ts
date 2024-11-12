import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSession } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
  ) {}

  async getOrCreateSession(
    sessionId: string,
    userAgent: string = null,
  ): Promise<UserSession> {
    let session = await this.userSessionRepository.findOne({
      where: { id: sessionId },
      relations: ['chatSessions'],
    });

    if (!session) {
      session = this.userSessionRepository.create({ id: sessionId, userAgent });
      session = await this.userSessionRepository.save(session);
    }

    return session;
  }

  async findSessionById(sessionId: string): Promise<UserSession | null> {
    return this.userSessionRepository.findOne({
      where: { id: sessionId },
      relations: ['chatSessions'],
    });
  }
}
