import axios from "axios";

export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
    : false;

export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    let res = await axios.post(`http://localhost:8000/api/signin`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupReq = async ({ name, email, password, cPassword, userRole }) => {
  const data = { name, email, password, cPassword, userRole };
  try {
    let res = await axios.post(`http://localhost:8000/api/signup`, data);
    return res.data;
  } catch (error) {
    console.log("Signup error:", error);
    return { error: "Something went wrong while signing up." };
  }
};
