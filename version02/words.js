const words = [
    "Disgusting!",
    "Ewwww!!!",
    "Halleluja",
    "What is this?",
    "I think I'm gonna be sick...",
    "Who cooked this?!",
    "This smells like feet!",
    "Is this even food?",
    "My dog wouldn't eat this.",
    "Call the health inspector!",
    "This is a crime against food!",
    "I've seen better looking garbage.",
    "Did someone sit on this?",
    "This belongs in a museum... of horrors.",
    "I would rather starve.",
    "What in the world...",
    "Send it back!",
    "Nope. Absolutely not.",
    "This is why I don't eat out.",
    "Even the flies left."
];

function generateWords() {
    const randomWord = Math.floor(Math.random() * words.length);
    return words[randomWord];
}

// Merkt sich, welche Seite zuletzt bespielt wurde
let lastSide = 'right'; // startet links beim ersten Aufruf

function showMessage() {
    // Seite wechseln
    const side = lastSide === 'left' ? 'right' : 'left';
    lastSide = side;

    const box = document.getElementById('msg-' + side);
    box.textContent = generateWords();
    box.classList.add('visible');

    setTimeout(() => {
        box.classList.remove('visible');
        // Text erst nach Fade leeren
        setTimeout(() => { box.textContent = ''; }, 200);
    }, 1500);
}