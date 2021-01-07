"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const chokidar_1 = require("chokidar");
const ws_1 = require("ws");
const of_1 = require("rxjs/observable/of");
const merge_1 = require("rxjs/observable/merge");
const fs_1 = require("fs");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
require("rxjs/add/operator/delay");
require("rxjs/add/operator/switchMap");
function setupWatchers(options) {
    const watchers = options.files.map(filename => {
        return new Observable_1.Observable(observer => {
            chokidar_1.watch(filename).on('change', (name) => {
                observer.next(name);
            });
        });
    });
    return merge_1.merge(...watchers)
        .map(name => name.replace('\\', '/'));
}
function readFileToObs(filename) {
    return new Observable_1.Observable(observer => {
        fs_1.readFile(filename, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                observer.error(err);
            }
            else {
                observer.next(data);
                observer.complete();
            }
        });
    });
}
function broadcast(server, msg) {
    server.clients
        .forEach(client => {
        if (client.readyState === ws_1.OPEN) {
            client.send(msg);
        }
    });
}
/**
 * Starts a new simple-css-hmr websocket server
 * @param {IOptions} options
 */
function startServer(options) {
    const server = new ws_1.Server({
        port: options.port,
    });
    server.on('error', (err) => {
        console.error(err);
    });
    setupWatchers(options)
        .filter(name => /\.css$/.test(name))
        .switchMap(name => {
        if (options.push) {
            return readFileToObs(name)
                .map(content => ({ name, content }));
        }
        else {
            return of_1.of({ name });
        }
    })
        .delay(options.delay)
        .subscribe((result) => {
        broadcast(server, JSON.stringify(result));
    });
    console.log(`simple-css-hmr server is now available at ws://localhost:` + options.port);
}
exports.startServer = startServer;
//# sourceMappingURL=server.js.map