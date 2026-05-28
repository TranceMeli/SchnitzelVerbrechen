function initGame() {
    const cards = document.querySelectorAll('.memory-card');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let score = 0;
    let moves = 0;
    let matchedPairs = 0;
    const totalPairs = cards.length / 2;

    function updateScore(points) {
        score += points;
        document.getElementById('score').textContent = 'Score: ' + score;
    }

    function updateMoves() {
        moves++;
        document.getElementById('moves').textContent = 'Züge: ' + moves;
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        updateMoves();
        checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        updateScore(+10);
        showMessage(); // nur einmal aufrufen

        matchedPairs++;
        if (matchedPairs === totalPairs) {
            setTimeout(showWin, 600);
        }

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        updateScore(-2);
        showMessage();

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function showWin() {
        // Beide Tooltip-Boxen gleichzeitig für Win-Screen
        ['left', 'right'].forEach(side => {
            const box = document.getElementById('msg-' + side);
            box.textContent = side === 'left'
                ? `🏆 ${moves} Züge!`
                : `Score: ${score}`;
            box.classList.add('visible');
        });
    }

    // Fisher-Yates Shuffle über CSS order
    (function shuffle() {
        const indices = Array.from({ length: cards.length }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        cards.forEach((card, i) => {
            card.style.order = indices[i];
        });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard));
}

// Globale Reset-Funktion für den Button
function resetGame() {
    const game = document.querySelector('.memory-game');
    game.innerHTML = '';
    document.getElementById('score').textContent = 'Score: 0';
    document.getElementById('moves').textContent = 'Züge: 0';

    // Tooltip-Boxen leeren
    ['left', 'right'].forEach(side => {
        const box = document.getElementById('msg-' + side);
        box.textContent = '';
        box.classList.remove('visible');
    });

    // lastSide in words.js zurücksetzen
    if (typeof window.lastSide !== 'undefined') window.lastSide = 'right';

    // Karten neu laden
    fetch('image.json')
        .then(r => r.json())
        .then(cardData => {
            cardData.forEach(card => {
                for (let i = 0; i < 2; i++) {
                    let memoryCard = document.createElement('div');
                    memoryCard.classList.add('memory-card');
                    memoryCard.dataset.framework = card.framework;
                    memoryCard.innerHTML = `
                        <img class="front-face" src="${card.src}" alt="${card.framework}">
                        <img class="back-face" src="assets/SV.svg" alt="Memory Card">
                    `;
                    game.appendChild(memoryCard);
                }
            });
            initGame();
        });
}