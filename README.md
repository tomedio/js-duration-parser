# JS Duration Parser
This library is written to parse human-like duration time eg. `2d 10h 30m` to given time unit, eg. hours or minutes. It allows to do reverse operation as well, so it is possible to get eg. `2h 30m` from `150` minutes.

## Installation

You can install it by your node dependency manager like npm or yarn.

npm:
```shell
npm install js-duration-parser
```

yarn:
```shell
yarn add js-duration-parser
```

Then you can use it in your app by import:
```javascript
import DurationParser from 'js-duration-parser'
```

or as CommonJS module:
```javascript
var DurationParser = require('js-duration-parser')
```

## Basic usage
You can use duration parser to parse human-like duration string or to generate it from a number of time units.

### Duration string
Duration string can be build using groups, separated by spaces, eg. `2d 30m 10s`, Every group consists of number and time unit.

Possible time units (for 'en' locale):
* `s` = **s**econds;
* `m` = **m**inutes;
* `h` = **h**ours;
* `d` = **d**ays;
* `w` = **w**eeks.

In duration string you don't need to specify group with 0 number. So, value `2h 0m 30s` is syntactically correct but unnecessary.

Duration string can take both uppercase and lowercase time identifiers, so `2H 30M` means the same as `2h 30m`. Number of spaces does not matter too, so eg. `  2d   30m1h 20s   ` is correct duration.

### Parsing
```javascript
import DurationParser from 'js-duration-parser'

const durationParser = new DurationParser();
durationParser.parse('3h 30m 30s'); // 210.5m
durationParser.parse('15m 15s', 's'); // 915s
durationParser.parse('1w2d5h', 'h'); // 221h
```

`parse` method takes two arguments:
* required duration string;
* optional time unit for which should be calculated the duration; default unit is `m`.

**Watch-out!** String with a single numeric value can be parsed as a number of given time units:
```javascript
durationParser.parse(' 12 ', 's'); // 12s
```

### Generation
```javascript
import DurationParser from 'js-duration-parser'

const durationParser = new DurationParser();
durationParser.compose(210.5); // 3h 30m 30s
durationParser.compose(915, 's'); // 15m 15s
durationParser.compose(221, 'h', ''); // 1w2d5h
```

`compose` method takes three arguments:
* required time number;
* optional time unit previous number; default value is `m`;
* optional group separator character used to divide duration string into groups; default value is space: ' '.

### Localization
`en` locale is available and enabled in the library as default. You can consider to use it in almost all cases. However, if you want to use time identifiers for your own language, it's possible.

Below is an example how 'pl' locale is added. Polish mapping is as follows:
* `s` = seconds (**s**ekundy);
* `m` = minutes (**m**inuty);
* `g` = hours (**g**odziny);
* `d` = days (**d**ni);
* `t` = weeks (**t**ygodnie).

Second argument of `DurationParser` class constructor is a custom `TimeIdentifiers` object. It contains all time identifiers mapped for all supported locales. If it's not passed, then default one with only `en` support is used.

```javascript
import DurationParser, {TimeIdentifiers} from 'js-duration-parser'

const plIdentifiers = {
  s: 's',
  m: 'm',
  h: 'g',
  d: 'd',
  w: 't',
};
const timeIdentifiers = new TimeIdentifiers();
timeIdentifiers.add('pl', plIdentifiers);

const durationParser = new DurationParser('pl', timeIdentifiers);
durationParser.parse('3g 30m 30s'); // 210.5m
durationParser.compose(12.5, 'h'); // 12g 30m
```

## Validation
Parser returns null if duration string can not be parsed. However, for some reason you need only to validate the input string. You can use `DurationValidator` class then:
```javascript
import {DurationValidator} from 'js-duration-parser'

const durationValidator = new DurationValidator();
durationValidator.validate('2h 30m'); // true
durationValidator.validate('11x 12s'); // false
```

Validator can be localized:
```javascript
import {DurationValidator, TimeIdentifiers} from 'js-duration-parser'

const plIdentifiers = {
  s: 's',
  m: 'm',
  h: 'g',
  d: 'd',
  w: 't',
};
const timeIdentifiers = new TimeIdentifiers();
timeIdentifiers.add('pl', plIdentifiers);

const durationValidator = new DurationValidator(timeIdentifiers);
durationValidator.validate('2h 30m'); // true
durationValidator.validate('11x 12s'); // false
```

**Watch-out!** String with a single numeric value (eg. ` 12  `) is valid, but more numbers separated by space (eg. ` 12  1`) is invalid.

## Translation
Using this library you can translate duration string from one locale to another, eg. '2h 30ms 10s' (en) to '2g 30ms 10s' (pl).

```javascript
import {DurationTranslator, TimeIdentifiers} from 'js-duration-parser'

const plIdentifiers = {
  s: 's',
  m: 'm',
  h: 'g',
  d: 'd',
  w: 't',
};
const timeIdentifiers = new TimeIdentifiers();
timeIdentifiers.add('pl', plIdentifiers);

const durationTranslator = new DurationTranslator(timeIdentifiers);
durationTranslator.translate('5w 3d 2h 13m 20s', 'en', 'pl'); // 5t 3d 2g 13m 20s
```

## API
Full description of all API elements is available [here](./docs/api.md).