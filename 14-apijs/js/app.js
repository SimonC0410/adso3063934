//All views (main)

const views = document.querySelectorAll('main')

// currentView
if (localStorage.getItem('currentView') !== null) {
    showView()
} else {
    localStorage.setItem('currentView', 0) //[0-4]
    showView()
}

// loginform (POST)
const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault()
    try {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        const response = await fetch('https://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await response.json()
        if (response.ok) {
            //console.log(data.message)
            Swal.fire({
                title: 'Congratulations!',
                text: data.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 2500
            })
            localStorage.setItem('authToken', data.token)
            localStorage.setItem('currentView', 1)
            showView()
        } else {
            //console.error(data.message)
            Swal.fire({
                title: 'Watch out!',
                text: data.message,
                icon: 'error',
            })
        }

    } catch (error) {
        console.error(error.message)
    }
})



//buttons & anchors
const btnLogout = document.querySelector('.btnLogout')
const btnAdd    = document.querySelector('.btnAdd')
const btnBacks  = document.querySelectorAll('.btnBack')
/* const btnLogin  = document.querySelector('.btnLogin')
const btnShows   = document.querySelector('.btnShow')
const btnEdits   = document.querySelector('.btnEdit')
const btnCancels = document.querySelectorAll('.btnCancel') */



btnLogout.addEventListener('click',() => {
    localStorage.removeItem('authToken')
    localStorage.setItem('currentView', 0)
    showView()
})

btnAdd.addEventListener('click',() => {
    localStorage.setItem('currentView', 2)
    showView()
})

btnBacks.forEach(element => {
    element.addEventListener('click',() => {
        localStorage.setItem('currentView', 1)
        showView()
    })
})
/* btnLogin.addEventListener('click',() => {
    currentView = 1
    showView()
})






btnShows.forEach(element => {
    element.addEventListener('click',() => {
        currentView = 3
        showView()
    })
})

btnEdits.forEach(element => {
    element.addEventListener('click',() => {
        currentView = 4
        showView()
    })
})

btnCancels.forEach(element => {
    element.addEventListener('click',() => {
        currentView = 1
        showView()
    })
})
*/



function showView() {
    views.forEach(element => {
        element.classList.remove('animateView')
        element.style.display = 'none'
    })

    views[localStorage.getItem('currentView')].classList.add('animateView')
    views[localStorage.getItem('currentView')].style.display = 'block'
}


showView()


