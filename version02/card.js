fetch('image.json')
    .then(response => response.json())
    .then(cardData => {
        const game = document.querySelector('.memory-game');
        if (game.children.length > 0) return;

        cardData.forEach(card => {
            for (let i = 0; i < 2; i++) {
                let memoryCard = document.createElement('div'); // Fix: war implizite Globalvariable
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