
window.onload = function(){
  document.getElementById('fieldForm').onsubmit = function(){

    var size = document.getElementById('sizeInput').value;

    let app = new App();

    app.clear();

    let gf = new GaloisField(Number(size));

    app.additionTable.appendChild(generateTable(gf.getAdditionTable()));
    app.multiplicationtable.appendChild(generateTable(gf.getMultiplicationTable()));

    return false 
  }
}

function generate() {
    var size = document.getElementById('sizeInput').value;

    let app = new App();

    let gf = new GaloisField(Number(size));

    app.additionTable.appendChild(generateTable(gf.getAdditionTable()));
    app.multiplicationtable.appendChild(generateTable(gf.getMultiplicationTable()));
}

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
      let table = [];
  
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
      let table = [];
  
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

  function generateTable(array) {

    let table = document.createElement('table');
    table.className = 'table table-bordered';
  
    for (let i = 0; i < array.length; i++) {
      let row = table.insertRow(0);
      for (let j = 0; j < array.length; j++) {
        let cell = row.insertCell(0);
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