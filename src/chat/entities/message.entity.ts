import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ChatSession } from './chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  sender: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ChatSession, (chatSession) => chatSession.messages)
  chatSession: ChatSession;
}
