import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { SessionModule } from './session/session.module';
import { SantaModule } from './santa/santa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SessionMiddleware } from './session/session.middleware';
import { ChatSession } from './chat/entities/chat.entity';
import { Message } from './chat/entities/message.entity';
import { UserSession } from './session/entities/session.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [ChatSession, Message, UserSession],
      migrations: ['../migrations/*.ts'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    ChatModule,
    SessionModule,
    SantaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
