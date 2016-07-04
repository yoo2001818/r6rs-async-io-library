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
