import { exec, spawn } from 'child_process';
import { assert, toObject, fromAssoc, STRING } from 'r6rs';
import { Library } from 'r6rs-async-io';

let processes = {};
let processListeners = {};
let processBuf = {};
let processId = 0;

function makeListener(type) {
  return (params, callback) => {
    assert(params, 'number');
    let procId = params.value;
    let proc = processes[procId];
    if (proc == null) {
      throw new Error('Unknown process ID ' + procId);
    }
    let procListeners = processListeners[procId];
    if (type !== 'close') {
      procListeners[type].push(callback);
    }
    procListeners.close.push(data => {
      if (type === 'close') {
        return callback(data, true);
      }
      callback([null], true);
    });
    // Push buffer
    setTimeout(() => {
      processBuf[procId] = processBuf[procId].filter(v => {
        if (v[0] === 'close') {
          if (type === 'close') {
            callback(v.slice(1), true);
            return false;
          } else {
            callback([null]);
            return true;
          }
        }
        if (v[0] === type) {
          callback(v.slice(1));
          return false;
        }
        return true;
      });
    }, 0);
    return () => {
      let index = procListeners[type].indexOf(callback);
      if (index === -1) return;
      procListeners[type].splice(index, 1);
    };
  };
}

export default new Library('process', {
  'process/exec': (params, callback) => {
    let command, options = {};
    if (params.type === STRING) {
      command = params.value;
    } else {
      command = toObject(params)[0];
      options = fromAssoc(toObject(params)[1]);
    }
    exec(command, options, (error, stdout, stderr) => {
      let args = [
        error && [
          error.message,
          error.code,
          error.signal
        ],
        stdout && stdout.toString('utf8'),
        stderr && stderr.toString('utf8')
      ];
      callback(args, true);
    });
  },
  // To prevent cleanup failure, users must run this method with 'io-listen'
  // quite weird..
  'process/spawn': (params, callback) => {
    let command, args, options = {};
    let paramsObj = toObject(params);
    command = paramsObj[0];
    if (Array.isArray(command)) {
      args = command.slice(1);
      command = command[0];
    }
    if (Array.isArray(paramsObj[1])) {
      options = fromAssoc(paramsObj[1]);
    }
    let proc = spawn(command, args, options);
    let procId = processId ++;
    processes[procId] = proc;
    processBuf[procId] = [];
    let procListeners = {
      close: [],
      error: [],
      stdout: [],
      stderr: []
    };
    processListeners[procId] = procListeners;
    setTimeout(() => callback([procId]), 0);
    proc.on('close', (code, signal) => {
      if (procListeners.close.length > 0) {
        procListeners.close.forEach(v => v([code, signal]));
      }
      delete processes[procId];
      delete processListeners[procId];
      if (processBuf[procId] == null) return;
      processBuf[procId].push(['close', code, signal]);
    });
    proc.on('error', err => {
      if (procListeners.error.length > 0) {
        procListeners.error.forEach(v => v([err.message]));
      }
      if (processBuf[procId] == null) return;
      processBuf[procId].push(['error', err.message]);
    });
    proc.stdout.on('data', data => {
      let msg = data.toString('utf-8');
      if (procListeners.stdout.length > 0) {
        procListeners.stdout.forEach(v => v([msg]));
      }
      if (processBuf[procId] == null) return;
      processBuf[procId].push(['stdout', msg]);
    });
    proc.stderr.on('data', data => {
      let msg = data.toString('utf-8');
      if (procListeners.stdout.length > 0) {
        procListeners.stdout.forEach(v => v([msg]));
      }
      if (processBuf[procId] == null) return;
      processBuf[procId].push(['stderr', msg]);
    });
    setTimeout(() => delete processBuf[procId], 12000);
    return () => {
      if (proc.connected) proc.kill();
    };
  },
  'process/onStdout': makeListener('stdout'),
  'process/onStdin': makeListener('stdin'),
  'process/onError': makeListener('error'),
  'process/onClose': makeListener('close'),
  'process/kill': (params, callback) => {
    let args = toObject(params);
    let procId, code;
    if (Array.isArray(args)) {
      procId = args[0];
      code = args[1];
    } else {
      procId = args;
      code = null;
    }
    let proc = processes[procId];
    if (proc == null) {
      throw new Error('Unknown process ID ' + proc);
    }
    if (typeof code !== 'string' && code != null) {
      throw new Error('code must be string or null');
    }
    if (code == null) code = undefined;
    proc.kill(code);
    setTimeout(() => {
      callback([], true);
    }, 0);
  },
  'process/writeStdin': (params, callback) => {
    let [procId, data] = toObject(params);
    let proc = processes[procId];
    if (proc == null) {
      throw new Error('Unknown process ID ' + proc);
    }
    if (typeof data !== 'string') {
      throw new Error('data must be string');
    }
    proc.stdin.write(data, 'utf-8', () => {
      callback([], true);
    });
  }
});
