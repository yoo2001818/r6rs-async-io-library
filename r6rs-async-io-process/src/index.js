import { exec } from 'child_process';
import { toObject, fromAssoc, STRING } from 'r6rs';
import { Library } from 'r6rs-async-io';

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
  }
});
