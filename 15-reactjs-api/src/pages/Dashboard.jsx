import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchPets } from '../services/petService';
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPetsData();
  }, []);

  const fetchPetsData = async () => {
    try {
      const data = await fetchPets();
      console.log('Data from API:', data);
      const petsArray = Array.isArray(data) ? data : (data.data || data.pets || []);
      console.log('Pets array:', petsArray);
      setPets(petsArray);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  return (

    <div>
      <Navbar>
        <i className="ph ph-user-circle navbar-icon"></i>
        <span>Dashboard</span>
      </Navbar>
      <div className="dashboard">

        <div className="top-buttons">
          <button className="btn-pet">
            ➕ Pet
          </button>

          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <h2 className="title">Pet List</h2>

        <div className="pets-list">
          {(
            pets.map(pet => (
              <div key={pet.id || Math.random()} className="pet-card">
                <img src={pet.image} alt="pet" className="pet-img"/>

                <div className="pet-info">
                  <h3>{pet.name}</h3>
                  <p>{pet.description}</p>
                </div>

                <div className="pet-actions">
                  <button className="view">
                    🤓
                  </button>

                  <button className="edit">
                    🖊️
                  </button>

                  <button className="delete">
                    🗑️
                  </button>
                </div>
              </div>
            )
            )
          )}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;