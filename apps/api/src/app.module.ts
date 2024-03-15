import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FootballSimulationGateway } from './football-simulation.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FootballSimulationGateway],
})
export class AppModule {}
