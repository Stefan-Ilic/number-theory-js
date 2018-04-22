class GroupsWindow {
    constructor() {

        // get stuff we need
        this.invalidPlus = document.getElementById('invalid-+');
        this.set = document.getElementById('set').value;
        this.invalidTimes = document.getElementById('invalid-*');
        this.operation = document.getElementById('operation').value;
        this.order = document.getElementById('order');
        this.cyclic = document.getElementById('cyclic');
        this.generators = document.getElementById('generators');
        this.subgroups = document.getElementById('subgroups');
        this.isValid = false;

        // clean up
        this.invalidPlus.style.display = 'none';
        this.invalidTimes.style.display = 'none';
        window.$('#operationTableBody').remove();
        window.$('#orderTableBody').remove();
        this.order.innerHTML = '';
        this.cyclic.innerHTML = '';
        this.generators.innerHTML = '';
        this.subgroups.innerHTML = '';
        this.isPrime = false;
    }

    validate() {
        if (set === '') {
            return false;
        }

        if (this.set.match(/Z\*.*/i)) {
            this.isPrime = true;
        }

        if (this.isPrime && this.operation === '+') {
            this.invalidPlus.style.display = 'block';
            return false;
        }

        if (!this.isPrime && this.operation === '*') {
            this.invalidTimes.style.display = 'block';
            return false;
        }



        return true;
    }

    generate() {
        var size = this.set.match(/\d+/)[0];

        this.group = new Group(size, this.operation, this.isPrime);

        this.order.innerHTML = this.group.order;

        var newOperationTableBody = document.createElement('tbody');
        newOperationTableBody.setAttribute('id', 'operationTableBody');

        var firstRow = newOperationTableBody.insertRow();
        var td = document.createElement('td');
        td.innerHTML = this.group.operation;
        firstRow.appendChild(td);


        for (var i = 0; i < this.group.order; i++) {
            var th = document.createElement('th');
            th.innerHTML = this.group.elements[i];
            th.setAttribute('class', `column-${i}`);
            firstRow.appendChild(th);
        }

        for (var i = 0; i < this.group.order; i++) {
            var row = newOperationTableBody.insertRow();
            var th = document.createElement('th');
            th.innerHTML = this.group.elements[i];
            th.setAttribute('class', `row-${i}`);
            row.appendChild(th);
            for (var j = 0; j < this.group.order; j++) {
                var td = document.createElement('td');
                td.innerHTML = this.group.operate(this.group.elements[i], this.group.elements[j]);
                td.setAttribute('class', `row-${i} column-${j}`);
                row.appendChild(td);
            }
        }

        document.getElementById('operationTable').appendChild(newOperationTableBody);

        if (this.group.isCyclic) {
            this.cyclic.innerHTML = 'Yes';
        }
        else {
            this.cyclic.innerHTML = 'No';
        }

        if (this.group.isCyclic) {
            this.generators.innerHTML = this.group.generators.join(', ');

            var subgroups = '';

            for (var i = 0; i < this.group.subgroups.length; i++) {
                subgroups += `{${this.group.subgroups[i].join(', ')}}`;
                if (i < this.group.subgroups.length - 1) {
                    subgroups += ', ';
                }

            }

            this.subgroups.innerHTML = subgroups;
        }
        else {
            this.generators.innerHTML = '-';
            this.subgroups.innerHTML = 'Not cyclic so idk';
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

        for (var i = 1; i < this.group.order; i++) {
            var th = document.createElement('th');
            if (this.group.operation === '+') {
                th.innerHTML = (i + 1).toString() + 'a';
            }
            else {
                th.innerHTML = `a<sup>${(i + 1).toString()}</sup>`;
            }
            th.setAttribute('class', `order-column-${i}`);
            firstRow.appendChild(th);
        }

        for (var i = 0; i < this.group.order; i++) {
            var row = newOrderTableBody.insertRow();
            var th = document.createElement('th');
            th.innerHTML = this.group.elements[i];
            th.setAttribute('class', `order-row-${i}`);
            row.appendChild(th);
            for (var j = 0; j < this.group.order; j++) {
                var num = this.group.elements[i];
                for (var k = 0; k < j; k++) {
                    num = this.group.operate(num, this.group.elements[i]);
                }
                var td = document.createElement('td');
                td.innerHTML = num;
                td.setAttribute('class', `order-column-${j} order-row-${i}`);
                row.appendChild(td);
            }
        }

        document.getElementById('orderTable').appendChild(newOrderTableBody);
    }
}
