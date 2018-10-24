import * as socketIo from "socket.io";

export class IndexSocket {
    protected io: socketIo.Server;
    protected MAP: any; // fixme добавить интерфесы
    protected MAX_COL = 10;
    protected MAX_ROW = 7;

    constructor(io: any) {
        this.io = io;
        this.generateMap();
        this.main();
    }

    protected main() {
        this.io.on("connect", (socket: any) => {
            console.log("Конектед клиент");

            socket.emit("setMap", this.MAP);

            socket.on("setPosition", (data: any) => { // установка значения в ячеку
                this.io.emit("setMap", this.setValCell(data));
            });

            socket.on("disconnect", () => {
                console.log("Дисконектед клиент");
            });

        });
    }

    // Установка значения в ячеку карты
    protected setValCell(data: any) {
        this.MAP[data.row][data.col] = {solid: data.solid};

        return this.MAP;
    }

    protected generateMap() {
        this.MAP = [];

        for (let row = 0; row < this.MAX_ROW; row++) {
            this.MAP[row] = [];
            for (let col = 0; col < this.MAX_COL; col++) {
                this.MAP[row][col] = {solid: false};
            }
        }
    }
}