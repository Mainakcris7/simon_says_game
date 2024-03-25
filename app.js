var color_arr_user = []
var color_arr_pc = []
var choices = ['green', 'red', 'yellow', 'blue']
var flag = true
var started = false
var level_count = 1

let boxes = document.querySelectorAll('.box')
let level = document.querySelector('h2')
let body = document.querySelector('body')
let startbtn = document.querySelector('button#start')
let restartbtn = document.querySelector('button#restart')

for (box of boxes) {
    box.addEventListener("click", function () {
        if (started) {   // If start button clicked?
            let element = this // The clicked box
            bounceAnimation(element)

            // Getting the 'id' of the clicked div to push
            let id = element.getAttribute('id')
            color_arr_user.push(id)

            for (let i = 0; i < color_arr_user.length; i++) {
                // If any of the guesses are false, FAILED
                if (color_arr_pc[i] != color_arr_user[i]) {
                    body.style.backgroundColor = 'red'
                    setTimeout(() => {
                        body.style.backgroundColor = 'white'
                    }, 200)
                    level.innerText = "Failed!"
                    let score_element = document.createElement('h3')
                    score_element.innerText = `Your score: ${(level_count - 1) * 10}`
                    score_element.style.textAlign = 'center'
                    level.insertAdjacentElement('afterend', score_element)
                    restartbtn.style.display = 'flex'
                    flag = false
                }
            }
            // if all the guesses are true and array length are same, go to next level
            if (color_arr_user.length == color_arr_pc.length && flag) {
                pickColor()
                color_arr_user = []
                level.innerText = `Level ${++level_count}`
                // flag = true
            }
        } else {
            alert("Please click on start!")
        }
    })
}

// On click bounce animation
function bounceAnimation(element) {
    element.style.transform = 'scale(1.05)';
    setTimeout(() => {
        element.style.transform = 'scale(1)'
    }, 200)
}

// Randomly choose a div by the computer
function pickColor() {
    setTimeout(() => {
        let rand = Math.floor(Math.random() * 4)
        color_arr_pc.push(choices[rand])
        let rand_div = document.getElementById(choices[rand])
        bounceAnimation(rand_div)
        console.log(choices[rand])
    }, 500)
}

// To start the game
startbtn.addEventListener('click', function () {
    let tutorial_p = document.querySelector('p#tutorial')
    tutorial_p.style.display = 'none'
    level.innerText = 'Level 1'
    setTimeout(() => {
        pickColor()
    }, 500)
    startbtn.style.display = "none";
    started = true
})

// To reset the state of the game
restartbtn.addEventListener('click', function () {
    // window.location.reload()
    let tutorial_p = document.querySelector('p#tutorial')
    tutorial_p.style.display = 'block'
    startbtn.style.display = "flex";
    restartbtn.style.display = 'none'
    let score_element = document.querySelector('h3')
    score_element.remove()
    level.innerText = ""
    color_arr_pc = []
    color_arr_user = []
    flag = true
    level_count = 1
    started = false
})