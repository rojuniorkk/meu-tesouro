function irandom(min, max){
    return Math.floor(Math.random() * (max) + min);
}

function playSound(src, autoplay = true, config={}){

    let sound = new Audio(src);
    sound.volume = config.volume || .45
    sound.loop = config.loop || false

    if(autoplay){
        sound.play();
    }

    return sound
}