
import Navbar from '../components/Navbar';
import "./Edit.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


function Edit() {
    //parametros de la url
    const { id } = useParams();
    const navigate = useNavigate();

    const getPet = async () => {


        const token = localStorage.getItem("token");

        const response = await axios.get(
            `http://localhost:8000/api/pets/show/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        // Extraer correctamente según estructura del servidor
        const petData = response.data.pet;

        //trae los datos de la mascota y los guarda en el estado para que se muestren en los input
        setName(petData.name || "");
        setKind(petData.kind || "");
        setWeight(petData.weight || "");
        setAge(petData.age || "");
        setBreed(petData.breed || "");
        setLocation(petData.location || "");
        setDescription(petData.description || "");



    };

    //inputs, guarda los datos de las mascotas, se rellena al cargar la mascota y luego se vincula a los input
    const [name, setName] = useState("");
    const [kind, setKind] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [breed, setBreed] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    //cuando se cargue la página de editar, se traen los datos de la mascota del servidor
    useEffect(() => {
        if (id) {
            getPet();
        }
    }, [id]);

    const updatePet = async (e) => {

        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await axios.put(
                //actualizar datos
                `http://localhost:8000/api/pets/edit/${id}`,
                {
                    name,
                    kind,
                    weight,
                    age,
                    breed,
                    location,
                    description
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            Swal.fire({
                title: "Success",
                text: "Mascota actualizada correctamente",
                icon: "success"
            });

            navigate("/dashboard");

        } catch (error) {
            //error si no se pudo actualizar
            Swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error"
            });
        }

    };
    return (
        <div>
            <Navbar>
                <span>EDIT PET</span>
            </Navbar>
            <div className="container">
                <form className="form" onSubmit={updatePet}>
                    <label>Name</label>
                    <input type="text" name="name" value={name}
                        onChange={(e) => setName(e.target.value)} />

                    <label>Kind</label>
                    <input type="text" name="kind" value={kind}
                        onChange={(e) => setKind(e.target.value)} />

                    <label>Weight</label>
                    <input type="number" name="weight" value={weight}
                        onChange={(e) => setWeight(e.target.value)} />

                    <label>Age</label>
                    <input type="number" name="age" value={age}
                        onChange={(e) => setAge(e.target.value)} />

                    <label>Breed</label>
                    <input type="text" name="breed" value={breed}
                        onChange={(e) => setBreed(e.target.value)} />

                    <label>Location</label>
                    <input type="text" name="location" value={location}
                        onChange={(e) => setLocation(e.target.value)} />
                        
                    <label>Description</label>
                    <input type="text" name="description" value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    <div className="actions">
                        <button type="submit">
                            Save
                        </button>
                        <button type="button" onClick={() => navigate("/dashboard")}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;