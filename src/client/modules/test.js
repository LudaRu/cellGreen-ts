const socket = io();

let canvas;
let context;
let cellsMap = [];

const input = {
    mouse_angle: 0,
    mouse_down: false,
    mouse_wheel: 0,
    keys: new Array(256),
};

const cellWidth = 100;
const cellHeight = 100;


canvas = document.getElementById('ctx');
canvas.width = 1000;
canvas.height = 700;
context = canvas.getContext('2d');

socket.on('setMap', (map) => { // Пришла карта с бека
    console.log('map', map);
    map.forEach(function (rows, rowIndex) {
        cellsMap[rowIndex] = [];
        rows.forEach(function (cellData, colIndex) {
            const cell = new cellMap(colIndex, rowIndex, cellData.solid);
            //отрисуем объект
            cell.fill(cell.solid);
            // Сохраняем объект канваса (с позициями, состоянием и тд)
            cellsMap[rowIndex][colIndex] = cell;
        });
    });
});

// Класс объекта на канвасе (ячейка карты)
//
class cellMap {
    constructor(colI, rowI, solid) {
        // Индексы в массиве объектов
        this.row = rowI;
        this.col = colI;

        this.top = colI * cellWidth; // Позиция x
        this.left = rowI * cellHeight;// Позиция y
        this.solid = solid; // Выделение ячейки
    }

    fill(solid = null) {
        if(solid == null){
            solid = !this.solid;
        }
        context.fillStyle = solid ? '#63e269' : '#4CAF50';
        context.fillRect(this.top, this.left, cellWidth, cellHeight);
        this.drawBorder(solid);
    }

    drawBorder(solid = false) {
        context.beginPath();
        context.strokeStyle = solid? '#41b241': '#44a147';
        context.moveTo(this.top - 0.5, this.left - 0.5);
        context.lineTo(this.top - 0.5, this.left + 100 - 0.5);
        context.lineTo(this.top + 100 - 0.5, this.left + 100 - 0.5);
        context.lineTo(this.top + 100 - 0.5, this.left - 0.5);
        context.lineTo(this.top - 0.5, this.left - 0.5);
        context.stroke()
    }
}


//=========
// Events
//========

document.addEventListener('mousedown', (event) => {
    const cell = getCellByPosition(event.layerX, event.layerY);
    // cell.fill();
    socket.emit('setPosition', {
        row: cell.row,
        col: cell.col,
        solid: !cell.solid,
    })
});

/* Выборка объекта канваса по X Y курсора*/
function getCellByPosition(x, y) {
    const col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);

    console.log(`x:${x} y:${y} cellMap[${row}][${col}]`);

    return cellsMap[row][col];
}
