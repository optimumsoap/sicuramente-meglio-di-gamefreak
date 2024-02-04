const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
//purtroppo da un errore che non rileva la variabile nonostante sia uguale a quello del tizio

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canva.width, canva.height)