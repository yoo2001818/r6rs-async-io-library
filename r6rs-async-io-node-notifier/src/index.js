import notifier from 'node-notifier';
import { toObject, fromAssoc, STRING } from 'r6rs';

export default {
  'notifier/send': (params, callback) => {
    let options;
    if (params.type === STRING) {
      options = params.value;
    } else {
      options = fromAssoc(toObject(params));
    }
    notifier.notify(options, (err, response) => { // eslint-disable-line
      // Since node-notifier doesn't support response in Linux, this is useless
      // for now.
    });
    setTimeout(() => callback([], true), 0);
  }
};
