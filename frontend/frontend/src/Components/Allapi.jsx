

import API from './api';

export const signupUser = (name, email, password) =>
  API.post("/auth/signup", {   name, email,  password }); 

export const Loginuser = (email,password) =>
API.post("/auth/login",{  email , password},{ withCredentials: true });

export const Logout = (email,password) =>
API.post("/auth/logout",{},{ withCredentials: true });  //need to change logout api


export const getbanner = () =>
  API.get("/banners/getallbanner",{withCredentials:true});

export const getProductByCategory = (category,tag) =>
  API.get(`/product/category/${category}/${tag}`, { withCredentials: true });

export const getallproduct = ()=>
API.get("/product/allproducts");


export const addtocart = (productId, productData) => {
  
  return API.post(`/cart/addToCart/${productId}`,productData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};


export const getCart = ()=>
  API.get("/cart/getCartProduct", { withCredentials: true })

export const mergeCart = (productArray) =>
  API.post("/cart/mergecart", { productArray }, { withCredentials: true });


export const deletecart =(productId) =>
  API.delete(`/cart/deletecartproduct/${productId}`)


export const getspecialproduct = (category,tag) =>
  API.get(`/product/category/${category}/${tag}`, { withCredentials: true });