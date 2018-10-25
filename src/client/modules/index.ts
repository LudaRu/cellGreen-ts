/// <reference path="tools/socket.io-client.d.ts"/>


import CnvsMap = require("./file1");

const socket = io();

socket.on("setMap", function (data: CnvsMap) {
    console.log(data);
});

// declare namespace CnvsNs {

// }