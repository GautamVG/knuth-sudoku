export default {
    init: () => ({
        code: 'init',
        comment: "Initiating"
    }),

    reductionByInput: () => ({
        code: 'reductionByInput',
        comment: "Beginning initial matrix reduction based on user input"
    }),

    endSearch: () => ({
        code: 'endSearch',
        comment: "Terminating search"
    }),

    addedPartialSolution: (row) => ({
        code: 'addedPartialSolution',
        comment: "Added row to partial solution",
        data: row
    }),

    validPartialSolution: (partialSolution) => ({
        code: 'validPartialSolution',
        comment: "Reached a valid partial solution",
        data: partialSolution
    }),

    invalidPartialSolution: () => ({
        code: 'invalidPartialSolution',
        comment: "Reached an invalid partial solution"
    }),

    selectedColumn: (column) => ({
        code: 'selectedColumn',
        comment: "Selected column",
        data: column
    }),

    selectedRow: (row) => ({
        code: 'selectedRow',
        comment: "Selected row",
        data: row
    }),

    deletedColumn: (column) => ({
        code: 'deletedColumn',
        comment: "Deleted column",
        data: column
    }),

    deletedRow: (row) => ({
        code: 'deletedRow',
        comment: "Deleted row",
        data: row
    }),

    restoredColumn: (column) => ({
        code: 'restoredColumn',
        comment: "Restored column",
        data: column
    }),

    restoredRow: (row) => ({
        code: 'restoredRow',
        comment: "Restored row",
        data: row
    }),
}