import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchContacts = () => API.get("/contacts");
export const createContact = (newContact) => API.post("/contacts", newContact);

