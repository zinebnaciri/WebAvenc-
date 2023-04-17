import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ZoneManagementComponent = () => {
const [zones, setZones] = useState([]);
const [zoneName, setZoneName] = useState('');
const [zoneCity, setZoneCity] = useState('');
const [zoneId, setZoneId] = useState('');
const [showModal, setShowModal] = useState(false);
const [cities, setCities] = useState([]);
useEffect(() => {
fetchZones();
}, []);
const fetchZones = async () => {
try {
const response = await axios.get('/api/zone/all');
setZones(response.data);
} catch (error) {
console.error(error);
}
};
const handleInputChange = (event) => {
const { name, value } = event.target;
if (name === 'nom') {
setZoneName(value);
} else if (name === 'ville') {
setZoneCity(value);
}
};
const handleAddZone = async () => {
try {
const response = await axios.post('/api/zone/save', { name:
zoneName, city: zoneCity });
setZones([...zones, response.data]);
setShowModal(false);
} catch (error) {
console.error(error);
}
};
const handleEditZone = async (id) => {
try {
const response = await axios.put(`/api/zone/${id}`, { name:
zoneName, city: zoneCity });
const updatedZones = zones.map((zone) => {
if (zone.id === id) {
return response.data;
}
return zone;
});
setZones(updatedZones);
setShowModal(false);
} catch (error) {
console.error(error);
}
};
const handleDeleteZone = async (id) => {
try {
await axios.delete(`/api/zone/${id}`);
const updatedZones = zones.filter((zone) => zone.id !== id);
setZones(updatedZones);
} catch (error) {
console.error(error);
}
};
const handleOpenModal = (zone) => {
if (zone) {
setZoneId(zone.id);
setZoneName(zone.name);
setZoneCity(zone.city);
} else {
setZoneId('');
setZoneName('');
setZoneCity('');
}
setShowModal(true);
};
const handleCloseModal = () => {
setShowModal(false);
};
return (
<div>
<h1>Zone Management</h1>
<button className="btn btn-primary mb-3" onClick={() =>
handleOpenModal()}>
Add Zone
</button>
<table className="table">
<thead>
<tr>
<th>Name</th>
<th>City</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{zones.map((zone) => (
<tr key={zone.id}>
<td>{zone.name}</td>
<td>{zone.city.name}</td>
<td>
<button className="btn btn-secondary me-2"
onClick={() => handleOpenModal(zone)}>
Edit
</button>
<button className="btn btn-danger"
onClick={() => handleDeleteZone(zone.id)}>
Delete
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
)
};
export default ZoneManagementComponent;