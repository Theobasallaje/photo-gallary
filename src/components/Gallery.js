import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import API from '../utils/api';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import "./Gallery.scss";

const Gallery = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [color, setColor] = useState(searchParams.get('color'));
  const [orientation, setOrientation] = useState(searchParams.get('orientation'));
  const [results, setResults] = useState([]);
  const [fullScreenImg, setFullScreenImg] = useState({ result: '', i: 0 });
  const [showFilters, setShowFilters] = useState(true);
  const [filterButtonValue, SetFilterButtonValue] = useState('Filter');

  const debounce = (func, delay) => {
    let debounceTimer
    return () => {
      const context = this
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(context), delay)
    }
  }

  useEffect(() => {
    if (color) {
      document.getElementById('color').value = color;
      SetFilterButtonValue('Reset Filters');
    }

    if (orientation) {
      document.getElementById('orientation').value = orientation;
      SetFilterButtonValue('Reset Filters');
    }

    API.getPhotos(page, color !== '' && color, orientation !== '' && orientation)
      .then((response) => response.json())
      .then((data) => {
        setResults(results.concat(data.results));
      })
      .catch((error) => console.log('Error: ', error));

    window.onscroll = function (ev) {
      if ((Math.ceil(window.innerHeight + window.scrollY)) >= document.body.offsetHeight) {
        debounce(setPage(page + 1), 1000);
      }
    };
  }, [page, color, orientation, filterButtonValue]);

  const viewImage = (result, i) => {
    setFullScreenImg({ result, i });
    setShowFilters(false);
  }

  const handleFullScreenImgButtons = (action) => {
    let i = fullScreenImg.i;
    if (action === 'close-img') {
      setFullScreenImg({ result: '', i: 0 });
      setShowFilters(true);
    }
  }

  const handleSubmit = () => {
    if (filterButtonValue === 'Reset Filters') {
      document.getElementById('color').value = 'default';
      document.getElementById('orientation').value = 'default';
    }
  }

  return (
    <div
      className='galleryContainer'
    >
      {fullScreenImg.result &&
        <div className="fullScreenImgContainer">
          <button onClick={() => handleFullScreenImgButtons('close-img')} style={{ position: 'absolute', top: '10px', right: '10px' }}>X</button>
          <img
            className="fullScreenImg"
            key={fullScreenImg.i}
            src={fullScreenImg.result.urls.regular}
            alt={fullScreenImg.result.alt_description}
          />
          <div className="imgData">
            <p>Username: {fullScreenImg.result.user.username}</p>
            <p>Like Count: {fullScreenImg.result.likes}</p>
          </div>
        </div>
      }
      {showFilters &&
        <form className="filtersContainer">
          <h2>Filters:</h2>

          <label htmlFor="color">Choose a color:</label>

          <select name="color" id="color">
            <option defaultValue="default"></option>
            <option value="black_and_white">black and white</option>
            <option value="black">black</option>
            <option value="white">white</option>
            <option value="yellow">yellow</option>
            <option value="orange">orange</option>
            <option value="red">red</option>
            <option value="purple">purple</option>
            <option value="magenta">magenta</option>
            <option value="green">green</option>
            <option value="teal">teal</option>
            <option value="blue">blue</option>
          </select>

          <label htmlFor="orientation">Choose an orientation:</label>

          <select name="orientation" id="orientation">
            <option defaultValue="default"></option>
            <option value="landscape">landscape</option>
            <option value="portrait">portrait</option>
            <option value="squarish">squarish</option>
          </select>

          <input type="submit" id='filterButton' value={filterButtonValue} onClick={handleSubmit}></input>
        </form>
      }
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      >
        <Masonry>
          {results.map((result, i) => (
            <img
              className="thumbNailImg"
              key={i}
              src={`${result.urls.thumb}?w=248&fit=crop&auto=format`}
              alt={result.alt_description}
              onClick={() => viewImage(result, i)}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Gallery;