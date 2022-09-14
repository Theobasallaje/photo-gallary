import React, { useEffect, useState } from "react";
import API from '../utils/api';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import "./Gallery.scss";

const Gallery = () => {

  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [fullScreenImg, setFullScreenImg] = useState({ result: '', i: 0 });

  const debounce = (func, delay) => {
    let debounceTimer
    return () => {
      const context = this
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(context), delay)
    }
  }

  useEffect(() => {
    API.getPhotos(page)
      .then((response) => response.json())
      .then((data) => {
        setResults(results.concat(data.results));
      })
      .catch((error) => console.log('Error: ', error));

    window.onscroll = function (ev) {
      if ((Math.ceil(window.innerHeight + window.scrollY)) >= document.body.offsetHeight) {
        debounce(setPage(page + 1), 3000);
      }
    };
  }, [page]);

  const viewImage = (result, i) => {
    setFullScreenImg({ result, i });
  }

  const handleFullScreenImgButtons = (action) => {
    let i = fullScreenImg.i;
    if (action === 'next-img') {
      setFullScreenImg({ result: results[i + 1], i: i + 1 })
    }
    if (action === 'prev-img') {
      setFullScreenImg({ result: results[i - 1], i: i - 1 })
    }
    if (action === 'close-img') {
      setFullScreenImg({ result: '', i: 0 })
    }
  }

  return (
    <div
      className='gallaryContainer'
    >
      {fullScreenImg.result &&
        <div className="fullScreenImgContainer">
          <button onClick={() => handleFullScreenImgButtons('close-img')} style={{ position: 'absolute', top: '10px', right: '10px' }}>X</button>
          {/* <button onClick={() => handleFullScreenImgButtons('prev-img')}>Previous</button> */}
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
          {/* <button onClick={() => handleFullScreenImgButtons('next-img')}>Next</button> */}
        </div>
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