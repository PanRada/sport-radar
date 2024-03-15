import useFootballSimulation from "./hooks/useFootballSimulation";
import { Match, SimulationState } from "./types";

function App() {
  const { matches, simulationState, toggleSimulation } =
    useFootballSimulation();
  const totalGoals = matches.reduce(
    (acc, match) => acc + match.score[0] + match.score[1],
    0
  );
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
      <div>Total Goals: {totalGoals}</div>
    </div>
  );
}

export default App;
