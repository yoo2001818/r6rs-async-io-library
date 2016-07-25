import ipc from 'node-ipc';
import { SYMBOL, STRING } from 'r6rs';
import { Library } from 'r6rs-async-io';

ipc.config.id = 'r6rsasync';
ipc.config.retry = 1500;
ipc.config.silent = true;

ipc.serve();

export default new Library('remote', {
  'remote/start': () => {
    ipc.server.start();
    /* return () => {
      ipc.server.stop();
    }; */
  },
  'remote/listen': (params, callback) => {
    if (params == null || (params.type != SYMBOL && params.type != STRING)) {
      throw new Error('String or symbol expected');
    }
    let eventName = params.value;
    let listener = (data, socket) => {
      if (Array.isArray(data)) {
        callback(data);
      } else {
        callback([]);
      }
      ipc.server.emit(socket, 'ack');
    };
    ipc.server.on(eventName, listener);
    return () => {
      ipc.server.off(eventName, listener);
    };
  }
});
