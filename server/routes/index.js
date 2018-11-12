"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var route_1 = require("./route");
var IndexRoute = /** @class */ (function (_super) {
    __extends(IndexRoute, _super);
    function IndexRoute() {
        return _super.call(this) || this;
    }
    IndexRoute.create = function (router) {
        router.get("/", function (req, res, next) {
            new IndexRoute().index(req, res, next);
        });
    };
    IndexRoute.prototype.index = function (req, res, next) {
        this.title = "Главная";
        var options = {
            "message": "Тест msg"
        };
        this.render(req, res, "index", options);
    };
    return IndexRoute;
}(route_1.BaseRoute));
exports.IndexRoute = IndexRoute;
