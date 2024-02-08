const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
//(avevi messo il tuo collegamento dello script non dentro al body)

canvas.width = 1024 //(canvas.width e .height) ridimensionamento del nostro canvas ad un ratio di 16:9
canvas.height = 576
//(c.fillRect) viene utilizzato per disegnare un rettangolo pieno. Con quattro parametri: le coordinate x e y e la larghezza e l'altezza del rettangolo da disegnare.

const gravity = 0.5


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

function animazione(){
    window.requestAnimationFrame(animazione)  //Il metodo window.requestAnimationFrame() dice al browser che desideri eseguire un'animazione.
    c.fillStyle = 'white' //il colore del canvas è di base nero
    c.fillRect(0, 0, canvas.width, canvas.height) 
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
