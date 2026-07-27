const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const player = document.getElementById('player');
const statusText = document.getElementById('status');

let model = null;
let playerPos = 50;
let gameActive = true;
let score = 0;
let asteroids = [];

// Handtrack configurations
const modelParams = {
    flipHorizontal: false, // We already flip in CSS
    maxNumBoxes: 1,        // Only look for ONE hand to prevent confusion
    iouThreshold: 0.5,     
    scoreThreshold: 0.6,   // Only respond if the "certainty" is high
};

// 1. Load the Model and Start Video
handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
    statusText.innerText = "MODEL LOADED. STARTING VIDEO...";
    handTrack.startVideo(video).then(status => {
        if (status) {
            statusText.innerText = "READY: MOVE HAND TO DODGE";
            runDetection();
            setInterval(spawnAsteroid, 1500);
        }
    });
});

function runDetection() {
    model.detect(video).then(predictions => {
        // Draw the tracking box on canvas so you can see it working
        model.renderPredictions(predictions, canvas, context, video);
        
        if (predictions.length > 0 && gameActive) {
            // Get the X coordinate of the center of the detected hand
            let handX = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2);
            
            // Map the hand position (0 to 480) to the player position (10 to 90%)
            playerPos = (handX / 480) * 100;
            playerPos = Math.max(10, Math.min(90, playerPos));
            
            player.style.left = playerPos + '%';
        }
        
        if (gameActive) {
            gameLogic();
            requestAnimationFrame(runDetection);
        }
    });
}

function spawnAsteroid() {
    if (!gameActive) return;
    const ast = document.createElement('div');
    ast.className = 'asteroid';
    ast.innerText = '☄️';
    ast.style.left = Math.random() * 90 + '%';
    ast.style.top = '-50px';
    document.getElementById('game-arena').appendChild(ast);
    asteroids.push({ el: ast, top: -50 });
}

function gameLogic() {
    const pRect = player.getBoundingClientRect();
    asteroids.forEach((a, i) => {
        a.top += 5;
        a.el.style.top = a.top + 'px';
        const aRect = a.el.getBoundingClientRect();

        if (aRect.bottom > pRect.top && aRect.top < pRect.bottom &&
            aRect.right > pRect.left && aRect.left < pRect.right) {
            gameActive = false;
            document.getElementById('game-over').style.display = 'flex';
        }

        if (a.top > 250) {
            a.el.remove();
            asteroids.splice(i, 1);
            score += 10;
            document.getElementById('score').innerText = `Score: ${score}`;
        }
    });
}