import { Module } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { SprintsController } from './sprints.controller';

@Module({
  providers: [SprintsService],
  controllers: [SprintsController]
})
export class SprintsModule {}
