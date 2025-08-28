

import API from './api';

export const Loginuser = (email,password) =>
API.post("/auth/login",{ Email: email ,Password: password});


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