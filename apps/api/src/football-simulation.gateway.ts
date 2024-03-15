import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

interface Match {
  id: number;
  teams: string[];
  score: number[];
}

enum SimulationState {
  Start = 'start',
  Running = 'running',
  Finish = 'finish',
  Reset = 'reset',
}

const initialMatches: Match[] = [
  { id: 1, teams: ['Germany', 'Poland'], score: [0, 0] },
  { id: 2, teams: ['Brazil', 'Mexico'], score: [0, 0] },
  { id: 3, teams: ['Argentina', 'Uruguay'], score: [0, 0] },
];

@WebSocketGateway({
  namespace: '/football-simulation',
  cors: {
    origin: '*',
  },
})
export class FootballSimulationGateway {
  @WebSocketServer() server: Server;
  private matches: Match[] = [...initialMatches];
  private simulationState = SimulationState.Start;
  private simulationInterval: NodeJS.Timeout | null = null;

  @SubscribeMessage('toggleSimulation')
  handleToggleSimulation(): void {
    switch (this.simulationState) {
      case SimulationState.Start:
        this.simulationState = SimulationState.Running;
        this.startSimulation();
        break;
      case SimulationState.Running:
        this.simulationState = SimulationState.Finish;
        this.stopSimulation();
        break;
      case SimulationState.Finish:
        this.simulationState = SimulationState.Reset;
        this.resetSimulation();
        break;
      case SimulationState.Reset:
        this.simulationState = SimulationState.Start;
        break;
      default:
        this.simulationState = SimulationState.Start;
        break;
    }

    this.server.emit('simulationState', this.simulationState);
  }

  private startSimulation(): void {
    this.simulationInterval = setInterval(() => {
      this.updateMatchScore();
    }, 1000);

    setTimeout(() => {
      // Wykonaj ostatnią aktualizację przed zakończeniem symulacji
      this.updateMatchScore();
      this.simulationState = SimulationState.Finish;
      this.stopSimulation();
    }, 9000);
  }

  private stopSimulation(): void {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
    this.server.emit('simulationState', this.simulationState);
    this.server.emit('updateMatches', this.matches);
  }

  private resetSimulation(): void {
    this.matches = [...initialMatches];
    this.server.emit('updateMatches', this.matches);
    this.server.emit('simulationState', this.simulationState);
  }

  private updateMatchScore(): void {
    const matchToUpdateIndex = Math.floor(Math.random() * this.matches.length);
    const teamToUpdateIndex = Math.floor(Math.random() * 2);
    this.matches[matchToUpdateIndex].score[teamToUpdateIndex] += 1;
    this.server.emit('updateMatches', this.matches);
  }
}
