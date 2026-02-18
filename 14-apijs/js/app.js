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

        const response = await fetch('http://127.0.0.1:8000/api/login', {
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
            loadPets()
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


/* Listar  */
async function loadPets() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/pets/list', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Data received:', data);

        if (response.ok) {
            const petList = document.getElementById("petList");
            console.log('petList element:', petList);
            let pets = data;
            if (data.pets && Array.isArray(data.pets)) {
                pets = data.pets;
            } else if (data.data && Array.isArray(data.data)) {
                pets = data.data;
            } else if (!Array.isArray(data)) {
                pets = Object.values(data);
            }
            console.log('Pets array:', pets);

            petList.innerHTML = "";
    
            //<img src="http://127.0.0.1:8000/storage/images/${pet.image}" alt="" onerror="this.src='img/default-pet.png'">
            pets.forEach(pet => {
                petList.innerHTML += `
                    <div class="row">
                        <div class="data">
                            <h3>${pet.name}</h3>
                            <h4>${pet.kind}: ${pet.breed}</h4>
                        </div>
                        <nav class="actions">
                            <a href="#" class="btn-show" data-pet-id="${pet.id}"></a>
                            <a href="#" class="btn-edit"></a>
                            <a href="#" class="btn-delete"></a>
                        </nav>
                    </div>
                `;
            });
        } else {
            Swal.fire({
                title: 'Error to load pets!',
                text: data.message,
                icon: 'error',
            })
        }

    } catch (error) {
        console.error('Error in loadPets:', error.message);
    }
}

if (localStorage.getItem('currentView') == 1) {
    loadPets()
}





//buttons & anchors
const btnLogout = document.querySelector('.btnLogout')
const btnAdd = document.querySelector('.btnAdd')
const btnBacks = document.querySelectorAll('.btnBack')
const btnAddPet = document.querySelector('#add button[type="button"]') // Botón Add en el formulario de add
const addForm = document.querySelector('#add form') // Formulario de add
/* const btnLogin  = document.querySelector('.btnLogin')
const btnShows   = document.querySelector('.btnShow')
const btnEdits   = document.querySelector('.btnEdit')
const btnCancels = document.querySelectorAll('.btnCancel') */

let isLoadingPet = false; // Flag para evitar múltiples cargas simultáneas



btnLogout.addEventListener('click', () => {
    localStorage.removeItem('authToken')
    localStorage.setItem('currentView', 0)
    showView()
})

btnAdd.addEventListener('click', () => {
    localStorage.setItem('currentView', 2)
    showView()
})

btnBacks.forEach(element => {
    element.addEventListener('click', () => {
        localStorage.setItem('currentView', 1)
        showView()
    })
})



// Event listener para el botón Add
btnAddPet.addEventListener('click', async () => {
    const formData = new FormData(addForm);
    const petData = {
        name: formData.get('name'),
        kind: formData.get('kind'),
        weight: formData.get('weight'),
        age: formData.get('age'),
        breed: formData.get('breed'),
        location: formData.get('location'),
        description: formData.get('description')
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/api/pets/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(petData)
        });

        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: data.message || 'Pet added successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 2500
            });
            // Limpiar el formulario
            addForm.reset();
            // Volver al dashboard y recargar pets
            localStorage.setItem('currentView', 1);
            showView();
            loadPets();
        } else {
            Swal.fire({
                title: 'Error!',
                text: data.message || 'Failed to add pet',
                icon: 'error',
            });
        }
    } catch (error) {
        console.error('Error adding pet:', error);
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while adding the pet',
            icon: 'error',
        });
    }
});
/* btnLogin.addEventListener('click',() => {
    currentView = 1
    showView()
})
*/



// Event listener para botones show en la lista de pets
document.getElementById('petList').addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-show')) {
        const petId = e.target.getAttribute('data-pet-id');
        showPet(petId);
    }
});






/*
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



// Show
async function showPet(petId) {
    if (isLoadingPet) return; // Evitar múltiples cargas
    isLoadingPet = true;
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/pets/show/${petId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            const pet = data.pet || data; 

            const imgElement = document.querySelector('#show .imagen img');
            imgElement.src = `http://127.0.0.1:8000/storage/images/${pet.image}`;
            imgElement.onerror = () => imgElement.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
            const tableHTML = `
                <tr>
                    <th>Name</th>
                    <td>${pet.name}</td>
                </tr>
                <tr>
                    <th>Kind</th>
                    <td>${pet.kind}</td>
                </tr>
                <tr>
                    <th>Weight</th>
                    <td>${pet.weight}</td>
                </tr>
                <tr>
                    <th>Age</th>
                    <td>${pet.age}</td>
                </tr>
                <tr>
                    <th>Breed</th>
                    <td>${pet.breed}</td>
                </tr>
                <tr>
                    <th>Location</th>
                    <td>${pet.location}</td>
                </tr>
            `;
            document.querySelector('#show table').innerHTML = tableHTML;

            // Cambiar a la vista show
            localStorage.setItem('currentView', 4);
            showView();
        } else {
            Swal.fire({
                title: 'Error!',
                text: data.message || 'Failed to load pet details',
                icon: 'error',
            });
        }
    } catch (error) {
        console.error('Error loading pet details:', error);
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while loading pet details',
            icon: 'error',
        });
    } finally {
        isLoadingPet = false;
    }
}



function showView() {
    views.forEach(element => {
        element.classList.remove('animateView')
        element.style.display = 'none'
    })

    views[localStorage.getItem('currentView')].classList.add('animateView')
    views[localStorage.getItem('currentView')].style.display = 'block'
}


showView()


