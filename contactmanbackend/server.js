const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "contacts",
  password: "kartik123",
  port: 5432,
});

// Routes
app.get("/contacts", async (req, res) => {
  const result = await pool.query("SELECT * FROM contacts");
  res.json(result.rows);
});

app.post("/contacts", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  try {
    const checkEmail = await pool.query("SELECT * FROM contacts WHERE email = $1", [email]);
    if (checkEmail.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const newContact = await pool.query(
      "INSERT INTO contacts (first_name, last_name, email, phone_number, company, job_title) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [firstName, lastName, email, phoneNumber, company, jobTitle]
    );
    res.status(201).json(newContact.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.put("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  try {
    const updatedContact = await pool.query(
      "UPDATE contacts SET first_name = $1, last_name = $2, email = $3, phone_number = $4, company = $5, job_title = $6 WHERE id = $7 RETURNING *",
      [firstName, lastName, email, phoneNumber, company, jobTitle, id]
    );
    res.json(updatedContact.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error updating contact");
  }
});

app.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM contacts WHERE id = $1", [id]);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error deleting contact");
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
/*const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "contacts",
  password: "kartik123",
  port: 5432,
});

// Routes
app.get("/contacts", async (req, res) => {
  const result = await pool.query("SELECT * FROM contacts");
  res.json(result.rows);
});

app.post('/contacts', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

  // Check if the email already exists
  try {
    const checkEmail = await pool.query('SELECT * FROM contacts WHERE email = $1', [email]);
    if (checkEmail.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' }); // Return error if email exists
    }

    // Insert new contact if email is not found
    const newContact = await pool.query(
      'INSERT INTO contacts (first_name, last_name, email, phone_number, company, job_title) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [firstName, lastName, email, phoneNumber, company, jobTitle]
    );

    res.status(201).json(newContact.rows[0]); // Send the newly created contact as the response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  try {
    const updatedContact = await pool.query(
      'UPDATE contacts SET first_name = $1, last_name = $2, email = $3, phone_number = $4, company = $5, job_title = $6 WHERE id = $7 RETURNING *',
      [firstName, lastName, email, phoneNumber, company, jobTitle, id]
    );
    res.json(updatedContact.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error updating contact');
  }
});

app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error deleting contact');
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
*/
