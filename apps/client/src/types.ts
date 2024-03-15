export interface Match {
  id: number;
  teams: string[];
  score: number[];
}

export enum SimulationState {
  Start = "start",
  Running = "running",
  Finish = "finish",
  Reset = "reset",
}
