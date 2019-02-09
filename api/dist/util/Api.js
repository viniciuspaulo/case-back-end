"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const fetch = require('node-fetch');
class Api {
    constructor() {
        this.headers = {};
        this.url = `https://api.yelp.com/v3/`;
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config_1.config.keyApiYielp}`
        };
    }
    apiGet(rota) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(`${this.url + rota}`, {
                headers: this.headers,
            }).then((res) => res.json());
        });
    }
    apiPost(rota, body = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(`${this.url + rota}`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: this.headers,
            }).then((res) => res.json());
        });
    }
    apiPut(rota, body = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(`${this.url + rota}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: this.headers,
            }).then((res) => res.json());
        });
    }
    apiDelete(rota, body = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(`${this.url + rota}`, {
                method: 'DELETE',
                body: JSON.stringify(body),
                headers: this.headers,
            }).then((res) => res.json());
        });
    }
}
exports.Api = Api;
//# sourceMappingURL=Api.js.map