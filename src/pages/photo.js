import React, { useEffect, useState } from "react";
import "./photo.css";
import CloseIcon from "@material-ui/icons/Close";

import img1 from "../assets/Activity1.jpeg";
import img2 from "../assets/Activity2.png";
import img3 from "../assets/Activity3.jpeg";
import img4 from "../assets/Activity4.jpeg";
import { useSearchParams } from "react-router-dom";
import { log } from "@craco/craco/lib/logger";

function Photo() {
  // const photo = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [allPhotos, setAllPhotos] = useState([]);
  searchParam.get("id");
  // let data = [
  //   {
  //     id: 1,
  //     imgSrc: img1,
  //   },
  //   {
  //     id: 2,
  //     imgSrc: img2,
  //   },
  //   {
  //     id: 3,
  //     imgSrc: img3,
  //   },
  //   {
  //     id: 4,
  //     imgSrc: img4,
  //   },
  // ];
  const [model, setModel] = useState(false);
  const [tempimgSrc, setTempImgSrc] = useState("");

  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  async function getOldPhotos(i) {
    var param = parseInt(i.get("id")) * 2;
    do {
      let addRes = await fetch("http://0.0.0.0:8000/photo/add_pred/" + param, {
        method: "GET",
        cache: "no-cache",
      });
      let addBlob = await addRes.blob();
      const addObjectURL = URL.createObjectURL(addBlob);
      setAllPhotos(
        (allPhotos) => [
          ...allPhotos,
          {
            id: addObjectURL.split("blob:http://localhost:3000/")[1],
            imgSrc: addObjectURL,
          },
        ],
        []
      );
      let birdRes = await fetch("http://0.0.0.0:8000/photo/bird_pred/" + param, {
        method: "GET",
        cache: "no-cache",
      });
      let birdBlob = await birdRes.blob();
      const birdObjectURL = URL.createObjectURL(birdBlob);
      setAllPhotos(
        (allPhotos) => [
          ...allPhotos,
          {
            id: birdObjectURL.split("blob:http://localhost:3000/")[1],
            imgSrc: birdObjectURL,
          },
        ],
        []
      );
      param++;
    } while (param % 2 === 1);
  }

  useEffect(() => {
    getOldPhotos(searchParam);
  }, []);

  return (
    <>
      <div className={model ? "model open" : "model"}>
        <img src={tempimgSrc} />
        <CloseIcon onClick={() => setModel(false)} />
      </div>
      Click Image to Zoom In
      <div className="photo">
        {allPhotos.map((item, index) => {
          return (
            <div
              className="pics"
              key={index}
              onClick={() => getImg(item.imgSrc)}
            >
              {index === 0 ? "Prediction before Image Process" : ""}
              {index === 2 ? "Prediction after Image Process" : ""}
              <img src={item.imgSrc} style={{ width: "70%" }} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Photo;
