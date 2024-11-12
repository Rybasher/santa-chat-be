// chatSession.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Message } from './message.entity';
import { UserSession } from '../../session/entities/session.entity';

@Entity()
export class ChatSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sessionId: string;

  @ManyToOne(() => UserSession, (userSession) => userSession.chatSessions)
  userSession: UserSession;

  @OneToMany(() => Message, (message) => message.chatSession)
  messages: Message[];
}
