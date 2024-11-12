import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatSession } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { UserSession } from '../session/entities/session.entity';
import { SantaModule } from '../santa/santa.module';
import { SessionModule } from "../session/session.module";
import { ChatGateway } from "./chat.gateway";

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatSession, Message, UserSession]),
    forwardRef(() => SantaModule),
    forwardRef(() => SessionModule),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
