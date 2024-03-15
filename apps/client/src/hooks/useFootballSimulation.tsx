import { useState, useEffect } from "react";
import { initialMatches } from "../mocks/matches";
import { SimulationState } from "../types";

function useFootballSimulation() {
  const [matches, setMatches] = useState([...initialMatches]);
  const [simulationState, setSimulationState] = useState(SimulationState.Start);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let timeout: NodeJS.Timeout | null = null;

    if (simulationState === SimulationState.Running) {
      interval = setInterval(() => {
        setMatches((currentMatches) => {
          const matchToUpdateIndex = Math.floor(
            Math.random() * currentMatches.length
          );
          const teamToUpdateIndex = Math.floor(Math.random() * 2);
          const updatedMatches = currentMatches.map((match, index) => {
            if (index === matchToUpdateIndex) {
              const updatedScore = [...match.score];
              updatedScore[teamToUpdateIndex] += 1;
              return { ...match, score: updatedScore };
            }
            return match;
          });
          return updatedMatches;
        });
      }, 1000);

      timeout = setTimeout(() => {
        setSimulationState(SimulationState.Finish);
      }, 9000);
    } else if (simulationState === SimulationState.Reset) {
      setMatches([...initialMatches]);
      setTimeout(() => setSimulationState(SimulationState.Start), 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [simulationState]);

  const toggleSimulation = () => {
    switch (simulationState) {
      case SimulationState.Start:
        setSimulationState(SimulationState.Running);
        break;
      case SimulationState.Running:
        setSimulationState(SimulationState.Finish);
        break;
      case SimulationState.Finish:
        setSimulationState(SimulationState.Reset);
        break;
      case SimulationState.Reset:
        setSimulationState(SimulationState.Start);
        break;
      default:
        setSimulationState(SimulationState.Start);
        break;
    }
  };

  return { matches, simulationState, toggleSimulation };
}

export default useFootballSimulation;
