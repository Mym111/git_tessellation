document.addEventListener('DOMContentLoaded', () => {
    const translateButton = document.getElementById('translateButton');
    translateButton.addEventListener('click', translateText);

    const userInput = document.getElementById('userInput');
    userInput.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) { // 13 is the key code for Enter
            event.preventDefault(); // Prevent the default action (newline) for Enter key in a textarea
            translateText();
        }
    });
});

function translateText() {
    let userInput = document.getElementById('userInput').value;
    let requestBody = { prompt: userInput };

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
