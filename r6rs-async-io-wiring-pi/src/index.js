import wpi from 'wiring-pi';
import { toObject } from 'r6rs';
import { Library } from 'r6rs-async-io';

const enums = {
  input: wpi.INPUT,
  output: wpi.OUTPUT,
  pwmOutput: wpi.PWM_OUTPUT,
  gpioClock: wpi.GPIO_CLOCK,
  softPwmOutput: wpi.SOFT_PWM_OUTPUT,
  softToneOutput: wpi.SOFT_TONE_OUTPUT,
  off: wpi.PUD_OFF,
  down: wpi.PUD_DOWN,
  up: wpi.PUD_UP,
  falling: wpi.INT_EDGE_FALLING,
  rising: wpi.INT_EDGE_RISING,
  both: wpi.INT_EDGE_BOTH,
  setup: wpi.INT_EDGE_SETUP
};

export default new Library('wiring-pi', {
  'wiringPi/setup': (params, callback) => {
    let options = toObject(params);
    wpi.setup(options[0]);
    setTimeout(() => callback([], true), 0);
  },
  'wiringPi/pinMode': (params, callback) => {
    let options = toObject(params);
    wpi.pinMode(options[0], enums[options[1]]);
    setTimeout(() => callback([], true), 0);
  },
  'wiringPi/pullUpDnControl': (params, callback) => {
    let options = toObject(params);
    wpi.pullUpDnControl(options[0], enums[options[1]]);
    setTimeout(() => callback([], true), 0);
  },
  'wiringPi/digitalRead': (params, callback) => {
    let options = toObject(params);
    setTimeout(() => {
      callback([wpi.digitalRead(options[0])], true);
    }, 0);
  },
  'wiringPi/digitalWrite': (params, callback) => {
    let options = toObject(params);
    wpi.digitalWrite(options[0],
      (options[1] === 0 || options[1] === false) ? 0 : 1);
    setTimeout(() => callback([], true), 0);
  },
  'wiringPi/pwmWrite': (params, callback) => {
    let options = toObject(params);
    wpi.pwmWrite(options[0], options[1]);
    setTimeout(() => callback([], true), 0);
  },
  'wiringPi/analogRead': (params, callback) => {
    let options = toObject(params);
    setTimeout(() => {
      callback([wpi.analogRead(options[0])], true);
    }, 0);
  },
  'wiringPi/analogWrite': (params, callback) => {
    let options = toObject(params);
    wpi.analogWrite(options[0], options[1]);
    setTimeout(() => callback([], true), 0);
  },
  'wiringPi/pulseIn': (params, callback) => {
    let options = toObject(params);
    setTimeout(() => {
      callback([wpi.pulseIn(options[0],
        (options[1] === 0 || options[1] === false) ? 0 : 1)
      ], true);
    }, 0);
  },
  'wiringPi/isr': (params, callback) => {
    let options = toObject(params);
    wpi.wiringPiISR(options[0], enums[options[1]], delta => {
      callback([delta]);
    });
    return () => {
      wpi.wiringPiISRCancel(options[0]);
    };
  },
  'wiringPi/pwmToneWrite': (params, callback) => {
    let options = toObject(params);
    wpi.pwmToneWrite(options[0], options[1]);
    setTimeout(() => callback([], true), 0);
  },
  'wiringPi/gpioClockSet': (params, callback) => {
    let options = toObject(params);
    wpi.gpioClockSet(options[0], options[1]);
    setTimeout(() => callback([], true), 0);
  },
  'wiringPi/softPwmCreate': (params, callback) => {
    let options = toObject(params);
    wpi.softPwmCreate(options[0], options[1], options[2]);
    setTimeout(() => callback([], true), 0);
    return () => {
      wpi.softPwmStop(options[0]);
    };
  },
  'wiringPi/softPwmWrite': (params, callback) => {
    let options = toObject(params);
    wpi.softPwmWrite(options[0], options[1]);
    setTimeout(() => callback([], true), 0);
  },
  'wiringPi/softPwmStop': (params, callback) => {
    let options = toObject(params);
    wpi.softPwmStop(options[0]);
    setTimeout(() => callback([], true), 0);
  },
  'wiringPi/softToneCreate': (params, callback) => {
    let options = toObject(params);
    wpi.softToneCreate(options[0], options[1], options[2]);
    setTimeout(() => callback([], true), 0);
    return () => {
      wpi.softToneStop(options[0]);
    };
  },
  'wiringPi/softToneWrite': (params, callback) => {
    let options = toObject(params);
    wpi.softToneWrite(options[0], options[1]);
    setTimeout(() => callback([], true), 0);
  },
  'wiringPi/softToneStop': (params, callback) => {
    let options = toObject(params);
    wpi.softToneStop(options[0]);
    setTimeout(() => callback([], true), 0);
  }
});
