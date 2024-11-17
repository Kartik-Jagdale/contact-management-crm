import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import ContactForm from "./components/ContactForm";
import axios from "axios";
import ContactsTable from "./components/ContactsTable";
import { fetchContacts, createContact } from "./services/api";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null); // Track the contact being edited

  // Fetch all contacts on component load
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await fetchContacts();
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleAddContact = async (newContact) => {
    try {
      const response = await createContact(newContact);
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleEditContact = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    setEditingContact(contactToEdit); // Load contact into the form
  };

  const handleUpdateContact = async (updatedContact) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/contacts/${updatedContact.id}`,
        updatedContact
      );
      setContacts(
        contacts.map((contact) =>
          contact.id === updatedContact.id ? response.data : contact
        )
      );
      setEditingContact(null); // Reset editing state
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Contact Management
      </Typography>
      <ContactForm
        onSubmit={editingContact ? handleUpdateContact : handleAddContact}
        initialData={editingContact} // Pass data to the form for editing
      />
      <ContactsTable
        contacts={contacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />
    </Container>
  );
};

export default App;

