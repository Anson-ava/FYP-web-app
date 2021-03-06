import React, { useRef, useEffect, useState } from "react";
import "./camera.css";

function Camera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasStream, setHasStream] = useState(false);
  const [detectFlag, setDetectFlag] = useState(false);
  const [cameraImgURL, setCameraImgURL] = useState(null);
  const [resPhoto, setResPhoto] = useState();

  const getCamera = () => {
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
    setHasStream(true);
  };

  const stopCamera = () => {
    if (hasStream) {
      let video = videoRef.current;
      let stream = video.srcObject;
      let tracks = stream.getTracks();

      tracks.forEach(function (track) {
        track.stop();
      });

      video.srcObject = null;
      setHasStream(false);
    }
  };

  const takeCameraImg = () => {
    const width = 1280;
    const height = 720;

    let video = videoRef.current;
    let cameraImg = photoRef.current;

    cameraImg.width = width;
    cameraImg.height = height;

    let ctx = cameraImg.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setCameraImgURL(cameraImg.toDataURL());
  };

  const stopDetection = () => {
    let cameraImg = photoRef.current;
    let ctx = cameraImg.getContext("2d");
    ctx.clearRect(0, 0, cameraImg.width, cameraImg.height);
    setDetectFlag(false);
  };

  const startDetection = () => {
    setDetectFlag(true);
  };

  useEffect(() => {
    async function uploadCamera() {
      let res = await fetch("http://0.0.0.0:8000/camera/uploadcamera/", {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        method: "POST",
        body: JSON.stringify({
          camera: cameraImgURL,
        }),
      });
      let blob = await res.blob();
      let url = URL.createObjectURL(blob);
      setResPhoto(url);
    }

    const interval = setInterval(() => {
      takeCameraImg();
      if (detectFlag) {
        uploadCamera();
        window.scrollTo(0, document.body.scrollHeight);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      <div className="Camera">
        <button className="stream" onClick={getCamera}>
          Stream
        </button>
        <button className="stop" onClick={stopCamera}>
          Stop
        </button>

        <div className={hasStream ? "grid grid-cols-2" : "hidden"}>
          <button className="startdetect" onClick={startDetection}>
            Start Detection
          </button>
          <button className={detectFlag ? "stopdetect" : "hidden"} onClick={stopDetection}>
            Stop Detection
          </button>
        </div>
        <video ref={videoRef}></video>
      </div>
      <div className={resPhoto ? "detect" : "hidden"}>
        Detection Result:
        <img src={resPhoto}></img>
      </div>
      <div hidden>
        <canvas ref={photoRef}></canvas>
      </div>
    </div>
  );
}

export default Camera;
