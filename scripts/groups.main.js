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