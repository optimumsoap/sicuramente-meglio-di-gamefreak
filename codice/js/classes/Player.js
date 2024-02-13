class Player extends Sprite { //Le classi sono un modello per creare oggetti.
    constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 0.5}){ //permette di identificare tutte le proprietà del nostro player
        super({ imageSrc, frameRate, scale }) //chiama gli altri constructor collegati
        this.position = position 
        this.velocity = {
            x: 0,
            y: 1,
        }
        
        this.collisionBlocks = collisionBlocks
    }

    //adesso però dobbiamo fargli cambiare le coordinate
    update(){
        this.updateFrame()
        c.fillStyle = 'rgba(0, 255, 0, 0.2)'
        c.fillRect(this.position.x, this.position.y, this.position.width, this.position.height)
        this.draw() //(con .draw il nostro bel player comparirà)

        this.position.x += this.velocity.x //creazione di una variabile velocità così da permettere di cambiare più agilmente la velocità rispetto ad un semplice y++
        this.checkForHorizontalCollisions()
       this.applyGravity()
       this.checkForVerticalCollisions()
    }

    checkForHorizontalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(
                collision({
                    object1: this,
                    object2: collisionBlock
                })

                ) {
                if(this.velocity.x > 0) {
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x - this.width - 0.01
                    break
                }

                if(this.velocity.x < 0) {
                    this.velocity.x = 0
                    this.position.x = 
                    collisionBlock.position.x + collisionBlock.width + 0.01
                    break
                }
            }
        }
    }


    applyGravity() {
        this.position.y += this.velocity.y
        this.velocity.y += gravity //valore della gravità
    }


    checkForVerticalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(
                collision({
                    object1: this,
                    object2: collisionBlock
                })

                ) {
                if(this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y - this.height - 0.01
                    break
                }

                if(this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.position.y = 
                    collisionBlock.position.y + collisionBlock.height + 0.01
                    break
                }
            }
        }
    }

}