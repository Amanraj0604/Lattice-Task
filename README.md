# Lattice Task API

This API is created using Node.js, Express, and MongoDB for the Lattice Task project.

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables. Create a `.env` file in the root directory and add the following variables:

4. Start the server using `npm start`.

## Dependencies

- **Express:** A web application framework for Node.js.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a schema-based solution to model your application data.
- **Cors:** Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express apps.
- **Dotenv:** Loads environment variables from a `.env` file into `process.env`.

## Models

### Hospital Model

```javascript
const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
name: { type: String, required: true }
});

module.exports = mongoose.model('Hospitals', HospitalSchema);

```
Explanation: This model represents hospitals in the database. It has a single field name, which is of type string and is required

### Patient Model

```javascript
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    psychiatrist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Psychiatrist',
        required: true
    }
});

module.exports = mongoose.model('Patient', PatientSchema);
```
Explanation: This model represents patients in the database. It includes fields such as name, address, email, phone, password, photo, and psychiatrist. The psychiatrist field references the Psychiatrist model.

### Psychiatrist Model
```javascript
const mongoose = require('mongoose');

const PsychiatristSchema = new mongoose.Schema({
  name: {
     type: String,
     required: true 
    },
  hospital: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Hospital', 
     required: true }
});

module.exports = mongoose.model('Psychiatrist', PsychiatristSchema);
```
Explanation: This model represents psychiatrists in the database. It includes fields such as name and hospital. The hospital field references the Hospital model.


## API Endpoints

### Hospitals

- **POST http://localhost:5000/api/lattice/hospitals**: Create a new hospital by entring below type of data.
```javascript
{
    "name":"Apollo Hospitals"
}
```

### Patients

- **POST http://localhost:5000/api/lattice/patients**: Create a new patient. By entring Below details.
```javascript
{
        "name": "P dhanush",
        "address": "perundurai Erode Tamilnadu",
        "email": "pdhanujsh@gmail.com",
        "phone": "6202856878",
        "password": "Abc@12345",
        "photo": "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202305/from-i...",
        "psychiatrist": "664ed8e9f460883c89457a24"
}
```


### Psychiatrists

- **POST http://localhost:5000/api/lattice/psychiatrists**: Create a new psychiatrist by entering Below types of data.
```javascript
{
    "name":"Aman Raj",
    "hospitalId":"664c6beac67068132df4252f"
}
```


## API Documentation

You can test the API endpoints using Postman. Access the collection [here](https://lattice-task.postman.co/workspace/Lattice-Task-Workspace~49a73244-1314-47db-863c-a1e2eb6d329e/collection/26925006-e34791b7-ea72-44bd-aba2-a35d3c13568d?action=share&creator=26925006).