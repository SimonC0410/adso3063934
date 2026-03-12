import { Navigate } from 'react-router-dom';

function PrivateRoute({ element }) {
    const token = localStorage.getItem('token');
    
    // Si existe token, muestra la página. Si no, redirige al login
    return token ? element : <Navigate to="/" />;
}

export default PrivateRoute;
