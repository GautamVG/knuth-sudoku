function FirstConstraint(offset) {
    let arr = [];
    for (let j = 0; j < 81; j++) {
        for (let i = 0; i < 9; i++)
            arr.push(offset + j);
    }
    return arr;
}

function SecondConstraint(offset) {
    let arr = [];
    let base = 0;
    for (let k = 0; k < 9; k++) {
        for (let j = 0; j < 9; j++) {
            for (let i = 0; i < 9; i++)
                arr.push(offset + base + i)
        }
        base += 9;
    }
    return arr;
}

function ThirdConstraint(offset) {
    let arr = [];
    for (let j = 0; j < 9; j++) {
        for (let i = 0; i < 81; i++)
            arr.push(offset + i);
    }
    return arr;
}

function FourthConstraint(offset) {
    let arr = [];
    let base2 = 0;
    for (let m = 0; m < 3; m++) {
        for (let l = 0; l < 3; l++) {
            let base1 = 0;
            for (let k = 0; k < 3; k++) {
                for (let j = 0; j < 3; j++) {
                    for (let i = 0; i < 9; i++)
                        arr.push(offset + base2 + base1 + i)
                }
                base1 += 9;
            }
        }
        base2 += 27;
    }
    return arr;
}

// console.log(FirstConstraint().length);
// console.log(SecondConstraint().length);
// console.log(ThirdConstraint().length);
// console.log(FourthConstraint().length);

export default function getSparseMatrix() {
    let first = FirstConstraint(0);
    let second = SecondConstraint(81);
    let third = ThirdConstraint(81*2);
    let fourth = FourthConstraint(81*3);
    let sparseMatrix = [];

    for (let i = 0; i < first.length; i++)
        sparseMatrix.push([first[i], second[i], third[i], fourth[i]]);

    return sparseMatrix;
}