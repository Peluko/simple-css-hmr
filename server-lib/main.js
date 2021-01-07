"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flags_1 = require("./flags");
const server_1 = require("./server");
function run() {
    const options = flags_1.getFlags();
    server_1.startServer(options);
}
exports.run = run;
//# sourceMappingURL=main.js.map