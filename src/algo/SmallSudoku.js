import DLX from './DLX';

export default class DemoSudoku {
    constructor() {
        this.numberOfConstraints = 27;
        this.sparseConstraintMatrix = [
            [0, 9, 18],
            [0, 10, 19],
            [0, 11, 20],
            [1, 9, 21],
            [1, 10, 22],
            [1, 11, 23],
            [2, 9, 24],
            [2, 10, 25],
            [2, 11, 26],
            [3, 12, 18],
            [3, 13, 19],
            [3, 14, 20],
            [4, 12, 21],
            [4, 13, 22],
            [4, 14, 23],
            [5, 12, 24],
            [5, 13, 25],
            [5, 14, 26],
            [6, 15, 18],
            [6, 16, 19],
            [6, 17, 20],
            [7, 15, 21],
            [7, 16, 22],
            [7, 17, 23],
            [8, 15, 24],
            [8, 16, 25],
            [8, 17, 26],
        ];
        this.constraintLabels = ['R1C1', 'R1C2', 'R1C3', 'R2C1', 'R2C2', 'R2C3', 'R3C1', 'R3C2', 'R3C3', 'R1#1', 'R1#2', 'R1#3', 'R2#1', 'R2#2', 'R2#3', 'R3#1', 'R3#2', 'R3#3', 'C1#1', 'C1#2', 'C1#3', 'C2#1', 'C2#2', 'C2#3', 'C3#1', 'C3#2', 'C3#3'];
        this.rowLabels = ['R1C1#1', 'R1C1#2', 'R1C1#3', 'R1C2#1', 'R1C2#2', 'R1C2#3', 'R1C3#1', 'R1C3#2', 'R1C3#3', 'R2C1#1', 'R2C1#2', 'R2C1#3', 'R2C2#1', 'R2C2#2', 'R2C2#3', 'R2C3#1', 'R2C3#2', 'R2C3#3', 'R3C1#1', 'R3C1#2', 'R3C1#3', 'R3C2#1', 'R3C2#2', 'R3C2#3', 'R3C3#1', 'R3C3#2', 'R3C3#3'];

        this.engine = new DLX(this.numberOfConstraints);
        this.engine.loadSparseContraintMatrix(this.sparseConstraintMatrix);
    }

    parseRowIndex(i) {
        return {
            x: ( (i % 9 < 9) ? (i % 9 < 6 ? (i % 9 < 3 ? 0 : 1) : 2) : 2 ),
            y: ( (i < 27) ? (i < 18 ? (i < 9 ? 0 : 1) : 2) : 2 ),
            val: (i % 3) + 1
        }
    }

    parseCellData({x, y, val}) {
        return {
            columnIndex: x + y*3,
            rowIndex: (val-1) + x*3 + y*9
        }
    }

    solve(cellInputs, shouldExplain) {
        let inputs = cellInputs.map(cell => this.parseCellData(cell));
        let solutions = this.engine.solve(inputs);
        let outputs = solutions.map(solution => solution.map(selectedRow => this.parseRowIndex(selectedRow)));

        if (shouldExplain) {
            return {
                solutions: outputs,
                explanation: {
                    constraintLabels: this.constraintLabels,
                    rowLabels: this.rowLabels,
                    sparseConstraintMatrix: this.sparseConstraintMatrix,
                    steps: this.engine.getLog()
                }
            }
        }

        return outputs;
    }
}