const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
//(avevi messo il tuo collegamento dello script non dentro al body)

canvas.width = 1024 //(canvas.width e .height) ridimensionamento del nostro canvas ad un ratio di 16:9
canvas.height = 576
//(c.fillRect) viene utilizzato per disegnare un rettangolo pieno. Con quattro parametri: le coordinate x e y e la larghezza e l'altezza del rettangolo da disegnare.

const scaledCanvas = {
    width: canvas.width/4,
    height: canvas.height/4
}

const floorCollisions2D = [] //si crea una costante che è collegata ai dati immagazzinati nell'array collisions
for (let i = 0; i < floorCollisions.length; i += 36) { 
floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}//tutto questo crea un array 2D così che in questo arry gli 0 indicano lo spazio vuoto invece gli 202 indicano i blocchi di collisione


const collisionBlocks = []//creazione dei blocchi di collisione
floorCollisions2D.forEach((row, y) => {
row.forEach((symbol, x) => {
    if(symbol === 202) {
        console.log('draw a block here!')
        collisionBlocks.push(new CollisionBlock({position: {
            x: x * 16,
            y: y * 16,
        },}))
    }
    })
})

const platformCollisions2D = [] //si crea una costante che è collegata ai dati immagazzinati nell'array collisions
for (let i = 0; i < platformCollisions.length; i += 36) { 
platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

const platformCollisionBlocks = []//creazione dei blocchi di collisione
platformCollisions2D.forEach((row, y) => {
row.forEach((symbol, x) => {
    if(symbol === 202) {
        platformCollisionBlocks.push(new CollisionBlock({position: {
            x: x * 16,
            y: y * 16,
        },
        height: 4
    }))
    }
    })
})



const gravity = 0.1



// CREAZIONE GRAVITA'
//step 1(creare gravita' per far cadere il player sennò rimarrebbe sospeso nell'aria)
//step 2 (rendere la gravità realistica aumentando la velocità di caduta ad ogni frame)



const player = new Player({
    position: {
        x: 100,
        y: 300,
    },
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc: './img/warrior/Idle.png',
    frameRate: 8,
    animations: { 
        Idle: {  //animazione dell'attesa del comando
            imageSrc: './img/warrior/Idle.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        Run: {  //animazione della corsa
            imageSrc: './img/warrior/Run.png',
            frameRate: 8,
            frameBuffer: 5,
        },
        Jump: {  //animazione del salto
            imageSrc: './img/warrior/Jump.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        Fall: {  //animazione della caduta
            imageSrc: './img/warrior/Fall.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        FallLeft: {  //animazione della caduta a sinistra
            imageSrc: './img/warrior/FallLeft.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        RunLeft: {  //animazione della corsa a sinistra
            imageSrc: './img/warrior/RunLeft.png',
            frameRate: 8,
            frameBuffer: 5,
        },
        IdleLeft: {  //animazione dell'attesa del comando a sinistra
            imageSrc: './img/warrior/IdleLeft.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        JumpLeft: {  //animazione del salto a sinistra
            imageSrc: './img/warrior/JumpLeft.png',
            frameRate: 2,
            frameBuffer: 3,
        },
    }
})



const keys = { //tutti i tasti della tastiera che voglio "sentire"
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
}


const background = new Sprite({
    position:{
        x:0,
        y:0,
    },
    imageSrc: './img/background.png'
})

const backgroundImageHeight = 432


const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height,
    },
}


function animazione(){
    window.requestAnimationFrame(animazione)  //Il metodo window.requestAnimationFrame() dice al browser che desideri eseguire un'animazione.
    c.fillStyle = 'white' //il colore del canvas è di base nero
    c.fillRect(0, 0, canvas.width, canvas.height) 

    c.save() //guardare c.restore() per la spiegazione
    c.scale(4, 4) //ridimensioniamo l'immagine per adattarla al nostro formato
    c.translate(camera.position.x, camera.position.y) //ci permette di traslare l'immagine, perché all'inizio partiva dall'alto, ma per spostarla verso il basso abbiamo utilizzato il translate i cui valori tra parentesi indicavano le coordinate.
    background.update() // abbiamo inserito nell'animazione la nostra immagine
    //collisionBlocks.forEach(collisionBlock => {
        //collisionBlock.update()
    //})

    //platformCollisionBlocks.forEach(block => {
        //block.update()
    //})


    player.checkForHorizontalCanvasCollisions()
       player.update() //abbiamo inserito il nostro player che cade all'interno dell'animazione sopra scritta (update ne aggiorna la posizione facendolo cadere verso il basso)

    player.velocity.x = 0
    if(keys.d.pressed) { 
        player.switchSprite('Run')
        player.velocity.x = 2
        player.lastDirection = 'right'
        player.shouldPanCameraToTheLeft({ canvas, camera })

    } else if (keys.a.pressed) {
        player.switchSprite('RunLeft')
        player.velocity.x = -2
        player.lastDirection = 'left'
        player.shouldPanCameraToTheRight({canvas, camera })
    } else if (player.velocity.y === 0) {
        if (player.lastDirection === 'right') player.switchSprite('Idle')
            else player.switchSprite('IdleLeft')
    }


    if (player.velocity.y < 0) {
        player.shouldPanCameraDown({ camera, canvas })
        if (player.lastDirection === 'right') player.switchSprite('Jump')
        else player.switchSprite('JumpLeft')
    } else if (player.velocity.y > 0) {
        player.shouldPanCameraUp({ camera, canvas })
        if (player.lastDirection === 'right') player.switchSprite('Fall')
        else player.switchSprite('FallLeft')
}

    c.restore() //entrambi usati per applicare modifiche solo a ciò che contenuto tra c.save() e c.restore()
} 



window.addEventListener('keydown', (event) => {
    switch (event.key) {
    case 'd':
    keys.d.pressed = true //movimento a destra
    break
    case 'a':
    keys.a.pressed = true //movimento a sinistra
    break
    case 'w':
    player.velocity.y = -4 //salto
    break
    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
    case 'd':
    keys.d.pressed = false //movimento a destra
    break
    case 'a':
    keys.a.pressed = false //movimento a sinistra
    break
    }
})



animazione() //quando questa funzione viene chiamata nel codice permette alla funzione di andare in loop grazie al comando "window.requestAnimationframe" che rimanda alla funzione "animazione" grazie al fatto che contiene essa stessa all'interno delle parentesi.
