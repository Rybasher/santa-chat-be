import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSession } from './entities/session.entity';
import { SessionService } from './session.service';
import { SessionMiddleware } from './session.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserSession])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
