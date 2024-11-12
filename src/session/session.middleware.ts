import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SessionService } from './session.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly userSessionService: SessionService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let sessionId = req.cookies['session_id'];

    if (!sessionId) {
      sessionId = uuidv4();
      res.cookie('session_id', sessionId, { httpOnly: true });
    }

    const userAgent = req.headers['user-agent'] || 'unknown';
    await this.userSessionService.getOrCreateSession(sessionId, userAgent);

    next();
  }
}
