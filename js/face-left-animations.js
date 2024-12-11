/////////////////////////////////////////////// Anim button 1
let buttonExample1 = document.getElementById('buttonAnimExample1');

buttonExample1.addEventListener('click', () => {
    buttonExample1.style.animationPlayState = 'running';
});
buttonExample1.addEventListener('animationiteration', () => {
    buttonExample1.style.animationPlayState = 'paused';
});

/////////////////////////////////////////////// Anim button 1
let buttonExample2 = document.getElementById('buttonAnimExample2');
let eyeanimations = document.querySelectorAll('#eyeanimation');

for (let i = 0; i < eyeanimations.length; i++) {
    eyeanimations[i].addEventListener('click', (ev) => {
        console.log('click');
        eyeanimations[i].classList.toggle('eyesopen');
        ev.stopImmediatePropagation();
    });
}

buttonExample2.addEventListener('click', () => {
    console.log('click');
    eyeanimations.forEach(element => element.classList.toggle('eyesopen'));
}, false);


/////////////////////////////////////////////// Anim button 1
let buttonExample3 = document.getElementById('buttonAnimExample3');

let submarineHatch = document.getElementById('submarine-hatch');
let submarinePeriscope = document.getElementById('submarine-periscope');
let submarineTail = document.getElementById('submarine-tail');
let submarinePropeller = document.getElementById('submarine-aleta');
let submarineWindows = document.querySelectorAll('#submarine-windows .window');

// Submarine Keyframes Options START

let optionsSubmarineDownKeyFrames = {
    easing: 'cubic-bezier(0,.01,0,.98)',
    fill: 'forwards',
    duration: 1000
};

let optionsSubmarineFloatKeyFrames = {
    iterations: Infinity,
    easing: 'ease-in-out',
    direction: 'alternate',
    duration: 2000,
};
let optionsSubmarineGoKeyFrames = {
    duration: 7000,
    delay: 3500,
    fill: 'forwards',
    easing: 'ease-in-out'
};
// Submarine Keyframes Options END

// Submarine__Items Keyframes Options START
function createOptionsKeyFrames(AnimationDelay, AnimationDuration = 1000) {
    return {
        delay: AnimationDelay,
        duration: AnimationDuration,
        easing: 'cubic-bezier(.8,.95,.59,1.21)',
        fill: 'forwards'
    }
}

let optionsSubmarineItemKeyFrames = createOptionsKeyFrames(1000);
let optionsSubmarineWindows = new Array(submarineWindows.length);

// K es igual al delay entre animaciones, K se incrementa en cada iteración
for (let i = 0, k = 1000; i < optionsSubmarineWindows.length; i++, k += 100 ){
    optionsSubmarineWindows[i] = createOptionsKeyFrames(k, 200);
}

let optionsSubmarinePropeller = {
    duration: 300,
    delay: 3000,
    iterations: Infinity,
    easing: 'ease-in'
}
// Submarine__Items Keyframes Options END

// Submarine KeyFrames START
let submarineDownKeyframes = new KeyframeEffect( 
    buttonExample3,
    [
      { transform: 'translateY(0%)' }, 
      { transform: 'translateY(100%)' } 
    ], 
    optionsSubmarineDownKeyFrames 
);

let submarineFloatKeyframes = new KeyframeEffect( 
    buttonExample3,
    [
      { transform: 'translateY(100%)' }, // keyframe 
      { transform: 'translateY(170%)' } // keyframe
    ], 
    optionsSubmarineFloatKeyFrames 
);

let submarineGoKeyframes = new KeyframeEffect(
    buttonExample3,
    [
      { right: '0%' }, // keyframe 
      { right: '-500%' } // keyframe
    ], 
    optionsSubmarineGoKeyFrames
);
// Submarine KeyFrames END

// Submarine__Items KeyFrames START
let submarineHatchKeyFrames = new KeyframeEffect(
    submarineHatch,
    [
        {transform: 'translateY(0)'},
        {transform: 'translateY(-20%)'}
    ],
    optionsSubmarineItemKeyFrames
);

