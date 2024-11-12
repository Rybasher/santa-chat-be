import { Module, forwardRef } from '@nestjs/common';
import { SantaService } from './santa.service';
import { ChatModule } from '../chat/chat.module';
@Module({
  imports: [forwardRef(() => ChatModule)],
  providers: [SantaService],
  exports: [SantaService],
})
export class SantaModule {}
