/*import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

const ContactsTable = ({ contacts, onEdit, onDelete }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {["First Name", "Last Name", "Email", "Phone Number", "Company", "Job Title", "Actions"].map((col) => (
              <TableCell key={col}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              {["firstName", "lastName", "email", "phoneNumber", "company", "jobTitle"].map((field) => (
                <TableCell key={field}>{contact[field]}</TableCell>
              ))}
              <TableCell>
                <Button color="primary" onClick={() => onEdit(contact.id)}>
                  Edit
                </Button>
                <Button color="secondary" onClick={() => onDelete(contact.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactsTable;
*/

import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

const ContactsTable = ({ contacts, onEdit, onDelete }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {["First Name", "Last Name", "Email", "Phone Number", "Company", "Job Title", "Actions"].map((col) => (
              <TableCell key={col}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              {["first_name", "last_name", "email", "phone_number", "company", "job_title"].map((field) => (
                <TableCell key={field}>{contact[field]}</TableCell>
              ))}
              <TableCell>
                <Button color="primary" onClick={() => onEdit(contact.id)}>
                  Edit
                </Button>
                <Button color="secondary" onClick={() => onDelete(contact.id)} style={{ marginLeft: "10px" }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactsTable;

