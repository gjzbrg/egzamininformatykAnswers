# egzamin-informatyk.pl Answers Fetcher

Script for retrieving answers for exams at egzamin-informatyk.pl

## Usage

1. Copy and paste the following code into your browser's console:

```javascript
fetch('https://raw.githubusercontent.com/gjzbrg/egzamininformatykAnswers/main/script.js')
  .then(res => res.text())
  .then(script => {
    // choose: 'default' | 'stealth' | 'auto'
    script = script.replace("const MODE = 'default';", "const MODE = 'MODE';");
    // AUTO_TARGET can be a number (e.g. 7) or percent string (e.g. '70%')
    script = script.replace("const AUTO_TARGET = '70%';", "const AUTO_TARGET = 'PERCENTAGE';");
    eval(script);
  });
```
There are two values: MODE and PERCENTAGE
Modes:
auto (auto-completing)
stealth (slight color change)
default (highlighting the font)

Percentage:
Enter the percentage you want to get and it will auto select randomly but making sure that the final results are just how you desired
WARNING: AUTO-COMPLETION IS REQUIRED FOR THIS TO WORK

2. After running the script, the correct answers will be highlighted and printed in the console, like:

    ```
    1. A
    2. C
    3. D
    4. B
    ...
    ```

## Exmaple
```javascript
fetch('https://raw.githubusercontent.com/gjzbrg/egzamininformatykAnswers/main/script.js')
  .then(res => res.text())
  .then(script => {
    // choose: 'default' | 'stealth' | 'auto'
    script = script.replace("const MODE = 'default';", "const MODE = 'auto';");
    // AUTO_TARGET can be a number (e.g. 7) or percent string (e.g. '70%')
    script = script.replace("const AUTO_TARGET = '70%';", "const AUTO_TARGET = '85%';");
    eval(script);
  });
```
This example will autocomplete with 85% as an final result.
