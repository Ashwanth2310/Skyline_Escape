
// Variables for plane movement and gravity
let moveSpeed = 3, gravity = 0.5;

// Selecting the plane and plane image elements
let plane = document.querySelector('.plane');
let planeImage = document.getElementById('planes');
const plane_s = new Audio("Airliner.mp3");
plane_s.loop = true;
const crash = new Audio("crash.mp3")
// Preloading the plane image as there was bug which wouldnt show the image of the plane immediately
const preloadImage = new Image();
preloadImage.src = 'plane.png';

preloadImage.onload = function() {
    planeImage.src = preloadImage.src;
    planeImage.style.display = 'none';
};

// Getting plane element properties
let planeProps = plane.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();

let scoreVal = document.querySelector('.score_val');
let message = document.querySelector('.prompt');
let scoreTitle = document.querySelector('.score_head');

let gameState = 'Start';
planeImage.style.display = 'none';
message.classList.add('promptStyle');

document.addEventListener('keydown', (e) => {
    if(e.key == 'Enter' && gameState != 'Play'){
        document.querySelectorAll('.building').forEach((e) => {
            e.remove();
        });
        planeImage.style.display = 'block';
        plane.style.top = '40vh';
        gameState = 'Play';
        message.innerHTML = ' ';
        scoreTitle.innerHTML = 'Score : ';
        scoreVal.innerHTML = '0';
        message.classList.remove('promptStyle');
        play();
    }
});

//Function to start platying the game
function play(){
    plane_s.play();
    function move(){
        if(gameState != 'Play') return;

        let building = document.querySelectorAll('.building');
        building.forEach((element) => {
            let buildingProps = element.getBoundingClientRect();
            planeProps = plane.getBoundingClientRect();

            if(buildingProps.right <= 0){
                element.remove();
            }else{
                if(planeProps.left < buildingProps.left + buildingProps.width && planeProps.left + planeProps.width > buildingProps.left && planeProps.top < buildingProps.top + buildingProps.height && planeProps.top + planeProps.height > buildingProps.top){
                    crash.play();
                    gameState = 'End';
                    planeImage.style.display = 'none';
                    location.href = './LoseScreen.html';
                    return;
                }else{
                    if(buildingProps.right < planeProps.left && buildingProps.right + moveSpeed >= planeProps.left && element.increaseScore == '1'){
                        scoreVal.innerHTML =+ scoreVal.innerHTML + 1;
                    }
                    element.style.left = buildingProps.left - moveSpeed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let planeDy = 0;
    function applyGravity(){
        if(gameState != 'Play') return;
        planeDy = planeDy + gravity;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '|| e.key == 'w'){
                planeImage.src = 'plane.png';
                planeDy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' ' || e.key == 'w'){
                planeImage.src = 'plane.png';
            }
        });

        if(planeProps.top <= 0 || planeProps.bottom >= background.bottom){
            gameState = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('promptStyle');
            return;
        }
        plane.style.top = planeProps.top + planeDy + 'px';
        planeProps = plane.getBoundingClientRect();
        requestAnimationFrame(applyGravity);
    }
    requestAnimationFrame(applyGravity);

    let buildingSeparation = 0;

    let buildingGap = 40;

    function createBuilding(){
        if(gameState != 'Play') return;

        if(buildingSeparation > 115){
            buildingSeparation = -10;

            let buildingPos = Math.floor(Math.random() * 43) + 8;
            let buildingSpriteInv = document.createElement('div');
            buildingSpriteInv.className = 'building';
            buildingSpriteInv.style.top = buildingPos - 70 + 'vh';
            buildingSpriteInv.style.left = '100vw';

            document.body.appendChild(buildingSpriteInv);
            let buildingSprite = document.createElement('div');
            buildingSprite.className = 'building';
            buildingSprite.style.top = buildingPos + buildingGap + 'vh';
            buildingSprite.style.left = '100vw';
            buildingSprite.increaseScore = '1';

            document.body.appendChild(buildingSprite);
        }
        buildingSeparation++;
        requestAnimationFrame(createBuilding);
    }
    requestAnimationFrame(createBuilding);
}

