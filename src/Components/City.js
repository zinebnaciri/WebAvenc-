import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const City = () => {
    // État pour stocker la liste des cities
    const [cities, setCities] = useState([]);

    const [cityName, setCityName] = useState('');
    const [cityId, setCityId] = useState(''); 

    // Fonction pour récupérer la liste des cities depuis le backend
    const fetchCities = async () => {
        try {
            const response = await axios.get('api/ville/all');
            setCities(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    //getById
const getCityById = async (id) => {
    try {
    const response = await axios.get(`/api/ville/${id}`);
    setCityId(response.data.id);
    setCityName(response.data.name);
    } catch (error) {
    console.error(error);
    }
   }; 
   //AddCity
   const addCity = async () => {
    try {
    const response = await axios.post('/api/ville/save', { name: cityName });
    setCities([...cities, response.data]);
    setCityName('');
    } catch (error) {
    console.error(error);
    }
   }; 

  
   //delete
   const deleteCity = async (id) => {
    try {
    await axios.delete(`/api/ville/delete/${id}`);
    const updatedCities = cities.filter((city) => city.id !== id);
    setCities(updatedCities);
    } catch (error) {
    console.error(error);
    }
   };
   //update 
   const updateCity = async () => {
    try {
    const response = await axios.put(`/api/ville/update/${cityId}`, { name: cityName });
    const updatedCities = cities.map((city) => {
    if (city.id === response.data.id) {
    return response.data;
    }
    return city;
    });
    setCities(updatedCities);
    setCityId('');
    setCityName('');
    } catch (error) {
    console.error(error);
    }
   }
    useEffect(() => {
        fetchCities();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Cities</h1>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">City Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cities.map((city, index) => (
                        <tr key={city.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{city.nom}</td>
                            <td>
                                <button className="btn btn-primary btn-sm mx-1" onClick={() =>
                                    getCityById(city.id)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() =>
                                    deleteCity(city.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-3">
                <input
                    type="text"
                    className="form-control mr-2 d-inline-block"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                />
                {cityId ? (
                    <button className="btn btn-success" onClick={updateCity}>
                        Update City
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={addCity}>
                        Add City
                    </button>
                )}
            </div>
        </div>
    );
};

export default City;