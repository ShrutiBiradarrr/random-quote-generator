import React, { useState, useEffect } from "react";
import axios from "axios";
import bg from './img/i3.jpeg';
import bg1 from './img/i1.jpeg';
import bg2 from './img/i2.jpeg';
import bg3 from './img/i4.jpeg';

const App = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);
  const [bgimg, setbgimg] = useState(bg);
  const [images, setimages] = useState([bg,bg1,bg2,bg3]);
  const [store, setstore] = useState([])
  useEffect(() => {
    getQuote();
    // setInterval(() => {
    //     getQuote();
    // }, 5000);
  }, []);




  const getQuote = async () => {
    try {
      setLoading(true);
      const q = await axios.get("https://api.adviceslip.com/advice");
      setAdvice(q.data.slip.advice);

      //store the privious quotes and generated quote
      setstore([...store, q.data.slip.advice]);

      //set random bg image 
      const randomNumber = Math.floor(Math.random() * 4); // generates a random integer from 0 to 3
      setbgimg(images[randomNumber]); 
      
      setLoading(false);
    } 
    catch (error) {
      setLoading(false);
      console.log("Error");
    }

};

    

  

  return (
    <>
     
      <div className="flex flex-col h-screen justify-between "  style={{background: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 className="bg-black text-white text-center p-3 text-lg mb-2">
          Motivation Quote Generator
        </h1>
        <div className="">
          <div className="">
            {loading ? (
              <h1>loading</h1>
            ) : (
            //   
             store.map((adv, index)=>{
                return <h1 className="text-center text-white text-4xl font-medium">{adv}</h1>
             })

            )}
            {/* <button onClick={getQuote}>click me</button> */}
          </div>
          <div className="flex items-center justify-center mt-5 animate-pulse">
            <button className="text-white font-medium p-3 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500" onClick={getQuote}>Load Another
            </button>
          </div>
        </div>
        <h5 className="bg-purple-300 text-black-100 text-center py-2 flex-row">
          <span>
            Made With<span className="animate-bounce">❤️By Shruti</span>{" "}
          </span>
        </h5>
      </div>
      
    </>
  );
};

export default App;
