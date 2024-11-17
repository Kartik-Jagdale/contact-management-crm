
# Contact Management System

This is a **Contact Management System** that allows users to manage contacts, including adding, viewing, editing, and deleting contact details. The application is built using **React** for the frontend, **Node.js/Express** for the backend, and **PostgreSQL** as the database.

## Setup Instructions

### 1. Install Dependencies

#### Backend (Node.js/Express)

- First, clone the repository:
  ```bash
  git clone https://github.com/yourusername/contact-management.git
  cd contact-management/contactmanbackend
  ```

- Install backend dependencies:
  ```bash
  npm install
  ```

#### Frontend (React)

- Navigate to the frontend directory:
  ```bash
  cd contact-management/contactmanfrontend
  ```

- Install frontend dependencies:
  ```bash
  npm install
  ```

### 2. Start the Backend

- Ensure PostgreSQL is running on your machine.
- Set up your PostgreSQL database and configure the connection in the `server.js` file (see below for the database schema).
- Start the backend server:
  ```bash
  cd contactmanbackend
  npm start
  ```
  The backend will run on `http://localhost:5000`.

### 3. Start the Frontend

- In a new terminal window, navigate to the frontend directory:
  ```bash
  cd contactmanfrontend
  npm start
  ```
  The frontend will run on `http://localhost:3000`.

### 4. Database Schema Setup

To set up the PostgreSQL database, create a database (e.g., `contacts`) and run the following SQL script:

```sql
-- Create the contacts table
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  phone_number VARCHAR(15),
  company VARCHAR(100),
  job_title VARCHAR(100)
);
```

### 5. Database Configuration

Make sure your database configuration in `server.js` is correct. Update the database connection parameters as per your setup.

```javascript
const pool = new Pool({
  user: 'postgres', // Your PostgreSQL user
  host: 'localhost',
  database: 'contacts', // Database name
  password: 'yourpassword', // Your password
  port: 5432,
});
```

## Overview of Project Functionality

This project allows you to:

1. **Add a Contact**: A user can fill out a form with contact details (first name, last name, email, phone number, company, job title). When submitted, the contact is added to the PostgreSQL database.
   
2. **View Contacts**: All contacts are displayed in a table with details such as name, email, phone number, company, and job title.

3. **Edit a Contact**: A user can click the "Edit" button next to a contact, which will populate the form with the contact's existing details. After editing the details, the user can save the updated contact back to the database.

4. **Delete a Contact**: A user can delete a contact from the system. This will remove the contact from the PostgreSQL database.

## Challenges Faced and Solutions Implemented

### 1. **Handling Null Values in Database**
   - Issue: Sometimes, data from the frontend was not being correctly inserted into the database, resulting in `null` values for required fields like email.
   - Solution: Ensured that the frontend always sends the form data correctly and that the backend validates the input to prevent null values in required fields like email.

### 2. **Duplicate Email Error**
   - Issue: When adding a new contact, a user might attempt to add a contact with an already existing email.
   - Solution: Added a check in the backend (`server.js`) to check if the email already exists before inserting a new contact. If the email already exists, a `400` error is returned with a message indicating that the email already exists.

   ```javascript
   const checkEmail = await pool.query('SELECT * FROM contacts WHERE email = $1', [email]);
   if (checkEmail.rows.length > 0) {
     return res.status(400).json({ error: 'Email already exists' });
   }
   ```


### 3. **Database Connection Issues**
   - Issue: There were issues with database connection in development, especially when PostgreSQL was not running.
   - Solution: Ensured that PostgreSQL was always running before trying to start the backend server, and implemented error handling to catch database connection issues.

---

## License

This project is licensed under the MIT License.




