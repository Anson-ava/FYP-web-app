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
import TopBar from "./component/topBar";

function App() {
	const videoRef = useRef(null);
	const photoRef = useRef(null);

	const [hasStream, setHasStream] = useState(true);
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
			<TopBar />
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
					<button className="col-auto" onClick={takePhoto}>
						拍照
					</button>
					<button className="col-auto" onClick={closePhoto}>
						關閉
					</button>
				</div>
			</div>
			<div className={"result" + (hasPhoto ? "hasPhoto" : "")}>
				<canvas ref={photoRef}></canvas>
			</div>
		</div>
	);
}

export default App;
