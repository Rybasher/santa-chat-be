import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

export const SessionId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const sessionId =
      request.cookies['session_id'] || request.query['session_id'];

    if (!sessionId) {
      throw new BadRequestException('Session ID is required');
    }

    return sessionId;
  },
);
