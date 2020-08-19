import { generateEmptyGrid, newGenerationOfGrid } from './index';

test('create grid', () => {
    const numRows = 50;
    const numCols = 50;
    const grid = generateEmptyGrid({ numRows, numCols });
    expect(grid.length).toBe(numRows);
});

test('modify grid', () => {
    const numRows = 50;
    const numCols = 50;
    let grid = generateEmptyGrid({ numRows, numCols });
    grid[5][4] = 1;
    grid[5][5] = 1;
    grid[5][6] = 1;
    const modifiedGrid = newGenerationOfGrid(grid)

    expect(modifiedGrid[5][5]).toBe(1);
    expect(modifiedGrid[6][5]).toBe(1);
    expect(modifiedGrid[4][5]).toBe(1);
});

test('modify grid 2', () => {
    const numRows = 50;
    const numCols = 50;
    let grid = generateEmptyGrid({ numRows, numCols });
    grid[10][9] = 1;
    grid[10][10] = 1;
    grid[10][11] = 1;
    grid[11][10] = 1;
    grid[11][11] = 1;
    grid[11][12] = 1;
    const modifiedGrid = newGenerationOfGrid(grid)
    expect(modifiedGrid[9][10]).toBe(1);
    expect(modifiedGrid[10][9]).toBe(1);
    expect(modifiedGrid[11][9]).toBe(1);
    expect(modifiedGrid[10][12]).toBe(1);
    expect(modifiedGrid[11][12]).toBe(1);
    expect(modifiedGrid[12][11]).toBe(1);
});