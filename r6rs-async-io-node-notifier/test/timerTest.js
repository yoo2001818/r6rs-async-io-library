import IOManager from 'r6rs-async-io';
import { Machine, assert } from 'r6rs';
import notifierLib from '../src/index';

let machine = new Machine();
let ioManager = new IOManager(machine);
ioManager.resolver.add('setInterval', (params, callback) => {
  assert(params, 'number');
  let timerId = setInterval(callback, params.value);
  return () => {
    clearInterval(timerId);
  };
});
ioManager.resolver.addLibrary(notifierLib);

machine.loadLibrary(ioManager.getLibrary());

machine.evaluate(`
(io-exec "notifier-send" '(
  (title "알림을 시작합니다")
  (message "10초 뒤에 알림이 다시 날아올겁니다")
))
(io-once "setInterval" 10000 (lambda ()
  (io-exec "notifier-send" '(
    (title "알림이 끝났습니다")
    (message "넵 끝남")
    (hint "string:sound-name:complete")
  ) (lambda ()
    (display "끝남")
  ))
))
`);
