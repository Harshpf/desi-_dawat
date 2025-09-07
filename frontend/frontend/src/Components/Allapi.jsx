

import API from './api';

export const signupUser = (name, email, password) =>
  API.post("/auth/signup", {   name, email,  password }); 

export const Loginuser = (email,password) =>
API.post("/auth/login",{  email , password},{ withCredentials: true });

// export const Logout = (email,password) =>
// API.post("/auth/logout",{  email , password},{ withCredentials: true });  //need to change logout api


export const getProductByCategory = (category) =>
  API.get(`/product/category/${category}`, { withCredentials: true });

export const getallproduct = ()=>
API.get("/product/getallproduct");


export const addtocart = (productId, productData) => {
  
  return API.post(`/cart/addToCart/${productId}`,productData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};


export const getCart = ()=>
  API.get("/cart/getCartProdut", { withCredentials: true })

export const deletecart =(productId) =>
  API.delete(`/cart/deleteCartProduct/${productId}`)


export const getspecialproduct = (category) =>
  API.get(`/product/category/${category}`, { withCredentials: true });