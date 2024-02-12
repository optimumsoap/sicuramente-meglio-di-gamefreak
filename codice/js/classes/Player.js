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