

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
  
  return API.post(`/cart/addtocart/${productId}`,productData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};


export const getCart = ()=>
  API.get("/cart/getcartproduct", { withCredentials: true })

export const mergeCart = (productArray) =>
  API.post("/cart/mergecart", { productArray }, { withCredentials: true });


export const deletecart =(productId) =>
  API.delete(`/cart/deletecartproduct/${productId}`)


export const getspecialproduct = (category,tag) =>
  API.get(`/product/category/${category}/${tag}`, { withCredentials: true });

// GET all addresses
export const getAddresses = () => API.get("/address/all");

// ADD new address
export const addNewAddress = (data) => API.post("/address/new", data);

// UPDATE address
export const updateAddress = (id, data) => API.put(`/address/update/${id}`, data);

// DELETE address
export const deleteAddress = (id) => API.delete(`/address/delete/${id}`);



export const createOrder = (data) =>
  API.post("/order/new", data, { withCredentials: true });

// Get all orders of current user
export const getAllOrders = () =>
  API.get("/order/all", { withCredentials: true });

// Get order user details by order ID
export const getOrderUserDetail = (orderId) =>
  API.get(`/order/userdetails/${orderId}`, { withCredentials: true });

// Get order product details by order ID
export const getOrderProductDetail = (orderId) =>
  API.get(`/order/productdetails/${orderId}`, { withCredentials: true });