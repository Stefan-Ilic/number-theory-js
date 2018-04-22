class GaloisField {

    constructor(size) {
        this.size = size;
    }

    add(a, b) {
        return (a + b) % this.size;
    }

    subtract(a, b) {
        return a > b ? (a - b) % this.size : (a - b) + this.size;
    }

    multiply(a, b) {
        return (a * b) % this.size;
    }

    invert(element) {
        for (let i = 0; i < this.size; i++) {
            if ((element * i) % this.size === 1) {
                return i;
            }
        }
        throw new Error('Inverse could not be found');
    }

    getMultiplicationTable() {
        const table = [];

        for (let i = 0; i < this.size; i++) {
            table[i] = [];
            for (let j = 0; j < this.size; j++) {
                table[i][j] = this.multiply(i, j);
            }
            table[i].reverse();
        }

        return table.reverse();
    }

    getAdditionTable() {
        const table = [];

        for (let i = 0; i < this.size; i++) {
            table[i] = [];
            for (let j = 0; j < this.size; j++) {
                table[i][j] = this.add(i, j);
            }
            table[i].reverse();
        }

        return table.reverse();
    }
}