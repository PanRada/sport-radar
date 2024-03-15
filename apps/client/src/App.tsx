import useFootballSimulation from "./hooks/useFootballSimulation";
import { Match, SimulationState } from "./types";

function App() {
  const { matches, simulationState, toggleSimulation } =
    useFootballSimulation();

  function renderMatches(matches: Match[]) {
    return (
      <div>
        {matches.map(({ id, teams, score }) => (
          <div key={id}>
            {teams[0]} vs {teams[1]}: {score[0]} - {score[1]}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>Football Match Simulator</h1>
      <button onClick={toggleSimulation}>
        {simulationState === SimulationState.Start
          ? "Start Simulation"
          : simulationState === SimulationState.Running
            ? "Stop Simulation"
            : simulationState === SimulationState.Finish
              ? "Reset Simulation"
              : "Start Simulation"}
      </button>
      {renderMatches(matches)}
    </div>
  );
}

export default App;
