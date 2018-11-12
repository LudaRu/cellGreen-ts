"use strict";
exports.__esModule = true;
var IndexSocket = /** @class */ (function () {
    function IndexSocket(io) {
        this.MAX_COL = 10;
        this.MAX_ROW = 7;
        this.io = io;
        this.generateMap();
        this.main();
    }
    IndexSocket.prototype.main = function () {
        var _this = this;
        this.io.on("connect", function (socket) {
            console.log("Конектед клиент");
            socket.emit("setMap", _this.MAP);
            socket.on("setPosition", function (data) {
                _this.io.emit("changeMap", [_this.setValCell(data)]); // Отослать всем зименение на карте (не всю карту)
            });
            socket.on("disconnect", function () {
                console.log("Дисконектед клиент");
            });
        });
    };
    // Установка значения в ячеку карты
    IndexSocket.prototype.setValCell = function (data) {
        var statusNow = this.MAP[data.rowIndex][data.colIndex].solid;
        this.MAP[data.rowIndex][data.colIndex] = {
            rowIndex: data.rowIndex,
            colIndex: data.colIndex,
            solid: !statusNow
        };
        return this.MAP[data.rowIndex][data.colIndex];
    };
    IndexSocket.prototype.generateMap = function () {
        this.MAP = [];
        for (var row = 0; row < this.MAX_ROW; row++) {
            this.MAP[row] = [];
            for (var col = 0; col < this.MAX_COL; col++) {
                this.MAP[row][col] = {
                    rowIndex: row,
                    colIndex: col,
                    solid: false
                };
            }
        }
    };
    return IndexSocket;
}());
exports.IndexSocket = IndexSocket;
var CnvMap = /** @class */ (function () {
    function CnvMap() {
        this.maxRow = 10;
        this.maxCol = 7;
    }
    CnvMap.validCell = function (CnvCell) {
        // if (CnvCell.rowIndex > this.maxRow && CnvCell.colIndex > this.maxCol) {
        //     return false;
        // }
        return true;
    };
    CnvMap.prototype.addCell = function () {
        this.cellList.push(new CnvCell());
    };
    CnvMap.prototype.setDataToCell = function () {
    };
    return CnvMap;
}());
var CnvCell = /** @class */ (function () {
    function CnvCell() {
    }
    return CnvCell;
}());
