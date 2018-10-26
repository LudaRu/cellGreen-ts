/// <reference path="tools/socket.io-client.d.ts"/>

import { Cnvs } from "../../shared/inteface/CnvsMap";

const socket = io();

let canvas: any;
let context: any;
let cellsMap: any;
cellsMap = [];

socket.on("setMap", function (data: Cnvs.Map) {
    console.log(data);
});

const cellWidth = 100;
const cellHeight = 100;


canvas = document.getElementById("ctx");
canvas.width = 1000;
canvas.height = 700;
context = canvas.getContext("2d");

socket.on("setMap", (cnvMap: Cnvs.Map[]) => { // Пришла карта с бека
    console.log("map", cnvMap);
    cnvMap.forEach((rows: any, rowIndex) => {

        cellsMap[rowIndex] = [];
        rows.forEach((cellData: Cnvs.Cell,  colIndex: number) => {
            const cell = new CellMap(colIndex, rowIndex, cellData.solid);
            // отрисуем объект
            cell.fill(cell.solid);
            // Сохраняем объект канваса (с позициями, состоянием и тд)
            cellsMap[rowIndex][colIndex] = cell;
        });
    });
});


socket.on("changeMap", (deltaMap: any) => {
    deltaMap.forEach((cellData: any) => {
        const cell = cellsMap[cellData.rowIndex][cellData.colIndex];
        cell.fill(cellData.solid);
    });
});

// Класс объекта на канвасе (ячейка карты)
//
class CellMap {

    rowIndex: any;
    colIndex: any;
    top: any;
    left: any;
    solid: any;

    constructor(colI: any, rowI: any, solid: any) {
        // Индексы в массиве объектов
        this.rowIndex = rowI;
        this.colIndex = colI;

        this.top = colI * cellWidth; // Позиция x
        this.left = rowI * cellHeight; // Позиция y
        this.solid = solid; // Выделение ячейки
    }

    getPack(): Cnvs.Cell {
        return {
            rowIndex: this.rowIndex,
            colIndex: this.rowIndex,
            solid: this.solid,
        };
    }


    fill(solid: any = undefined) {
        if (solid == undefined) {
            solid = !this.solid;
        }
        context.fillStyle = solid ? "#63e269" : "#4CAF50";
        context.fillRect(this.top, this.left, cellWidth, cellHeight);
        this.drawBorder(solid);
    }

    drawBorder(solid = false) {
        context.beginPath();
        context.strokeStyle = solid ? "#41b241" : "#44a147";
        context.moveTo(this.top - 0.5, this.left - 0.5);
        context.lineTo(this.top - 0.5, this.left + 100 - 0.5);
        context.lineTo(this.top + 100 - 0.5, this.left + 100 - 0.5);
        context.lineTo(this.top + 100 - 0.5, this.left - 0.5);
        context.lineTo(this.top - 0.5, this.left - 0.5);
        context.stroke();
    }
}


//  =========
// Events
//  ========

document.addEventListener("mousedown", (event) => {
    const cellObj = getCanvasCellByPosition(event.layerX, event.layerY);
    sendChangeMap(cellObj.getPack());
});

function sendChangeMap(cellObj: Cnvs.Cell) {
    socket.emit("setPosition", cellObj);
}

/* Выборка объекта канваса по X Y курсора*/
function getCanvasCellByPosition(x: any, y: any): CellMap {
    const col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);

    console.log(`x:${x} y:${y} cellMap[${row}][${col}]`, cellsMap[row][col]);

    return cellsMap[row][col];
}
