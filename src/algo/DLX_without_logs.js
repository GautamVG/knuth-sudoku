function Node(index) {
    this.up = this;
    this.down = this;
    this.right = this;
    this.left = this;
    this.columnHeader = null;
    this.index = index;
    this.size = 0;
}

export default class DLX {
    constructor(columns) {
        this.root = new Node(-1);
        let prevHeader = this.root;
        for (let i = 0; i < columns; i++) {
            let columnHeader = new Node(i);
            prevHeader.right = columnHeader;
            columnHeader.left = prevHeader;
            prevHeader = columnHeader;
        }
        prevHeader.right = this.root;
    }

    findColumnHeaderWithIndex(index) {
        let N = this.root;
        while (N.right != this.root) {
            N = N.right;
            if (N.index == index) return N;
        }
        return null;
    }

    findNodeWithIndexInColumn(index, columnHeader) {
        let N = columnHeader;
        while (N.down != columnHeader) {
            N = N.down;
            if (N.index == index) return N;
        }
        return null;
    }

    insertAsOneRow(columnIndices, rowIndex) {
        let newNodes = [];
        columnIndices.forEach(i => {
            let columnHeader = this.findColumnHeaderWithIndex(i);
            let newNode = new Node(rowIndex);
            columnHeader.size++;

            newNode.up = columnHeader.up;
            newNode.down = columnHeader;
            columnHeader.up.down = newNode;
            columnHeader.up = newNode;
            newNode.columnHeader = columnHeader;
            newNodes.push(newNode);
        });

        newNodes.forEach((node, i) => {
            let leftIndex = (i == 0 ? newNodes.length-1 : i - 1);
            let rightIndex = (i + 1) % newNodes.length;
            node.right = newNodes[rightIndex];
            node.left = newNodes[leftIndex];
        })
    }

    loadSparseContraintMatrix(matrix) {
        matrix.forEach((row, i) => this.insertAsOneRow(row, i));
    }

    getSmallestColumn() {
        let N = this.root;
        let smallestColumn = this.root;
        while (N.right != this.root) {
            N = N.right;
            if (smallestColumn == this.root || N.size < smallestColumn.size) smallestColumn = N;
        }
        return (smallestColumn == this.root ? null : smallestColumn);
    }

    coverColumn(columnHeader) {
        columnHeader.right.left = columnHeader.left;
        columnHeader.left.right = columnHeader.right;
        let i = columnHeader;
        while (i.down != columnHeader) {
            i = i.down;
            let j = i;
            while (j.right != i) {
                j = j.right;
                j.down.up = j.up;
                j.up.down = j.down;
                j.columnHeader.size--;
            };
        }
    }

    uncoverColumn(columnHeader) {
        let i = columnHeader;
        while (i.up != columnHeader) {
            i = i.up;
            let j = i;
            while (j.left != i) {
                j = j.left;
                j.columnHeader.size++;
                j.down.up = j;
                j.up.down = j;
            } 
        }
        columnHeader.right.left = columnHeader;
        columnHeader.left.right = columnHeader;
    }

    getExactHittingSets(partialSolution, solutions) {
        if (this.root.right == this.root) { // Partial Solution is correct, add it to final solution
            solutions.push(partialSolution);
            return;
        }

        let smallestColumn = this.getSmallestColumn();
        if (smallestColumn.size == 0) { // Partial Solution is incorrect, do nothing
            return;
        }

        this.coverColumn(smallestColumn);

        let r = smallestColumn;
        while (r.down != smallestColumn) {
            r = r.down;
            let newPartialSolution = [...partialSolution, r.index];

            let c = r;
            while (c.right != r) {
                c = c.right;
                this.coverColumn(c.columnHeader);
            }

            this.getExactHittingSets(newPartialSolution, solutions);

            c = r;
            while (c.left != r) {
                c = c.left;
                this.uncoverColumn(c.columnHeader);
            }
        }
        this.uncoverColumn(smallestColumn);
        return;
    }

    solve(reducedConstraints) {
        let solutions = [];
        let partialSolution = [];

        let reducedNodes = reducedConstraints.map(constraint => {
            let c = this.findColumnHeaderWithIndex(constraint.columnIndex);
            let n = this.findNodeWithIndexInColumn(constraint.rowIndex, c);
            return n;
        });

        reducedNodes.forEach(node => {
            partialSolution.push(node.index);

            this.coverColumn(node.columnHeader);

            let c = node;
            while (c.right != node) {
                c = c.right;
                this.coverColumn(c.columnHeader);
            }
        });

        this.getExactHittingSets(partialSolution, solutions);

        reducedNodes.reverse();
        reducedNodes.forEach(node => {
            let c = node;
            while (c.left != node) {
                c = c.left;
                this.uncoverColumn(c.columnHeader);
            }
            this.uncoverColumn(node.columnHeader);
        });

        return solutions;
    }
}