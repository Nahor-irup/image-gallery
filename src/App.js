import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_KEY } from "./config/constants";

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [tempImageList, setTempImageList] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`)
      .then((response) => {
        setImageList(response.data);
        setTempImageList(response.data);
      });
  }, []);

  const searchImage = (query) => {
    if (query === "") {
      setImageList(tempImageList);
    }else{
      const filtredImgae = imageList.filter((image) => {
        image.alt_description =
          image.alt_description === null
            ? "React Image"
            : image.alt_description;
        return image.alt_description.toLowerCase().includes(query);
      });
      setImageList(filtredImgae);
    }
  };
  return (
    <div>
      <div className="searchBarDiv">
        <input
          type="text"
          placeholder="Search here..."
          className="searchBar"
          onChange={(e) => searchImage(e.target.value)}
        />
      </div>
      <div className="container">
        {/* <img src={imageList[0].urls.regular} style={{height:"500px",width:"100%",objectFit:"cover"}}/> */}
        {imageList.map((image, index) => {
          return (
            <div className="imgDiv" key={index}>
              <img
                src={image.urls.regular}
                alt={image.alt_description}
                className="imgBlock"
              />
              <h3 className="buttom-left">
                {image.alt_description
                  ? image.alt_description.substring(0, 10).toUpperCase()
                  : "React Image"}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
