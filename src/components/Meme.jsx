/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
function Meme() {
  const initialState = {
    topText: "",
    bottomText: "",
    randomImage:
      "https://th.bing.com/th/id/R.e9e06362172b5f946a548245e6ee1b82?rik=V0Eh%2bH5Q%2b85xhA&riu=http%3a%2f%2fimages7.memedroid.com%2fimages%2fUPLOADED860%2f5c6e0e4fc64e3.jpeg&ehk=0RtEB6Weqr2AAGymx1cMgSKLmyzTclUf7Gp62adUj70%3d&risl=&pid=ImgRaw&r=0",
  };
  const [meme, setMeme] = useState(initialState);
  const [memeImages, setMemeImages] = useState([]);
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setMemeImages(data.data.memes));
  }, []);

  const getRandomMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * memeImages.length);
    const newUrl = memeImages[randomNumber].url;
    setMeme((prevState) => ({
      ...prevState,
      randomImage: newUrl,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeme((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className='meme-container'>
      <div className='meme-controls'>
        <div className='input-container'>
          <div className='inputed'>
            <input
              type='text'
              placeholder='top text ?'
              className='meme-text'
              name='topText'
              id=''
              value={meme.topText}
              onChange={handleChange}
            />
          </div>
          <input
            type='text'
            placeholder='bottom text ?'
            className='meme-text'
            name='bottomText'
            id=''
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <div className='img-container'>
          <img className='meme-images' src={meme.randomImage} alt='' />
        </div>
      </div>
      <div>
        <button className='new-btn' onClick={getRandomMemeImage}>
          Get new Image 📟
        </button>
      </div>
      <h1 className='top-text'>{meme.topText}</h1>
      <h1 className='bottom-text'>{meme.bottomText}</h1>
    </div>
  );
}

export default Meme;
