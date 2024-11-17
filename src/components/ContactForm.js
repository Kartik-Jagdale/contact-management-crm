import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";

const ContactForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });

  // Populate form data for editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ // Reset form after submission
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      company: "",
      jobTitle: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {["firstName", "lastName", "email", "phoneNumber", "company", "jobTitle"].map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              name={field}
              label={field.replace(/([A-Z])/g, " $1").toUpperCase()}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              required={field === "email" || field === "firstName"}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? "Update Contact" : "Add Contact"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;

