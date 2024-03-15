import { useState, useEffect } from "react";
import io from "socket.io-client";
import { initialMatches } from "../mocks/matches";
import { SimulationState, Match } from "../types";

const socket = io("http://localhost:3000/football-simulation");

function useFootballSimulation() {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [simulationState, setSimulationState] = useState<SimulationState>(
    SimulationState.Start
  );

  useEffect(() => {
    socket.on("updateMatches", (updatedMatches: Match[]) => {
      setMatches(updatedMatches);
    });

    socket.on("simulationState", (state: SimulationState) => {
      setSimulationState(state);
    });

    return () => {
      socket.off("updateMatches");
      socket.off("simulationState");
    };
  }, []);

  const toggleSimulation = () => {
    socket.emit("toggleSimulation");
  };

  return { matches, simulationState, toggleSimulation };
}

export default useFootballSimulation;
