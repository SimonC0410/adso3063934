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
        
        const data = await response.json();

        if (response.ok) {
            const petList = document.getElementById("petList");
            let pets = data;
            if (data.pets && Array.isArray(data.pets)) {
                pets = data.pets;
            } else if (data.data && Array.isArray(data.data)) {
                pets = data.data;
            } else if (!Array.isArray(data)) {
                pets = Object.values(data);
            }

            petList.innerHTML = "";
    
            pets.forEach(pet => {
                petList.innerHTML += `
                <div class="row">
                <div class="data">
                    <img src="http://127.0.0.1:8000/images/${pet.image}" alt="" onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='">
                    <div class="info">
                        <h3>${pet.name}</h3>
                        <h4>${pet.kind}: ${pet.breed}</h4>
                    </div>
                </div>
                <nav class="actions">
                    <a href="#" class="btn-show" data-pet-id="${pet.id}"></a>
                    <a href="#" class="btn-edit" data-pet-id="${pet.id}"></a>
                    <a href="#" class="btn-delete" data-pet-id="${pet.id}"></a>
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



// Add
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

// Edit button
const btnEditPet = document.querySelector('#edit button[type="button"]');
const editForm = document.querySelector('#edit form');

btnEditPet.addEventListener('click', async () => {
    const petId = editForm.dataset.petId;
    const formData = new FormData(editForm);
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
        const response = await fetch(`http://127.0.0.1:8000/api/pets/edit/${petId}`, {
            method: 'PUT',
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
                text: data.message || 'Pet updated successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 2500
            });
            // Volver al dashboard y recargar pets
            localStorage.setItem('currentView', 1);
            showView();
            loadPets();
        } else {
            Swal.fire({
                title: 'Error!',
                text: data.message || 'Failed to update pet',
                icon: 'error',
            });
        }
    } catch (error) {
        console.error('Error updating pet:', error);
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while updating the pet',
            icon: 'error',
        });
    }
});
/* btnLogin.addEventListener('click',() => {
    currentView = 1
    showView()
})
*/



// Event listener para botones
document.getElementById('petList').addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-show')) {
        const petId = e.target.getAttribute('data-pet-id');
        showPet(petId);
    }
    if (e.target.classList.contains('btn-edit')) {
        const petId = e.target.getAttribute('data-pet-id');
        editPet(petId);
    }
    if (e.target.classList.contains('btn-delete')) {
        const petId = e.target.getAttribute('data-pet-id');
        deletePet(petId);
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
            imgElement.src = `http://127.0.0.1:8000/images/${pet.image}`;
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



// Edit
async function editPet(petId) {
    if (isLoadingPet) return;
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

            // Cargar datos en el formulario de edición
            const editForm = document.querySelector('#edit form');  
            editForm.querySelector('input[name="name"]').value = pet.name;
            editForm.querySelector('input[name="kind"]').value = pet.kind;
            editForm.querySelector('input[name="weight"]').value = pet.weight;
            editForm.querySelector('input[name="age"]').value = pet.age;
            editForm.querySelector('input[name="breed"]').value = pet.breed;
            editForm.querySelector('input[name="location"]').value = pet.location;
            editForm.querySelector('textarea[name="description"]').value = pet.description;

            // Guardar el ID para usarlo en la actualización
            editForm.dataset.petId = petId;

            // Cambiar a la vista edit
            localStorage.setItem('currentView', 3);
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



// Delete
async function deletePet(petId) {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás recuperar esta mascota!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/pets/delete/${petId}`, {
                method: 'DELETE',
                headers: {
                    //'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire('Eliminado!', data.message, 'success');
                loadPets(); // Recargar lista
            } else {
                Swal.fire('Error!', data.message, 'error');
                loadPets();
            }
        } catch (error) {
            console.error('Error deleting pet:', error);
            Swal.fire('Error!', 'Ocurrió un error al eliminar la mascota', 'error');
        }
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


