import React, { useRef, useEffect, useState } from "react";

function Camera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasStream, setHasStream] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState();

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
    setHasStream(true);
  };

  const stopVideo = () => {
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

  const takePhoto = () => {
    const width = 420;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setPhotoURL(photo.toDataURL());
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  const onCameraUpload = (e) => {
    setHasPhoto(true);
    // const interval = setInterval(() => {
    //   if(hasPhoto)
    //     uploadCamera();
    // }, 1000)
    // return () => clearInterval(interval)

    // async function uploadCamera() {
    //   console.log("a");
    //   let res = await fetch("http://0.0.0.0:8000/camera/uploadcamera/", {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //     body: JSON.stringify({
    //       camera: photoURL,
    //     }),
    //   });
    //   let blob = await res.blob();
    //   let url = URL.createObjectURL(blob);
    //   setPhoto(url);
    // }
  };

  useEffect(() => {
    getVideo();
    const interval = setInterval(() => {
      takePhoto();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function uploadCamera() {
      let res = await fetch("http://0.0.0.0:8000/camera/uploadcamera/", {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        method: "POST",
        body: JSON.stringify({
          camera: photoURL,
        }),
      });
      let blob = await res.blob();
      let url = URL.createObjectURL(blob);
      setPhoto(url);
    }

    const interval = setInterval(() => {
      if(hasPhoto){
        uploadCamera()
      }
    }, 500);
    return () => clearInterval(interval);
  })

  return (
    <div className="App">
      <div className="Camera">
        <div className="grid grid-cols-2">
          <button className="col-auto" onClick={getVideo}>
            Stream
          </button>
          <button className="col-auto" onClick={stopVideo}>
            Stop
          </button>
        </div>
        <video ref={videoRef}></video>
        <div className="grid grid-cols-2">
          <button className="col-auto" onClick={onCameraUpload}>
            Take Photo
          </button>
          <button className="col-auto" onClick={closePhoto}>
            Close
          </button>
        </div>
      </div>
      <div>
        <img src={photo}></img>
      </div>
      <div hidden>
        <canvas ref={photoRef}></canvas>
      </div>
    </div>
  );
}

export default Camera;
