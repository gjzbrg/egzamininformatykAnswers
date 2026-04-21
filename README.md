# egzamin-informatyk.pl Answers Fetcher

Script for retrieving answers for exams at egzamin-informatyk.pl

## Usage

1. Copy and paste the following code into your browser's console:

    ```javascript
    fetch('https://raw.githubusercontent.com/TheIrregularity/egzamininformatykAnswers/main/script.js')
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
