// import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import TopBar from "./component/topBar";
// import Content from "./component/content";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <TopBar />
//         <Content />
//       </div>
//     );
//   }
// }

// export default App;

import React, { useRef, useEffect, useState } from "react";

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1280, height: 720 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="App">
      <div className="Camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>拍照</button>
      </div>
      <div className={"result" + (hasPhoto ? "hasPhoto" : "")}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto}>關閉</button>
      </div>
    </div>
  );
}

export default App;
