(function () {
    // CONFIG: choose mode and auto-target here before pasting in the browser.
    // mode: 'default' | 'stealth' | 'auto'
    // autoTarget: number (count) or string with percent like '70%'
    const MODE = 'default'; // default behavior: visible highlighting
    const AUTO_TARGET = '70%'; // used only when MODE === 'auto'
    const HIGHLIGHT_COLOR = 'plum';

    const tagList = [];
    const questions = document.querySelectorAll('.trescE');
    let ansList = []
    questions.forEach((q, index) => {
        const nr = index + 1;
        const row = [
            q,
            document.getElementById('odpa' + nr),
            document.getElementById('odpb' + nr),
            document.getElementById('odpc' + nr),
            document.getElementById('odpd' + nr)
        ];
        tagList.push(row);
    });

    function getInputFromElement(el) {
        if (!el) return null;
        if (el.tagName === 'INPUT') return el;
        if (el.tagName === 'LABEL' && el.htmlFor) return document.getElementById(el.htmlFor);
        const inp = el.querySelector && el.querySelector('input');
        return inp || null;
    }

    let originalForm = document.getElementById('formegzamin');
    let formClone = originalForm.cloneNode(true);
    formClone.style.display = 'none';
    document.body.appendChild(formClone);

    let formData = new FormData(formClone);

    fetch(formClone.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'text/html'
        }
    })
        .then(response => response.text())
        .then(responseText => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(responseText, 'text/html');
            let correctAnswers = doc.querySelectorAll('.odpgood');
            let answerText = "Correct Answers:\n";
            window.answerList = [];

            correctAnswers.forEach(answer => {
                let questionNumber = answer.id.replace(/\D/g, '');
                let correctAnswer = answer.querySelector('strong').textContent.trim();
                answerText += `Question ${questionNumber}: ${correctAnswer}\n`;
                window.answerList.push(correctAnswer);
                ansList.push(correctAnswer.charAt(0))
            });

            const N = correctAnswers.length;

            function applyHighlight(index, letter) {
                const idx = letter.toLowerCase().charCodeAt(0) - 96; // a->1
                const el = tagList[index] && tagList[index][idx];
                if (!el) return;
                if (MODE === 'stealth') {
                    // subtle, hard-to-notice highlight
                    el.style.backgroundColor = 'rgba(128,0,128,0.07)';
                    el.style.borderRadius = '3px';
                } else {
                    el.style.color = HIGHLIGHT_COLOR;
                }
            }

            function parseAutoTarget(t, total) {
                if (typeof t === 'number') return Math.max(0, Math.min(total, Math.floor(t)));
                if (typeof t === 'string' && t.trim().endsWith('%')) {
                    const p = parseFloat(t);
                    if (isNaN(p)) return 0;
                    return Math.max(0, Math.min(total, Math.round(total * p / 100)));
                }
                const n = parseInt(t, 10);
                if (!isNaN(n)) return Math.max(0, Math.min(total, n));
                return 0;
            }

            if (MODE === 'auto') {
                const desiredCorrect = parseAutoTarget(AUTO_TARGET, N);
                // build array of indices [0..N-1]
                const indices = Array.from({ length: N }, (_, i) => i);
                // pick random sample of size desiredCorrect
                const picked = [];
                while (picked.length < desiredCorrect && indices.length) {
                    const r = Math.floor(Math.random() * indices.length);
                    picked.push(indices.splice(r, 1)[0]);
                }

                for (let i = 0; i < N; i++) {
                    const correctLetter = ansList[i];
                    const correctIdx = correctLetter.toLowerCase().charCodeAt(0) - 96;
                    if (picked.indexOf(i) !== -1) {
                        // select the correct input
                        const input = getInputFromElement(tagList[i][correctIdx]);
                        if (input) {
                            input.checked = true;
                            input.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                        applyHighlight(i, correctLetter);
                    } else {
                        // pick a random wrong option (1..4 but not correctIdx)
                        const choices = [1, 2, 3, 4].filter(x => x !== correctIdx);
                        const rnd = choices[Math.floor(Math.random() * choices.length)];
                        const input = getInputFromElement(tagList[i][rnd]);
                        if (input) {
                            input.checked = true;
                            input.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    }
                }

                console.log(`Auto mode: desired ${desiredCorrect}/${N} correct chosen randomly.`);
            } else {
                // default or stealth: just highlight correct answers
                for (let x = 0; x < correctAnswers.length; x++) {
                    applyHighlight(x, ansList[x]);
                }
                console.log(answerText);
            }
        })
        .catch(error => {
            console.error('Error during form submission:', error);
        });
})();
