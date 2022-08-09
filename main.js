// Defining Variables

var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

const WIDTH = 700,
    HEIGHT = 500,
    CELL_SIZE = 25,
    COLOUR = {"EMPTY_CELL": "#b0b0b0", "GRID_COLOUR": "#383838",
                "START": "#80eb34", "END": "#f0aa41", "WALL": "#1a1a1a"}

let cells = []
let mousex = 0
let mousey = 0
let mousedown = false
let currentSelect = COLOUR["EMPTY_CELL"]
let startPoints = 1
let endPoints = 1

canvas.width = WIDTH
canvas.height = HEIGHT

// Assining initial values

for (let x = 0; x < WIDTH; x += CELL_SIZE){

    let row = []

    for (let y = 0; y < HEIGHT; y += CELL_SIZE){
        // id, xpos, ypos, fillColour
        row.push({id: x + y, xpos: x, ypos: y, colour: COLOUR["EMPTY_CELL"]})
    }

    cells.push(row)
}

// Functions

function draw(){
    if (mousedown){
        changeCell(mousex, mousey)
    }
    drawBoard()
}

function drawBoard(){

    for (let x = 0; x < cells.length; x++){
        for (let y = 0; y < cells[x].length; y++){

            // Fill each cell by their current value    

            let cell = cells[x][y]

            ctx.fillStyle = cell.colour
            ctx.fillRect(cell.xpos, cell.ypos, CELL_SIZE, CELL_SIZE)

            ctx.strokeStyle = COLOUR["GRID_COLOUR"]
            ctx.strokeRect(cell.xpos, cell.ypos, CELL_SIZE, CELL_SIZE)


        }
    }
}

function changeCell(locationx, locationy){

    let xRounded = Math.floor(locationx / CELL_SIZE)
    let yRounded = Math.floor(locationy / CELL_SIZE)

    for (let x = 0; x < cells.length; x++){
        for (let y = 0; y < cells[x].length; y++){
            if (x == xRounded && y == yRounded){


                if (currentSelect == COLOUR["START"] && startPoints > 0){
                    cells[x][y].colour = currentSelect
                    startPoints --
                }
                else if (currentSelect == COLOUR["END"] && endPoints > 0){
                    cells[x][y].colour = currentSelect
                    endPoints --
                }
                else if (currentSelect == COLOUR["WALL"]){
                    if (cells[x][y].colour != COLOUR["START"] && cells[x][y][3] != COLOUR["END"]){
                        cells[x][y].colour = currentSelect
                    }
                }
                else if (currentSelect == COLOUR["EMPTY_CELL"]){
                    if (cells[x][y].colour == COLOUR["START"]){
                        startPoints ++
                    } else if (cells[x][y].colour == COLOUR["END"]){
                        endPoints ++
                    }
                    cells[x][y].colour = currentSelect
                }

            }
        }
    }
}

function triggerStart(){
    currentSelect = COLOUR["START"]
}

function triggerEnd(){
    currentSelect = COLOUR["END"]
}

function triggerWall(){
    currentSelect = COLOUR["WALL"]
}

function erase(){
    currentSelect = COLOUR["EMPTY_CELL"]
}

function runSolution(){
    console.log("Running Solution")
    console.log(cells)
}

function main(){
    if (mousedown){
        draw()
    }
}


window.addEventListener("mousedown", e => {
    mousedown = true
    let rect = canvas.getBoundingClientRect()
    mousex = e.clientX - rect.left
    mousey = e.clientY - rect.top
    
    draw()
})

window.addEventListener("mouseup", e => {
    mousedown = false
})

window.addEventListener('mousemove', e => {
    let rect = canvas.getBoundingClientRect()
    mousex = e.clientX - rect.left
    mousey = e.clientY - rect.top

    draw()

})

draw()