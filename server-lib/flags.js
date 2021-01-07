"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandLineArgs = require("command-line-args");
const optionDefinitions = [
    { name: 'files', alias: 'f', type: String, description: 'The file or directory to watch', multiple: true, defaultOption: true },
    { name: 'push', type: Boolean, description: 'Push file content to websocket', defaultValue: false },
    { name: 'port', type: Number, description: 'The port to host the websocket on', defaultValue: 8796 },
    { name: 'delay', type: Number, description: 'Time to wait before sending refresh signal to browser (in ms)', defaultValue: 0 },
];
const result = commandLineArgs(optionDefinitions);
function getFlags() {
    validate(result);
    return result;
}
exports.getFlags = getFlags;
function validate(options) {
    if (options.files.length === 0) {
        throw new Error('No files specified for watching');
    }
}
//# sourceMappingURL=flags.js.map