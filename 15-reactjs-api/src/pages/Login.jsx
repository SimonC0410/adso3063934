import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
    // Estados para email y password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Enviar petición POST al backend con email y password
            const response = await axios.post(
                "http://localhost:8000/api/login",
                {
                    email,
                    password
                }
            );

            Swal.fire({
                title: "Success",
                text: response.data.message,
                icon: "success"
            });

            localStorage.setItem("token", response.data.token);

            navigate("/dashboard");

        } catch (error) {
            //si las credenciales son incorrectas
            if (error.response) {
                Swal.fire({
                    title: "Error",
                    text: error.response.data.message,
                    icon: "error"
                });
            }
        }
    };
    return (
        <div>
            <Navbar>
                <span>LOGIN</span>
            </Navbar>
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <label>Email</label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />

                    <label>Password</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit" >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;