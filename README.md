# egzamin-informatyk.pl Answers Fetcher

Script for retrieving answers for exams at egzamin-informatyk.pl

## Usage

1. Copy and paste the following code into your browser's console:

    ```javascript
    fetch('https://raw.githubusercontent.com/gjzbrg/egzamininformatykAnswers/main/script.js')
      .then(res => res.text())
      .then(script => eval(script));
    ```

2. After running the script, the correct answers will be highlighted and printed in the console, like:

    ```
    1. A
    2. C
    3. D
    4. B
    ...
    ```
## NOTE
This is the script for AUTO-Completion (not sure how it works though.)
```javascript
fetch('https://raw.githubusercontent.com/gjzbrg/egzamininformatykAnswers/main/script.js')
  .then(res => res.text())
  .then(script => {
    // choose: 'default' | 'stealth' | 'auto'
    script = script.replace("const MODE = 'default';", "const MODE = 'auto';");
    // AUTO_TARGET can be a number (e.g. 7) or percent string (e.g. '70%')
    script = script.replace("const AUTO_TARGET = '70%';", "const AUTO_TARGET = '60%';");
    eval(script);
  });
```
