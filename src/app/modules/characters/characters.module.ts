import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { HttpModule } from '@nestjs/axios';
import { ExternalService } from './external/external.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Character])],
  controllers: [CharactersController],
  providers: [CharactersService, ExternalService],
})
export class CharactersModule {}