let submarinePeriscopeKeyFrames = new KeyframeEffect(
    submarinePeriscope,
    [
        {transform: 'rotate(90deg)'},
        {transform: 'rotate(0deg)'}
    ],
    optionsSubmarineItemKeyFrames
);

let submarineTailKeyframes = new KeyframeEffect(
    submarineTail,
    [
        {transform: 'translateX(0%)'},
        {transform: 'translateX(-150%)'}
    ],
    optionsSubmarineItemKeyFrames
);

let submarineWindowsKeyFrames = new Array(optionsSubmarineWindows.length);
for (let i = 0; i < submarineWindowsKeyFrames.length; i++) {
    submarineWindowsKeyFrames[i] = new KeyframeEffect(
        submarineWindows[i],
        [
            {transform: 'scale(0)'},
            {transform: 'scale(1)'}
        ],
        optionsSubmarineWindows[i]
    );
}

let submarineAletaKeyframes = new KeyframeEffect(
    submarinePropeller,
    [
        {transform: 'rotate(0deg)'},
        {transform: 'rotate(360deg)'},
    ],
    optionsSubmarinePropeller
);
// Submarine__Items KeyFrames END

// Submarine Animations START
let animationSubmarineDown = new Animation();
animationSubmarineDown.effect = submarineDownKeyframes;
let animationSubmarineFloat = new Animation();
animationSubmarineFloat.effect = submarineFloatKeyframes;
let animationSubmarineGo = new Animation();
animationSubmarineGo.effect = submarineGoKeyframes;
// Submarine Animations END

// Submarine__Items Animations START
let animationSubmarineHatch = new Animation();
animationSubmarineHatch.effect = submarineHatchKeyFrames;
let animationSubmarinePeriscope = new Animation();
animationSubmarinePeriscope.effect = submarinePeriscopeKeyFrames;
let animationSubmarineTail = new Animation();
animationSubmarineTail.effect = submarineTailKeyframes;

let animationSubmarineWindows = new Array(submarineWindowsKeyFrames.length);
for (let i = 0; i < animationSubmarineWindows.length; i++) {
    animationSubmarineWindows[i] = new Animation();
    animationSubmarineWindows[i].effect = submarineWindowsKeyFrames[i];
}

let animationSubmarinePropeller = new Animation();
animationSubmarinePropeller.effect = submarineAletaKeyframes;
// Submarine__Items Animations END

const buttonInitialValues = {
    right: buttonExample3.style.right,
    transform: buttonExample3.style.position
}

animationSubmarineDown.addEventListener('finish', () => {
    buttonExample3.firstElementChild.classList.add('fadeOut');
    
    
    animationSubmarineHatch.play();
    animationSubmarinePeriscope.play();
    animationSubmarineTail.play();
    animationSubmarineWindows.forEach(element => element.play());
    animationSubmarineFloat.play();
    animationSubmarinePropeller.play();

    animationSubmarineGo.play();
});

animationSubmarineGo.addEventListener('finish', () => {
    // Let's restore everything
    animationSubmarineHatch.cancel();
    animationSubmarinePeriscope.cancel();
    animationSubmarineTail.cancel();
    animationSubmarineWindows.forEach(element => element.cancel());
    animationSubmarineFloat.pause();
    animationSubmarineFloat.cancel();
    animationSubmarinePropeller.pause();
    animationSubmarinePropeller.cancel();
    animationSubmarineDown.cancel();
    animationSubmarineGo.cancel();
    buttonExample3.firstElementChild.classList.remove('fadeOut');
    buttonExample3.addEventListener('click', playSubmarineAnimation);
    console.log("Animation end");
})

/////////////////////////////////////////////// Events

buttonExample3.addEventListener('click', playSubmarineAnimation);

function playSubmarineAnimation() {
    buttonExample3.removeEventListener('click', playSubmarineAnimation);
    animationSubmarineDown.play();
}
