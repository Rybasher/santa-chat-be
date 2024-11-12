import { Test, TestingModule } from '@nestjs/testing';
import { SantaService } from './santa.service';

describe('SantaService', () => {
  let service: SantaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SantaService],
    }).compile();

    service = module.get<SantaService>(SantaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
