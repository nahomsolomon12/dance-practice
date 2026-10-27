import { useEffect, useState } from "react";
import "./App.css";

const videoSets = [
  {
    id: "all-videos",
    label: "All videos",
    videos: [
      "https://www.tiktok.com/player/v1/7513801599102323998",
      "https://www.tiktok.com/player/v1/7630470654885940502",
      "https://www.tiktok.com/player/v1/7699116692764577046",
      "https://www.tiktok.com/player/v1/7659971767296953622",
    ],
  },
  {
    id: "tigrigna",
    label: "Tigrigna",
    videos: ["https://www.tiktok.com/player/v1/7513801599102323998"],
  },
  {
    id: "american-habesha",
    label: "American + habesha",
    videos: ["https://www.tiktok.com/player/v1/7630470654885940502"],
  },
  {
    id: "oromigna",
    label: "Oromigna",
    videos: ["https://www.tiktok.com/player/v1/7699116692764577046"],
  },
  {
    id: "miscellaneous",
    label: "Miscellaneous",
    videos: ["https://www.tiktok.com/player/v1/7659971767296953622"],
  },
];

function Icon({ name }) {
  const paths = {
    play: <path d="m9 6 9 6-9 6V6Z" />,
    pause: (
      <>
        <path d="M8 6v12M16 6v12" />
      </>
    ),
    refresh: (
      <path d="M20 11a8 8 0 0 0-14.7-3.9L4 9m0 0V4m0 5h5M4 13a8 8 0 0 0 14.7 3.9L20 15m0 0v5m0-5h-5" />
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      {paths[name]}
    </svg>
  );
}

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [videoSetId, setVideoSetId] = useState(videoSets[0].id);
  const [videoIndex, setVideoIndex] = useState(0);

  const selectedVideoSet =
    videoSets.find(({ id }) => id === videoSetId) ?? videoSets[0];
  const videos = selectedVideoSet.videos;

  useEffect(() => {
    if (!isRunning) return undefined;
    const interval = window.setInterval(
      () => setSeconds((value) => value + 1),
      1000,
    );
    return () => window.clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  const hasPreviousVideo = videoIndex > 0;
  const hasNextVideo = videoIndex < videos.length - 1;

  return (
    <main className="practice">
      <div className="video-wrap">
        <label className="video-set-select">
          <span>Video set</span>
          <select
            value={videoSetId}
            onChange={(event) => {
              setVideoSetId(event.target.value);
              setVideoIndex(0);
            }}
          >
            {videoSets.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <div className="video-frame">
          <button
            className="video-nav previous"
            type="button"
            disabled={!hasPreviousVideo}
            onClick={() => setVideoIndex((value) => value - 1)}
            aria-label="Previous video"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <iframe
            src={videos[videoIndex]}
            title="Dance practice video"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
          <button
            className="video-nav next"
            type="button"
            disabled={!hasNextVideo}
            onClick={() => setVideoIndex((value) => value + 1)}
            aria-label="Next video"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      <section className="timer" aria-label="Practice timer">
        <div className="timer-display">
          {minutes}:{remainingSeconds}
        </div>
        <div className="timer-controls">
          <button
            className="timer-button"
            type="button"
            onClick={() => setIsRunning((value) => !value)}
          >
            <Icon name={isRunning ? "pause" : "play"} />
            <span className="sr-only">
              {isRunning ? "Pause timer" : "Start timer"}
            </span>
          </button>
          <button
            className="reset-button"
            type="button"
            onClick={() => {
              setSeconds(0);
              setIsRunning(false);
            }}
          >
            <Icon name="refresh" />
            <span className="sr-only">Reset timer</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
