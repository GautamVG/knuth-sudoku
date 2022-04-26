import DLX from './DLX_without_logs';
import SudokuConstraints from './SudokuConstraintsGenerator';

export default class DemoSudoku {
    constructor() {
        this.numberOfConstraints = 324;
        this.sparseConstraintMatrix = SudokuConstraints();

        this.engine = new DLX(this.numberOfConstraints);
        this.engine.loadSparseContraintMatrix(this.sparseConstraintMatrix);
    }

    parseRowIndex(i) {
        return {
            x: ( Math.floor( (i % 81) / 9)),
            y: ( Math.floor(i / 81) ),
            val: (i % 9) + 1
        }
    }

    parseCellData({x, y, val}) {
        return {
            columnIndex: x + y*9,
            rowIndex: (val-1) + x*9 + y*81
        }
    }

    solve(cellInputs) {
        let inputs = cellInputs.map(cell => this.parseCellData(cell));
        let solutions = this.engine.solve(inputs);
        let outputs = solutions.map(solution => solution.map(selectedRow => this.parseRowIndex(selectedRow)));
        return outputs;
    }
}