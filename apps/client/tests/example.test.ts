// import { renderHook, act } from '@testing-library/react-hooks';
// import useFootballSimulation from '../hooks/useFootballSimulation'; 
// import { SimulationState } from '../types';
// import { initialMatches } from '../mocks/matches';

describe('useFootballSimulation', () => {
  it('should start with initial matches and be in Start state', () => {
    const { result } = renderHook(() => useFootballSimulation());
    expect(result.current.matches).toEqual(initialMatches);
    expect(result.current.simulationState).toBe(SimulationState.Start);
  });

  it('should toggle simulation state correctly', () => {
    const { result } = renderHook(() => useFootballSimulation());
    
    // Start -> Running
    act(() => {
      result.current.toggleSimulation();
    });
    expect(result.current.simulationState).toBe(SimulationState.Running);

    // Running -> Finish
    act(() => {
      jest.advanceTimersByTime(90000); 
    });
    expect(result.current.simulationState).toBe(SimulationState.Finish);

    // Finish -> Reset
    act(() => {
      result.current.toggleSimulation();
    });
    expect(result.current.simulationState).toBe(SimulationState.Reset);

    // Reset -> Start (after delay)
    act(() => {
      jest.advanceTimersByTime(10000); 
    });
    expect(result.current.simulationState).toBe(SimulationState.Start);
  });

  it('should update scores during simulation', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFootballSimulation());

    act(() => {
      result.current.toggleSimulation(); 
    });

    await waitForNextUpdate();

    const scoreUpdated = result.current.matches.some(
      (match, index) => match.score[0] !== initialMatches[index].score[0] ||
                        match.score[1] !== initialMatches[index].score[1]
    );
    expect(scoreUpdated).toBeTruthy();
  });

  it('should reset matches and state correctly', () => {
    const { result } = renderHook(() => useFootballSimulation());

    act(() => {
      result.current.toggleSimulation(); // Running
      jest.advanceTimersByTime(9000); // Finish
      result.current.toggleSimulation(); // Reset
    });

    act(() => {
      jest.advanceTimersByTime(1000); // Wait for reset to complete
    });

    expect(result.current.matches).toEqual(initialMatches);
    expect(result.current.simulationState).toBe(SimulationState.Start);
  });
});
