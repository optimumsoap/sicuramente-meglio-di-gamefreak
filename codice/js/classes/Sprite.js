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
