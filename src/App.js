import React, { useState, useRef, useEffect } from 'react';

const App = props => {
    const [songs, setSongs] = useState([
        { "id": 1, "category": "game", "name": "Mario Castle", "url": "files/mario/songs/castle.mp3" },
        { "id": 2, "category": "game", "name": "Mario Star", "url": "files/mario/songs/hurry-starman.mp3" },
        { "id": 3, "category": "game", "name": "Mario Overworld", "url": "files/mario/songs/overworld.mp3" },
        { "id": 4, "category": "game", "name": "Mario Stage 1", "url": "files/mario/songs/stage1.mp3" },
        { "id": 5, "category": "game", "name": "Mario Stage 2", "url": "files/mario/songs/stage2.mp3" },
        { "id": 6, "category": "game", "name": "Mario Star", "url": "files/mario/songs/starman.mp3" },
        { "id": 7, "category": "game", "name": "Mario Underworld", "url": "files/mario/songs/underworld.mp3" },
        { "id": 8, "category": "game", "name": "Mario Underwater", "url": "files/mario/songs/underwater.mp3" },
        { "id": 9, "category": "game", "name": "Zelda Castle", "url": "files/videogame/songs/zelda_castle.mp3" },
        { "id": 10, "category": "game", "name": "Zelda Outworld", "url": "files/videogame/songs/zelda_outworld.mp3" }, { "id": 11, "category": "game", "name": "Zelda Titles", "url": "files/videogame/songs/zelda_title.mp3" }, { "id": 11, "category": "game", "name": "Sonic Brain Zone", "url": "files/videogame/songs/sonic_brain-zone.mp3" },
        { "id": 11, "category": "game", "name": "Zelda Link To Past", "url": "files/videogame/songs/zelda_link-to-past.mp3" },
        { "id": 12, "category": "game", "name": "Dong KinKong Main", "url": "files/other/songs/dkng-main.mp3" },
        { "id": 13, "category": "game", "name": "Dong KinKong Other", "url": "files/other/songs/dkng-other.mp3" },
        { "id": 14, "category": "game", "name": "mega-man", "url": "files/other/songs/mega-man.mp3" },
        { "id": 15, "game": "cartoon", "name": "Flintstones", "url": "files/cartoons/songs/flintstones.mp3" },
        { "id": 16, "game": "cartoon", "name": "power-rangers", "url": "files/cartoons/songs/power-rangers.mp3" },
        { "id": 17, "game": "cartoon", "name": "simpsons", "url": "files/cartoons/songs/simpsons.mp3" },
        { "id": 18, "game": "cartoon", "name": "south-park", "url": "files/cartoons/songs/south-park.mp3" },
        { "id": 19, "game": "cartoon", "name": "thundercats", "url": "files/cartoons/songs/thundercats.mp3" },
        { "id": 20, "game": "cartoon", "name": "x-men", "url": "files/cartoons/songs/x-men.mp3" }
    ]);
    const [volume, setVolume] = useState(1);
    const [time, setTime] = useState(null);
    const [repeat, setRepeat] = useState(false);
    const [active, setActive] = useState(null);
    const [playing, setPlaying] = useState(false);

    let player = useRef()

    const setMusic = (url, i) => {
        player.src = "https://assets.breatheco.de/apis/sound/" + url;
        setActive(i)
        setPlaying(false);
    }

    const getBackward = () => {
        setMusic(songs[active - 1].url, active - 1)
    }

    const getForward = () => {
        setMusic(songs[active + 1].url, active + 1)
    }

    const setUpVolume = e => {
        setVolume(e.target.value);
        player.volume = volume;
    }

    const setShuffle = (arr) => {
        let songRandom = Math.floor(Math.random() * arr.length);
        setMusic(songs[songRandom].url, songRandom)
    }

    const setUpRepeat = () => {
        setRepeat(!repeat);
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 no-gutters">
                        <h1 className="text-danger">Media Play List</h1>

                        <ul className="list-group col-md-6" style={{ height: "300px", overflow: "auto" }}>
                            {
                                songs.length > 0 ?
                                    songs.map((song, i) => {
                                        return (
                                            <li key={i}
                                                className={"list-group-item list-group-item-action" + (active === i ? " active" : "")}
                                                style={{ "cursor": "pointer" }}
                                                onClick={() => setMusic(song.url, i)}>
                                                {i + 1} - {song.name} {active === i ? (<span>Time: {time}</span>) : ("")}
                                            </li>
                                        )
                                    })
                                    :
                                    (
                                        <li className="list-group-item list-group-item-action">Lista Vacia</li>
                                    )
                            }
                        </ul>
                        <div className="row no-gutters">
                            <div className="btn-group col-md-6" role="group" aria-label="Basic example">
                                <button className="btn btn-dark" onClick={() => setShuffle(songs)}>
                                    <i className="fa fa-random"></i>
                                </button>
                                <button className="btn btn-dark" onClick={() => setUpRepeat()}>
                                    <i className="fa fa-redo"></i>
                                </button>
                                <div className="btn-group dropup">
                                    <button type="button" className="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-volume-up"></i>
                                    </button>
                                    <div className="dropdown-menu bg-transparent border-0 p-2">
                                        <input type="range" min="0" max="1" step="0.1" orient="vertical" onChange={(e) => setUpVolume(e)} value={volume} />
                                    </div>
                                </div>

                                {/* <button className="btn btn-dark">
                                    <i className="fa fa-volume-down"></i>
                                </button>
                                <button className="btn btn-dark">
                                    <i className="fa fa-volume-up"></i>
                                </button> */}
                                <button type="button" className={"btn btn-dark" + (active === null || (active - 1) < 0 ? " disabled" : "")} disabled={active === null || (active - 1) < 0 ? true : false}
                                    onClick={getBackward}>
                                    <i className="fa fa-backward"></i>
                                </button>

                                {
                                    !playing ? (
                                        <button type="button" className={"btn btn-primary" + (active === null ? " disabled" : "")} disabled={active === null ? true : false} onClick={() => {
                                            setPlaying(true);
                                            player.play()
                                        }}><i className="fa fa-play"></i></button>
                                    ) : (
                                            <button type="button" className={"btn btn-warning" + (active === null ? " disabled" : "")} disabled={active === null ? true : false} onClick={() => {
                                                setPlaying(false);
                                                player.pause()
                                            }}><i className="fa fa-pause"></i></button>
                                        )
                                }
                                <button type="button" className={"btn btn-dark" + (active === null || (active + 1) >= songs.length ? " disabled" : "")} disabled={active === null || (active + 1) >= songs.length ? true : false}
                                    onClick={getForward}>
                                    <i className="fa fa-forward"></i>
                                </button>
                            </div>
                        </div>
                        <audio ref={(tagAudio) => player = tagAudio} src="" loop={repeat} onTimeUpdate={(e) => setTime(e.target.currentTime)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;