import React, { useEffect, useState } from 'react'
// import  account from '../assets/user.png'
import  logo from  '../assets/logo.jpeg'
// import  cart from  '../assets/cart.png'
import  map from  '../assets/india.png'
import  handmade from  '../assets/hand-made.png'
import  delivery from  '../assets/free-delivery.png'
import  preservatives from  '../assets/no-preservatives.png'
// import  poster from  '../assets/poster.jpg'
import card from '../assets/card.jpeg'
import sweet from '../assets/sweet.jpeg'
import snacks from '../assets/namkeen.jpeg'
import thekua from '../assets/tekhua.jpeg'
import './Landing.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {  useNavigate } from 'react-router-dom'
import {getbanner} from '../Components/Allapi'
export const Landing = () => {

  const[poster , setPoster] = useState(null);


  useEffect ( () =>{
    const fetchPoster = async() =>{
      try{
        const res = await getbanner();
        
          if (res.data.banners && res.data.banners.length > 0) {
        let imagePath = res.data.banners[0].image;

        // Fix Windows backslashes
        // imagePath = imagePath.replace(/\\/g, "/");

        // Full URL (adjust if your backend is deployed)
        const fullUrl = `http://localhost:5000/${imagePath}`;

        setPoster(fullUrl);
      }

      }catch(err){
        console.log("error to fetch poster");
      }
    };
    fetchPoster();
  },[]);

  
const cards = [
  { id: 1, name: "Dry Fruits", key: "DryFruits", quantity: "22 Product", image: sweet },
  { id: 2, name: "Snacks", key: "Snacks", quantity: "10 Product", image: snacks },
  { id: 3, name: "Desi biscuits", key: "Desibiscuits", quantity: "15 Product", image: thekua },
  { id: 4, name: "Dry Fruits Sweets", key: "DryFruitsSweets", quantity: "25Product", image: card },
  { id: 5, name: "Sugarless Sweets", key: "SugarlessSweets", quantity: "30Product", image: card },
  { id: 6, name: "Festival Sweets", key: "FestivalSweets", quantity: "10Product", image: card },
];



const reviews = [
{
name: "Vaishali Mantri",
date: "02/08/2025",
review: "Divine Rajasthani Peda",
rating: 5,
img: snacks
},
{
name: "Manas Burad",
date: "02/08/2025",
review: "Excellent & quick service!",
rating: 5,
img: snacks},
{
name: "Amita Talwar",
date: "01/08/2025",
review: "Doodh Mithi Fini - 500gm",
rating: 5,
img: snacks},
{
name: "Vivek Malpani",
date: "31/07/2025",
review: "Superb Dal Kachori!",
rating: 5,
img: snacks},
{
name: "Amit Saxena",
date: "31/07/2025",
review: "Timely delivery, excellent!",
rating: 5,
img: snacks},
];


  const settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3, // show 3 cards at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
     { breakpoint: 1024, settings: { slidesToShow: 2 } }, // tablets/landscape
    { breakpoint: 768, settings: { slidesToShow: 1 } }, // phones
  ],
    
  };
  const setting = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4, // show 3 cards at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
       { breakpoint: 1280, settings: { slidesToShow: 3 } },
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

    const navigate = useNavigate(); 

  
  const handleFirstClick = (categoryKey) => {
  const normalizedKey = categoryKey.toLowerCase().replace(/\s+/g, "");

  navigate('/allproduct', { state: { selectedCategory: normalizedKey } });
};


  const handleSecondClick =() =>{
    navigate('/special');
  }
      
  

  return (
    <div>    
   {/* IMAGE SECTION */}
        <div className="home-container">

        {poster ? (
        <img src={poster} alt="poster" />
        ) : (   
        <p>Loading image...</p>
          )}
          <div className="content-container">
            <h1>Excellent in Every Biteof our Sweets,snacks And Treats</h1>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores ullam quas tenetur culpa sed minima dicta delectus nihil, hic magnam velit dignissimos ducimus. Inventore provident unde quia veniam labore dolor!</p>

          </div>

        </div>

        {/* END */}


   {/* Categorey Section */}

        <div className="categorey">

           <h1>Shop our Range</h1>

           <div className="slider-wrapper">


             <Slider {...settings}>
                {cards.map((item) => (
               <div key={item.id} className="card-slide" onClick={() => handleFirstClick(item.key)}>
                   <img src={item.image} alt={`card-${item.id}`} />
                <div className="card-info">
                  <h3>{item.name}</h3>
                 <p>{item.quantity}</p>
              </div>
               </div>
              ))}
             </Slider>
              </div>

            <div className="btn">
              <button onClick={() => handleFirstClick("all")} className='view-btn'>View All</button>
            </div>

        </div>

        {/* END */}

   {/* REVIEW-SECTION */}

        <div className="reivew-container">
          

          <div className="rvew1">
            <img src={map} alt="" />
            <h3>love by india</h3>
            <h3>love by 5lakh customer</h3>
          </div>
          <div className="rvew1">
            <img src={handmade} alt="" />
            <h3>love by india</h3>
            <h3>love by 5lakh customer</h3>
          </div>
          <div className="rvew1">
            <img src={delivery}alt="" />
            <h3>love by india</h3>
            <h3>love by 5lakh customer</h3>
          </div>
          <div className="rvew1">
            <img src={preservatives} alt="" />
            <h3>love by india</h3>
            <h3>love by 5lakh customer</h3>
          </div>
         


        </div>

        {/* End */}


    {/* GIFTING SECTION */}

        <div className="gift-container">
          <h1>Explore Our Premium Collection</h1>

         <div className="giftcard-container">

           <div className="giftcard"   onClick={() => handleFirstClick("gifting")}>
            <img src={card} alt="" />
            <h3>Sweet Gifting</h3>
          </div>
          <div className="giftcard"   onClick={() => handleFirstClick("gifting")}>
            <img src={card} alt="" />
            <h3>Dry Fruit Gifting</h3>
          </div>
          <div className="giftcard"   onClick={() => handleFirstClick("gifting")}>
            <img src={card} alt="" />
            <h3>Classical Gifting</h3>
          </div>
          <div className="giftcard"  onClick={() => handleFirstClick("gifting")}>
            <img src={card} alt="" />
            <h3>Guilt Free Gifting</h3>
          </div>

         </div>

        </div>

        {/* END */}

   {/* Speciality Section */}


        <div className="speciality-container">

          <div className="special-content">
            <h1>Our Speciality</h1>
            <h3>handmade sweet confesion that always get littile more.
            </h3>

            <button onClick={handleSecondClick}>See All</button>
          </div>

          <div className="special-img"  onClick={handleSecondClick}>
            <img src={card} alt="" />
            <img src={card} alt="" />
          </div>

        </div>

        {/* END */}

     {/* STORY SECTION */}

        <div className="story-container">

          <div className="story-img">

            <div className="img-up">
              <img src={poster} alt="" />
            </div>

            <div className="img-down">
              <img src={card} alt="" />
              <img src={card} alt="" />
            </div>

          </div>

          
            <div className="story-content">
               <h1>Our Story</h1>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus sequiiendis nihil animi voluptate? Laborum expedita ratione explicabo.</p>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ducimus qne quia nostrum quas et natus excepturi iusto saepe exercitationem nemo molestias? Cumque?</p>

            </div>
        </div>

     {/* Review Section */}

        <div className="customer-review">
             <h1>What Our Customer Says?</h1>
               <div className="review-wrapper">
             <Slider {...setting}>
               {reviews.map((item) => (

               <div className="review-card">
                <img src={item.img} alt={item.review} className="product-img" />
               <div className="stars">{"★".repeat(item.rating)}</div>
               <p className="review-text">{item.review}</p>
                <p className="reviewer">- {item.name}</p>
                <span className="date">{item.date}</span>
             </div>
                ))}
             </Slider>
              </div>
        </div>

    </div>
  )
}
