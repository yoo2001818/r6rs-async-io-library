#!/usr/bin/env node
import ipc from 'node-ipc';

ipc.config.id = 'r6rsasyncremote';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.config.stopRetrying = 0;

let eventName = process.argv[2];
let args = process.argv.slice(3);

if (eventName == null) {
  console.log('Usage: r6rs-remote eventName args ...');
  process.exit(1);
}

ipc.connectTo('r6rsasync', () => {
  ipc.of.r6rsasync.emit(eventName, args);
  ipc.of.r6rsasync.on('ack', () => {
    process.exit(0);
  });
});

setTimeout(() => {
  console.log('Remote doesn\'t seem to be listening on this event...');
  process.exit(1);
}, 500);
