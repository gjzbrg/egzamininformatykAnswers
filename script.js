(function () {
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
            for (x = 0; x < correctAnswers.length; x++) {
                tagList[x][ansList[x].toLowerCase().charCodeAt(0) - 96].style["color"] = "plum"
            }

            console.log(answerText);
        })
        .catch(error => {
            console.error('Error during form submission:', error);
        });
})();
