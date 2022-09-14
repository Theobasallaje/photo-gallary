import React, { useEffect } from "react";
import Gallery from "../components/Gallery";
import "./Home.scss";

const Home = () => {

  useEffect(() => {

  }, []);

  return (
    <div
      className='homeContainer'
    >
        <Gallery />
    </div>
  );
};

export default Home;