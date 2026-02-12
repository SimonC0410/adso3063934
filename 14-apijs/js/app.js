const views  = document.querySelectorAll('main')
let currentView = 0 //[0-4]

//buttons & anchors
const btnLogin = document.querySelector('.btnLogin')
btnLogin.addEventListener('click',() => {
    currentView = 1
    showView()
})

function showView(){
    views.forEach(element => {
        element.style.display = 'none'
    })
    views[currentView].style.display = 'block'
}

showView()