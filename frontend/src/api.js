import axios from "axios";

//Create an Axios instance with the backend URL.
//This avoids repeating "http://127.0.0.1:8000" in each call.
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

//Calls the POST /ask endpoint with a JSON { question: string }.
//Returns only the "answer" property of the JSON response.
export const askAgent = async (question) => {
  // we build the body of the request
  const payload = { question };
  // we make the HTTP call
  const res = await API.post("/ask", payload);
  //extract the answer
  return res.data.answer;
};
