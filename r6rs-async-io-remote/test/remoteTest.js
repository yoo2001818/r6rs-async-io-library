import IOManager from 'r6rs-async-io';
import { Machine } from 'r6rs';
import remoteLib from '../src/index';

let machine = new Machine();
let ioManager = new IOManager(machine);
ioManager.resolver.addLibrary(remoteLib);

machine.loadLibrary(ioManager.getLibrary());

machine.evaluate(`
(io-exec "remote/start" '())
(io-on "remote/listen" "test" (lambda args
  (display args)
  (newline)
))
`);
