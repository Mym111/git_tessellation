document.addEventListener('DOMContentLoaded', () => {
    const translateButton = document.getElementById('translateButton');
    translateButton.addEventListener('click', translateText);

    const userInput = document.getElementById('userInput');
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            translateText();
        }
    });
});

function translateText() {
    let userInput = document.getElementById('userInput').value;
    let requestBody = { prompt: userInput };
    document.getElementById('translationOutput').innerText = 'Translating...';

    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('translationOutput').innerText = data.translation;
    })
    .catch(error => {
        console.error('Error during translation:', error);
        document.getElementById('translationOutput').innerText = 'Translation failed. Please try again.';
    });
}
