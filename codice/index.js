const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
//(avevi messo il tuo collegamento dello script non dentro al body)

canvas.width = 1024 //(canvas.width e .height) ridimensionamento del nostro canvas ad un ratio di 16:9
canvas.height = 576
//(c.fillRect) viene utilizzato per disegnare un rettangolo pieno. Con quattro parametri: le coordinate x e y e la larghezza e l'altezza del rettangolo da disegnare.



// CREAZIONE GRAVITA'
//step 1(creare gravita' per far cadere il player sennò rimarrebbe sospeso nell'aria)
//step 2 (rendere la gravità realistica aumentando la velocità di caduta ad ogni frame)

class Player { //Le classi sono un modello per creare oggetti.
    constructor(position){ //permette di identificare tutte le proprietà del nostro player
        this.position = position 
        
    }

    draw() {
        c.fillStyle = 'red' //colore dell'hitbox player
        c.fillRect = (this.position.x , this.position.y, 100, 100) //dimensione del player
        //nota n2= utilizziamo invece di inserire le coordinate manualmente, le coordinate definite nel constructor precedente con "this.position.x" e .y
    }

    //adesso però dobbiamo fargli cambiare le coordinate
    update(){
        this.draw() //(con .draw il nostro bel player comparirà)
        this.position.y++ // come in c++ i due + servono a causare un incremento singolo
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



function animazione(){
    window.requestAnimationFrame(animazione)  //Il metodo window.requestAnimationFrame() dice al browser che desideri eseguire un'animazione.
    c.fillStyle = 'white' //il colore del canvas è di base nero
    c.fillRect(0, 0, canva.width, canva.height) 
    player.update() //abbiamo inserito il nostro player che cade all'interno dell'animazione sopra scritta (update ne aggiorna la posizione facendolo cadere verso il basso)
    player2.update() // le sue coordinate vanno aggiornate altrimenti sarebbero sovrapposti visto che utilizziamo le stesse proprietà che possiede anche il player1

} 


animazione() //quando questa funzione viene chiamata nel codice permette alla funzione di andare in loop grazie al comando "window.requestAnimationframe" che rimanda alla funzione "animazione" grazie al fatto che contiene essa stessa all'interno delle parentesi.