
window.onload = function(){
  document.getElementById('fieldForm').onsubmit = function(){

    const size = document.getElementById('sizeInput').value;

    const app = new App();

    app.clear();

    const gf = new GaloisField(Number(size));

    app.additionTable.appendChild(generateTable(gf.getAdditionTable()));
    app.multiplicationtable.appendChild(generateTable(gf.getMultiplicationTable()));

    return false 
  }
}

function generate() {
    const size = document.getElementById('sizeInput').value;

    const app = new App();

    const gf = new GaloisField(Number(size));

    app.additionTable.appendChild(generateTable(gf.getAdditionTable()));
    app.multiplicationtable.appendChild(generateTable(gf.getMultiplicationTable()));
}



  function generateTable(array) {

    const table = document.createElement('table');
    table.className = 'table table-bordered';
  
    for (let i = 0; i < array.length; i++) {
        const row = table.insertRow(0);
        for (let j = 0; j < array.length; j++) {
            const cell = row.insertCell(0);
            cell.innerHTML = array[i][j].toString();
        }
    }
      return table;
  }

  class App {

    constructor() {
      this.additionTable = document.getElementById('additionTable');
      this.multiplicationtable = document.getElementById('multiplicationTable');
    }

    clear() {
      this.multiplicationtable.removeChild(this.multiplicationtable.childNodes[0]);
    }

    setAdditionTable() {
      this.additionTable.removeChild(this.additionTable.childNodes[0]);

    }

    setMultiplicationTable() {

    }


}