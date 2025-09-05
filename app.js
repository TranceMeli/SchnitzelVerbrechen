let countCrimes = 0;
const countDisplay = document.getElementById('countCrimes');
const startButton = document.getElementById('start-btn');

document.querySelectorAll('.card').forEach(card => {
    card.classList.add('flipped');
    card.dataset.revealed = 'false';
});

startButton.addEventListener('click', () => {
    countCrimes = 0;
    countDisplay.textContent = `Crimes found: ${countCrimes}`;

    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped');
        card.dataset.revealed = 'false';
    });

    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('flipped');
        });
    }, 3000);
});

function handleClick(card){

    if (!card.classList.contains('flipped')) return;
    if (card.dataset.revealed === 'true') return;

    const isCrime = card.dataset.isCrime === 'true';
    card.classList.remove('flipped');

    if (isCrime) {
    countCrimes +=10
    card.dataset.revealed = 'true';
    } else {
        countCrimes -=10
        setTimeout(() => {
            card.classList.add('flipped');
        }, 1000);    
    }

    card.dataset.revealed = 'true';

    countDisplay.textContent = `Crimes found: ${countCrimes}`;
}
