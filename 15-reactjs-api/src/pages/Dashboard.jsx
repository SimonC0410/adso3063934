import Navbar from '../components/Navbar';
import "./Dashboard.css";
import Swal from "sweetalert2";

//lugar donde guardar las mascotas
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    //Delete
    const deletePet = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:8000/api/pets/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Mascota eliminada correctamente");
            
            // actualizar lista después de borrar
            getPets();
            
            Swal.fire({
                title: "Success",
                text: "Mascota eliminada correctamente",
                icon: "success"
            });

        } catch (error) {

            console.error("Error eliminando mascota:");
            
            let mensaje = "Error al eliminar la mascota";
            
            //si la mascota esta adoptada no se puede eliminar
            if (error.response?.status === 500 && error.response?.data?.message?.includes("foreign key")) {
                mensaje = "No puedes eliminar esta mascota porque tiene adopciones registradas";
            }
            
            Swal.fire({
                title: "Error",
                text: mensaje,
                icon: "error"
            });

        }

    };

    //Logout
    const handleLogout = async () => {

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:8000/api/logout",
                {},
                {
                    headers: {
                        // el valor después de Bearer es un token JWT o de sesión
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // borrar token
            localStorage.removeItem("token");

            //sweet alert
            Swal.fire({
                title: "Success",
                text: "Sesion cerrada correctamente!",
                icon: "success"
            });

            // ir al login
            navigate("/");

        } catch (error) {

            Swal.fire({
                title: "Error",
                text: "Error al cerrar sesión" + (error.response.data.message),
                icon: "error"
            });

        }

    };


    //lista de amscotas
    const [pets, setPets] = useState([]);
    const getPets = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8000/api/pets/list",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPets(response.data.pets || []);

        } catch (error) {

            console.error("Error al obtener mascotas:", error.response.data.message);

        }

    };

    //ejecuta la funcion cuando carga la pagina
    useEffect(() => {
        getPets();
    }, []);

    return (
        <div>
            <Navbar>
                <span>DASHBOARD</span>
            </Navbar>
            <div className="container">
                <div className='buttons'>
                    <button onClick={() => navigate("/add")}>➕ Pet</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <h2>Pet List</h2>
                <div className='List'>
                    <ul>
                        {pets.map((pet) => (

                            <li key={pet.id}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img src={`http://localhost:8000/images/${pet.image}`} alt="pet" />

                                    <div>
                                        <h3>{pet.name}</h3>
                                        <h4>{pet.description}</h4>
                                    </div>
                                </div>

                                <div className="actions">
                                    <button id='show' onClick={() => navigate(`/show/${pet.id}`)}>👁</button>
                                    <button id='edit' onClick={() => navigate(`/edit/${pet.id}`)}>✏</button>
                                    <button id='delete' onClick={() => deletePet(pet.id)}>🗑</button>
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;