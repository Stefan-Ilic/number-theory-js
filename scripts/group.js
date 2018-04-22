class Group {

    constructor(size, operation, isPrime) {
        this.isPrime = isPrime;
        this.order = 0;
        this.isCyclic = false;
        this.elements = [];
        this.mod = size;
        this.generators = [];
        this.subgroups = [];

        for (var i = 0; i < size; i++) {
            if ((this.isPrime && this.gcd(size, i) === 1) || !isPrime) {
                this.elements.push(i);
            }
        }

        this.order = this.elements.length;

        this.operation = operation;
        if (operation === '+') {
            this.identity = 0;
        }
        else if (this.operation === '*') {
            this.identity = 1;
        }
        else {
            throw new Error('Unknown Operation');
        }

        for (var i = 0; i < this.order; i++) {
            var num = this.elements[i];
            for (var k = 1; k <= this.order; k++) {
                if (num === this.identity && k === this.order) {
                    this.isCyclic = true;
                    this.generators.push(this.elements[i]);
                }
                else if (num === this.identity && k != this.order) {
                    break;
                }
                else {
                    num = this.operate(num, this.elements[i]);
                }
            }
        }

        if (this.isCyclic) {
            var arrayLengths = [];
            for (let i = 0; i < this.order; i++) {
                if (!this.generators.includes(this.elements[i])) {
                    var subgroup = this.generateSubgroup(this.elements[i]);
                    if (!arrayLengths.includes(subgroup.length)) {
                        this.subgroups.push(subgroup);
                        arrayLengths.push(subgroup.length);
                    }
                }
            }
            this.subgroups.push(this.generateSubgroup(this.generators[0]));
            this.subgroups.sort(function (a, b) {
                return a.length - b.length;
            });
        }


    }

    generateSubgroup(input) {
        const subgroup = [];
        let num = input;
        subgroup.push(num);
        for (let k = 0; k < this.order; k++) {
            num = this.operate(num, input);
            if (!subgroup.includes(num)) {
                subgroup.push(num);
            }
        }
        return subgroup.sort(function (a, b) {
            return a - b;
        });
    }

    operate(a, b) {
        if (this.operation === '+') {
            return (a + b) % this.mod;
        }
        return (a * b) % this.mod;
    }

    invert(element) {
        for (let i = 0; i < this.order; i++) {
            if (this.operate(element, i) === this.identity) {
                return i;
            }
        }
        throw new Error('Inverse could not be found');
    }

    gcd(a, b) {
        if (!b) {
            return a;
        }
        return this.gcd(b, a % b);
    }

    phi(a) {
        let b = 0;
        for (let i = 0; i < a; i++) {
            if (this.gcd(i, a) === 1) {
                b++;
            }
        }
        return b;
    }
}