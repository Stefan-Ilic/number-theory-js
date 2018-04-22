window.onload = function(){

    document.getElementById('groupForm').onsubmit = function() {
        // get stuff we need
        var invalidPlus = document.getElementById('invalid-+');
        var set = document.getElementById('set').value;
        var invalidTimes = document.getElementById('invalid-*');
        var operation = document.getElementById('operation').value;
        
        // clean up
        invalidPlus.style.display = 'none';
        invalidTimes.style.display = 'none';
        $('#operationTableBody').remove();
        $('#orderTableBody').remove();
        document.getElementById('order').innerHTML = '';
        document.getElementById('cyclic').innerHTML = '';
        document.getElementById('generators').innerHTML = '';
        document.getElementById('subgroups').innerHTML = '';

        if (set === '') {
            return false;
        }

        var isPrime = false;

        // validation
        if (set.match(/Z\*.*/i)) {
            isPrime = true;
        }

        if (isPrime && operation == '+') {
            invalidPlus.style.display = 'block';
            return false;
        }

        if (!isPrime && operation == '*') {
            invalidTimes.style.display = 'block';
            return false;
        }


        // setting and building
        var size = set.match(/\d+/)[0];

        let group = new Group(size, operation, isPrime);

        document.getElementById('order').innerHTML = group.order;

        var newOperationTableBody = document.createElement('tbody');
        newOperationTableBody.setAttribute('id', 'operationTableBody');

        var firstRow = newOperationTableBody.insertRow();
        var td = document.createElement('td');
        td.innerHTML = group.operation;
        firstRow.appendChild(td);


        for (var i = 0; i < group.elements.length; i++) {
            var th = document.createElement('th');
            th.innerHTML = group.elements[i];
            th.setAttribute('class', 'column-' + i);
            firstRow.appendChild(th);
        }

        for (var i = 0; i < group.elements.length; i++) {
            var row = newOperationTableBody.insertRow();
            var th = document.createElement('th');
            th.innerHTML = group.elements[i];
            th.setAttribute('class', 'row-' + i);
            row.appendChild(th);
            for (var j = 0; j < group.elements.length; j++) {
                var td = document.createElement('td');
                td.innerHTML = group.operate(group.elements[i], group.elements[j]);
                td.setAttribute('class', 'row-' + i + ' column-' + j);
                row.appendChild(td);
            }
        }

        document.getElementById('operationTable').appendChild(newOperationTableBody);

        if (group.isCyclic) {
            document.getElementById('cyclic').innerHTML = 'Yes';
        }
        else {
            document.getElementById('cyclic').innerHTML = 'No';
        }

        if (group.isCyclic) {
            document.getElementById('generators').innerHTML = group.generators.join(', ');

            var subgroups = '';

            for (var i = 0; i < group.subgroups.length; i++) {
                subgroups += '{' + group.subgroups[i].join(', ') + '}';
                if (i < group.subgroups.length - 1) {
                    subgroups += ', ';
                }

            }

            document.getElementById('subgroups').innerHTML = subgroups;
        }
        else {
            document.getElementById('generators').innerHTML = '-';
            document.getElementById('subgroups').innerHTML = 'Not cyclic so idk';
        }

        var newOrderTableBody = document.createElement('tbody');
        newOrderTableBody.setAttribute('id', 'orderTableBody');

        var firstRow = newOrderTableBody.insertRow();
        var td = document.createElement('td');
        firstRow.appendChild(td);
        var th = document.createElement('th');
        th.innerHTML = 'a';
        th.setAttribute('class', 'order-column-0')
        firstRow.appendChild(th);

        for (var i = 1; i < group.order; i++) {
            var th = document.createElement('th')
            if (group.operation === '+') {
                th.innerHTML = (i + 1).toString() + 'a';
            }
            else {
                th.innerHTML = 'a' + '<sup>' + (i + 1).toString() + '</sup>';
            }
            th.setAttribute('class', 'order-column-' + i);
            firstRow.appendChild(th);
        }

        for (var i = 0; i < group.order; i++) {
            var row = newOrderTableBody.insertRow();
            var th = document.createElement('th');
            th.innerHTML = group.elements[i];
            th.setAttribute('class', 'order-row-' + i);
            row.appendChild(th);
            for (var j = 0; j < group.order; j++) {
                var num = group.elements[i];
                for (var k = 0; k < j; k++) {
                    num = group.operate(num, group.elements[i])
                }
                var td = document.createElement('td');
                td.innerHTML = num;
                td.setAttribute('class', 'order-column-' + j + ' order-row-' + i);
                row.appendChild(td);
            }
        }

        document.getElementById('orderTable').appendChild(newOrderTableBody);
        

        return false;
    }
  }

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
            for (var k = 1; k <= this.order; k ++) {
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
            for (var i = 0; i < this.order; i++) {
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
        var subgroup = [];
        var num = input;
        subgroup.push(num);
        for (var k = 0; k < this.order; k++) {
            num = this.operate(num, input);
            if (!subgroup.includes(num)) {
                subgroup.push(num);
            }
        }
        return subgroup.sort(function(a, b) {
            return a - b;
        });
    }

    operate(a, b) {
        if (this.operation == '+') {
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
        var b = 0;
        for (var i = 0; i < a; i++) {
            if (this.gcd(i, a) === 1) {
                b++;
            }
        }
        return b;
    }
}