import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

import { numRows, numCols } from '../constants';
import { generateEmptyGrid, newGenerationOfGrid, generateRandomGrid } from '../utils';
import Button from '../Components/Button';

const App: React.FC = () => {
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid({ numRows, numCols });
    });

    const [running, setRunning] = useState(false);

    const runningRef = useRef(running);
    runningRef.current = running;

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        setGrid((g) => newGenerationOfGrid(g));

        setTimeout(runSimulation, 1000);
    }, []);

    const setRandomGrid = () => setGrid(generateRandomGrid({ numRows, numCols }));

    return (
        <>
            <Button
                onClick={() => {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true;
                        runSimulation();
                    }
                }}
                title={running ? "stop" : "start"}
            />

            <Button
                title="random"
                onClick={setRandomGrid}
            />

            <Button
                onClick={() => {
                    setGrid(generateEmptyGrid({ numRows, numCols }));
                }}
                title="clear"
            />

            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${numCols}, 20px)`
                }}
            >
                {grid.map((rows, i) =>
                    rows.map((col, j) => (
                        <div
                            className={`grid-item${grid[i][j] ? ' grid-item-alive': ''}`}
                            key={`${i}-${j}`} // it's generally bad to do this, but in this situation this approach is suitable
                            onClick={() => {
                                const newGrid = produce(grid, gridCopy => {
                                    gridCopy[i][j] = grid[i][j] ? 0 : 1;
                                });
                                setGrid(newGrid);
                            }}
                        />
                    ))
                )}
            </div>
        </>
    );
};

export default App;
