import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import "./Show.css";

import axios from "axios";
import { useEffect } from "react";
//para guardar la mascota
import { useState } from "react";
// para traer el id
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


function Show() {
    //parametros de la url
    const { id } = useParams();
    // estado para guardar la mascota
    const [pet, setPet] = useState({});
    //para navegar a la pagina anterior
    const navigate = useNavigate();

    const getPet = async () => {

        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:8000/api/pets/show/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Extraer la mascota de la respuesta y guardarla en el estado
            setPet(response.data.pet);


        } catch (error) {
            console.error("Error obteniendo mascota");
            Swal.fire({
                title: "error",
                text: "Error al cargar los datos de la mascota",
                icon: "error"
            });
        }

    };

    //ejecuta cuando se abre la pagina
    //obtiene la mascota por su id y la guarda en el estado
    useEffect(() => {
        if (id) {
            getPet();
        }
    }, [id]);
    return (
        <div>
            <Navbar>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '20px' }}>
                    <button className='btn-back' onClick={() => navigate(-1)}>←</button>
                    <span style={{ flex: 1, textAlign: 'center' }}>Show Pet</span>
                </div>
            </Navbar>
            <div className="container">
                <div className="foto">
                    <img src={`http://localhost:8000/images/${pet.image}`} alt="" />
                    <h3>{pet.name}</h3>
                </div>
                <div className="info">
                    <ul>
                        <li><strong>Kind:</strong> <span>{pet.kind}</span></li>
                        <li><strong>Weight:</strong> <span>{pet.weight}</span></li>
                        <li><strong>Age:</strong> <span>{pet.age}</span></li>
                        <li><strong>Breed:</strong> <span>{pet.breed}</span></li>
                        <li><strong>Location:</strong> <span>{pet.location}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Show;