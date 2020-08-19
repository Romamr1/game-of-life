import produce from 'immer';
import { numCols, numRows, operations } from '../constants';

interface generateGridInterface {
    numRows: number,
    numCols: number,
}

export const generateEmptyGrid = ({ numRows, numCols }: generateGridInterface) => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
};

export const newGrid = (grid: number[][]) => produce(grid, gridCopy => {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
                const newI = i + x;
                const newK = j + y;
                if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                    neighbors += grid[newI][newK];
                }
            });

            if (neighbors < 2 || neighbors > 3) {
                gridCopy[i][j] = 0;
            } else if (grid[i][j] === 0 && neighbors === 3) {
                gridCopy[i][j] = 1;
            }
        }
    }
});
