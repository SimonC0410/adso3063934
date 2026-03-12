import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useState } from "react";
import "./Add.css";
import axios from "axios";
import Swal from "sweetalert2";

function Add() {
    const [name, setName] = useState("");
    const [kind, setKind] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [breed, setBreed] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");    

    const navigate = useNavigate();
    const storePet = async (e) => {

        e.preventDefault();

        // Validar que todos los campos requeridos tengan datos
        if (!name || !kind || !weight || !age || !breed || !location || !description) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son requeridos",
                icon: "error"
            });
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("name", name);
            formData.append("kind", kind);
            formData.append("weight", weight);
            formData.append("age", age);
            formData.append("breed", breed);
            formData.append("location", location);
            formData.append("description", description);

            const response = await axios.post(
                "http://localhost:8000/api/pets/store",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            Swal.fire({
                title: "Success",
                text: "Mascota agregada correctamente",
                icon: "success"
            });

            navigate("/dashboard");

        } catch (error) {

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
                <span>ADD PET</span>
            </Navbar>
            <div className="container">
                <form className="form" onSubmit={storePet}>
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
                            Add
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

export default Add;