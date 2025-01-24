import React, { useRef, useState } from "react";
import "./App.css";

const App = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event) => {
    videoRef.current.currentTime = event.target.value;
  };

  const handleSpeedChange = (event) => {
    const speed = parseFloat(event.target.value);
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  return (
    <div className="video-player">
      <h1>Video Player</h1>
      <div className="video-container">
        <video
          ref={videoRef}
          width="640"
          height="360"
          onTimeUpdate={(e) => console.log("Current time:", e.target.currentTime)}
        >
          <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="controls">
          <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
          <label>
            Speed:
            <select value={playbackSpeed} onChange={handleSpeedChange}>
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </label>
          <label>
            Volume:
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
          </label>
          <button onClick={handleFullScreen}>Full Screen</button>
        </div>
      </div>
    </div>
  );
};

export default App;
