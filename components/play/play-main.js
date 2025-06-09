import { useState } from "react";
import MusicPlay from "../../components/play/music/music-play";
import classes from "./play-main.module.css";

export default function PlayMain() {
  const [activeTab, setActiveTab] = useState("music");

  const tabs = [{ id: "music", label: "🎵 음악 추천기" }];

  return (
    <div className={classes.container}>
      <div className={classes.tabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${classes.tab} ${activeTab === tab.id ? classes.activeTab : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={classes.contents}>
        <div className={classes.content}>{activeTab === "music" && <MusicPlay />}</div>
      </div>
    </div>
  );
}
