import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from 'react-router-dom';
import { getAllSongs } from '../../store/song'
import bg from '../../images/sunrise.jpeg'
import { getUserDetail } from '../../store/user'
import LoginForm from '../LoginFormModal/LoginForm'

const TestUserHome = ({ playing, setPlaying }) => {
    const dispatch = useDispatch();
    const [played, setPlayed] = ('false')
    const [homesongloaded, setHomesongloaded] = useState(false)
    const [ppbutton, setPPbutton] = useState('▶')
    const sessionUser = useSelector(state => state.session.user);
    const allsongs = useSelector(state => Object.values(state.song))

    useEffect(() => {
        dispatch(getAllSongs()).then(()=>setHomesongloaded(true))
    }, [dispatch])


    const handleHomePlay = async e => {
        e.preventDefault();
        await setPlaying(e.target.value);
        let homePlayer = document.getElementById('botton-player-bar');
        if (played === 'true') {
            homePlayer.pause();
            setPPbutton('▶');
            setPlayed('false');
        }
        else {
            homePlayer.load();
            homePlayer.play();
            setPPbutton('||');
            setPlayed('true');
        }
    }

    // const ppbutton = played ?'❚ ❚':'▶'

    return homesongloaded && (
        <div id='home-middle'>
            {sessionUser ? (
                <div className='public-home'>
                    <h2 className='public-greeting'>Welcome back {sessionUser?.username}! </h2>
                    <img className="landing-pic" src={bg}></img>
                </div>
            ) : (
                <div className='public-home'>
                    <h2 className='public-greeting'>Welcome to SonicCloud! </h2>
                    <img className="landing-pic" src={bg}></img>
                </div>

            )}
            <div className="all-home-song-container">
                {allsongs && allsongs.map((song) => {
                    return <div className="eachhomesong" key={song.id}>
                            <img src={song.previewImage} width='150' ></img>
                            <button className="home-songplay-button" value={song.url} onClick={handleHomePlay} >▶</button>
                        <div className='home-song-title'>
                            <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                        </div>

                    </div>
                })}

            </div>

        </div>
    )
}

export default TestUserHome;
