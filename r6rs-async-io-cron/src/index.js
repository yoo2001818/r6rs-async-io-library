import { CronJob } from 'cron';
import { assert } from 'r6rs';
import { Library } from 'r6rs-async-io';

export default new Library('cron', {
  'cron/start': (params, callback) => {
    assert(params, 'string');
    let pattern = params.value;
    let job = new CronJob(pattern, () => callback([]));
    job.start();
    return () => {
      job.stop();
    };
  }
});
