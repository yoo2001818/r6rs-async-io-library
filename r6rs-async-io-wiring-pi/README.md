# r6rs-async-io-wiring-pi
Wrapper of wiring-pi for r6rs-async-io

# Commands

- wiringPi/setup (mode)
  mode can be: wpi, gpio, sys, phys (Symbol)
- wiringPi/pinMode (pin mode)
  mode can be: input, output, pwmOutput, gpioClock, softPwmOutput,
  softToneOutput (Symbol)
- wiringPi/pullUpDnControl (pin pud)
  pud can be: off, down, up (Symbol)
- wiringPi/digitalRead (pin) -> boolean
- wiringPi/digitalWrite (pin state)
  state is #f or else
- wiringPi/pwmWrite (pin value)
  value is between 0, 1024
- wiringPi/analogRead (pin) -> value
- wiringPi/analogWrite (pin value)
- wiringPi/pulseIn (pin state) -> length
  state is #f or else
- wiringPi/isr (pin edgeType) -> delta
  edgeType is falling, rising, both, setup (Symbol)
- wiringPi/pwmToneWrite (pin freq)
- wiringPi/gpioClockSet (pin freq)
- wiringPi/softPwmCreate (pin value range)
- wiringPi/softPwmWrite (pin value)
- wiringPi/softPwmStop (pin)
- wiringPi/softToneCreate (pin value range)
- wiringPi/softToneWrite (pin value)
- wiringPi/softToneStop (pin)
- wiringPi/lcdInit (rows cols bits rs strb d0 d1 d2 d3 d4 d5 d6 d7) -> fd
- wiringPi/lcdHome (fd)
- wiringPi/lcdClear (fd)
- wiringPi/lcdDisplay (fd state)
- wiringPi/lcdCursor (fd state)
- wiringPi/lcdCursorBlink (fd state)
- wiringPi/lcdPosition (fd x y)
- wiringPi/lcdCharDef (fd index data)
- wiringPi/lcdPutchar (fd character)
- wiringPi/lcdPuts (fd string)
- wiringPi/lcdPrintf (fd string)
