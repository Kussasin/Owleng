import React from "react";
import Sound from "react-sound";
import Przyklad from "./przyklad.mp3";

const PlaySound =(
    handleSongLoading,
    handleSongPlaying,
    handleSongFinishedPlayin
) => {
    return(
        <div>
            <Sound
                url={Przyklad}
                playStatus={Sound.status.PLAYING}
                playFromPosition={300}
                onLoading={handleSongLoading}
                onPlaying={handleSongPlaying}
                onFinishedPlaying={handleSongFinishedPlayin}
            />
        </div>
    );
};

export default PlaySound;