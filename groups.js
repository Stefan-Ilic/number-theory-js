window.onload = function(){

    document.getElementById('groupForm').onsubmit = function() {
        var set = document.getElementById('orderInput').value;

        


        return false;
  
        let group = new Group(size, '*', true);

        document.getElementById('order').innerHTML = group.order;

        return false;
    }
  }

class Group {

    // table= [];
    // order = 0;
    // operation = '';
    // identity = 0;
    // isCyclic = false;
    
    constructor(size, operation, isPrime) {
        this.isPrime = isPrime;
        this.order = 0;

        if (this.isPrime) {
            this.order = this.phi(size);
        }
        else {
            this.order = size;
        }

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
    }

    operation(a, b) {
        if (this.operation == '+') {
            return (a + b) % this.order;
        }
        return (a * b) % this.order;
      }
    
    invert(element) {
        for (let i = 0; i < this.order; i++) {
            if (this.operation(element, i) === this.identity) {
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
        var b = 0;
        for (var i = 0; i < a; i++) {
            if (this.gcd(i, a) === 1) {
                b++;
            }
        }
        return b;
    }
}