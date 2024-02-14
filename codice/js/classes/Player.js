class Player extends Sprite { //Le classi sono un modello per creare oggetti.
    constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 0.5, animations}){ //permette di identificare tutte le proprietà del nostro player
        super({ imageSrc, frameRate, scale }) //chiama gli altri constructor collegati
        this.position = position 
        this.velocity = {
            x: 0,
            y: 1,
        }
        
        this.collisionBlocks = collisionBlocks
        this.animations = animations
    }

    //adesso però dobbiamo fargli cambiare le coordinate
    update(){
        this.updateHitbox()
        this.updateFrame()

        //draws out the image
        c.fillStyle = 'rgba(0, 255, 0, 0.2)'
        c.fillRect(this.position.x, this.position.y, this.position.width, this.position.height)

        c.fillStyle = 'rgba(255, 0, 0, 0.2)'
        c.fillRect(this.hitbox.position.x,
            this.hitbox.position.y,
            this.hitbox.position.width,
            this.hitbox.position.height
            )


        this.draw() //(con .draw il nostro bel player comparirà)

        this.position.x += this.velocity.x //creazione di una variabile velocità così da permettere di cambiare più agilmente la velocità rispetto ad un semplice y++
        this.updateHitbox()
        this.checkForHorizontalCollisions()
       this.applyGravity()
       this.updateHitbox()
       this.checkForVerticalCollisions()
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 35,
                y: this.position.y + 26,
            },
            width: 14,
            height: 27
        }
    }

    checkForHorizontalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock
                })

                ) {
                if(this.velocity.x > 0) {
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width

                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }

                if(this.velocity.x < 0) {
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x

                    this.position.x = 
                    collisionBlock.position.x + collisionBlock.width - offset + 0.01
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
                    object1: this.hitbox,
                    object2: collisionBlock
                })

                ) {
                if(this.velocity.y > 0) {
                    this.velocity.y = 0

                    const offset = 
                    this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                }

                if(this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = 
                    this.hitbox.position.y - this.position.y

                    this.position.y = 
                    collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }
            }
        }
    }

}
