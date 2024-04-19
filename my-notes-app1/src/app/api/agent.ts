import axios, { AxiosError, AxiosResponse } from "axios";
import { Note } from "../../Interfaces/Note";

const baseURL = 'http://localhost:8080/api';

const agent = {
  Notes: {
    list: async (): Promise<Note[]> => {
      return axios.get(`${baseURL}/notes`).then(responseBody);
    },
    details: async (id: number): Promise<Note> => {
      return axios.get(`${baseURL}/notes/${id}`).then(responseBody);
    },
    create: async (formData: FormData) => {
      console.log(formData);
      return axios.post(`${baseURL}/notes`, formData, {
        headers: { 'Content-Type': 'application/json' }
      }).then(responseBody);
    },
    update: async (id: number, formData: FormData) => {
      return axios.put(`${baseURL}/notes/${id}`, formData, {
        headers: { 'Content-Type': 'application/json' }
      }).then(responseBody);
    },
    delete: async (id: number) => {
      return axios.delete(`${baseURL}/notes/${id}`).then(responseBody);
    },
  },
  // ... other agent groups as needed 
};

// Error handling 
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // ... handle errors
  }
);

export default agent;
