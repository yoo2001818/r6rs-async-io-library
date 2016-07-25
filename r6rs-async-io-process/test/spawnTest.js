import IOManager from 'r6rs-async-io';
import { Machine } from 'r6rs';
import processLib from '../src/index';

let machine = new Machine();
let ioManager = new IOManager(machine);
ioManager.resolver.addLibrary(processLib);

machine.loadLibrary(ioManager.getLibrary());

machine.evaluate(`
(io-on "process/spawn" '(("dbus-monitor" "--session")) (lambda (process)
  (io-on "process/onStdout" process (lambda (data)
    (display data)
  ))
  (io-on "process/onClose" process (lambda (code signal)
    (display "Closed ")
    (display code)
    (display signal)
    (newline)
  ))
  (io-exec "process/kill" process (lambda ()
    (display "OK")
  ))
))
`);
