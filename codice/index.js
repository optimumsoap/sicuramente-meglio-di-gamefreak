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

floorCollisions2D.forEach() =>

const gravity = 0.5

//Inserimento background con la creazione di una "class" in modo da inserire la nostra immagine che definiamo sprite
class Sprite {
    constructor({position, imageSrc}) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw(){
        if(!this.image) return //questo previene possibili errori nella console in caso l'immagine non venisse caricata propriamente
        c.drawImage(this.image, this.position.x, this.position.y ) //il primo punto indica l'immagine, il secondo le coordinate x e il terzo quelle y
    
    }

    update(){
        this.draw()
    }
}



// CREAZIONE GRAVITA'
//step 1(creare gravita' per far cadere il player sennò rimarrebbe sospeso nell'aria)
//step 2 (rendere la gravità realistica aumentando la velocità di caduta ad ogni frame)

class Player { //Le classi sono un modello per creare oggetti.
    constructor(position){ //permette di identificare tutte le proprietà del nostro player
        this.position = position 
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.height = 100
    }

    draw() {
        c.fillStyle = 'red' //colore dell'hitbox player
        c.fillRect(this.position.x , this.position.y, 100, this.height) //dimensione del player
        //nota n2= utilizziamo invece di inserire le coordinate manualmente, le coordinate definite nel constructor precedente con "this.position.x" e .y
    }

    //adesso però dobbiamo fargli cambiare le coordinate
    update(){
        this.draw() //(con .draw il nostro bel player comparirà)

        this.position.x += this.velocity.x //creazione di una variabile velocità così da permettere di cambiare più agilmente la velocità rispetto ad un semplice y++
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y < canvas.height) //funzione realistica di gravità aumentando la velocità sempre più mentre si cade
        this.velocity.y += gravity //valore della gravità
        else this.velocity.y = 0 //blocco della caduta quando si tocca la fine della pagina
    }
}

const player = new Player({
    x: 0,
    y: 0,
})
const player2 = new Player({
    x: 300,
    y: 100,
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


function animazione(){
    window.requestAnimationFrame(animazione)  //Il metodo window.requestAnimationFrame() dice al browser che desideri eseguire un'animazione.
    c.fillStyle = 'white' //il colore del canvas è di base nero
    c.fillRect(0, 0, canvas.width, canvas.height) 

    c.save() //guardare c.restore() per la spiegazione
    c.scale(4, 4) //ridimensioniamo l'immagine per adattarla al nostro formato
    c.translate(0, -background.image.height + scaledCanvas.height) //ci permette di traslare l'immagine, perché all'inizio partiva dall'alto, ma per spostarla verso il basso abbiamo utilizzato il translate i cui valori tra parentesi indicavano le coordinate.
    background.update() // abbiamo inserito nell'animazione la nostra immagine
    c.restore() //entrambi usati per applicare modifiche solo a ciò che contenuto tra c.save() e c.restore()
    player.update() //abbiamo inserito il nostro player che cade all'interno dell'animazione sopra scritta (update ne aggiorna la posizione facendolo cadere verso il basso)
    player2.update() // le sue coordinate vanno aggiornate altrimenti sarebbero sovrapposti visto che utilizziamo le stesse proprietà che possiede anche il player1

    player.velocity.x = 0
    if(keys.d.pressed)player.velocity.x = 5
    else if (keys.a.pressed) player.velocity.x = -5

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
    player.velocity.y = -15 //salto
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
