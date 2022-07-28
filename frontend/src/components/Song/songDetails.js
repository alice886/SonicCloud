import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { getOneSong, deleteOneSong, editOneSong } from '../../store/song';

function SongDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setAudioUrl] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [hideEditform, setHideEditForm] = useState(true);

    const updateTitle = e => setTitle(e.target.value);
    const updateDescription = e => setDescription(e.target.value);
    const updateUrl = e => setAudioUrl(e.target.value);
    const updateImageUrl = e => setPreviewImage(e.target.value);

    useEffect(() => {
        dispatch(getOneSong(songId))
    }, [dispatch, songId]);

    const targetSong = useSelector(state => (state.song));

    const handleDelete = async (e) => {
        e.preventDefault();
        const payload = {
            id: songId
        }
        // console.log('id??', payload.id)

        let deleteSong = await dispatch(deleteOneSong(payload))
        history.push(`/songs/mysongs`); // push to history first then reload
        window.location.reload();
        if (deleteSong) {
            alert(`song is now deleted`)
        }
    }

    const handleEdit = async e => {
        e.preventDefault();

        const payload = {
            id: songId,
            title,
            description,
            url,
            previewImage
        };
        if (!title) alert('song title is required')
        let editSong = await dispatch(editOneSong(payload));

        window.location.reload()
        if (editSong) {
            history.push(`/api/songs/mysongs/${songId}}`);
        }
    }

    const handleCancel = e => {
        e.preventDefault();
        setHideEditForm(!hideEditform);
    };

    return (
        <>
            {targetSong && (
                <div>
                    <h2>{targetSong.name}</h2>
                    <img src={targetSong.previewImage} alt={targetSong.title} width="200" height="200" />
                    <br></br>
                    <audio src="http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3" controls>
                        {/* <audio src="https://www.computerhope.com/jargon/m/example.mp3" controls> */}
                        {/* <p>Fallback content goes here.</p> */}
                    </audio>
                    <br></br>
                    {/* <iframe width="187" height="105" src="https://www.youtube.com/embed/BnasLOCpTEs" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                    <h3>{targetSong.title}</h3>
                    <h4>Artist: {targetSong?.Artist?.username}</h4>
                    <h4>Album: <NavLink to={`/albums/${targetSong?.Album?.id}`}>{targetSong?.Album?.name}</NavLink></h4>
                    {/* <h3>audio url id: {targetSong.url}</h3> */}
                    <h4>Description: {targetSong.description}</h4>
                    <button onClick={() => setHideEditForm(!hideEditform)}> See Details/Edit </button>
                    <form hidden={hideEditform} id='song-form'>
                        <label>Song Id:</label>
                        <input
                            type="text"
                            placeholder={targetSong.id}
                            value={targetSong.id}
                            disabled={true}
                        />
                        <label>title:</label>
                        <input
                            type="text"
                            placeholder={targetSong.title}
                            min="2"
                            required
                            value={targetSong.title}
                            onChange={updateTitle} />
                        <label>audio URL</label>
                        <input
                            type="text"
                            placeholder={targetSong.url}
                            min="2"
                            value={url}
                            onChange={updateUrl} />
                        <label>image URL</label>
                        <input
                            type="text"
                            placeholder={targetSong.previewImage}
                            value={previewImage}
                            onChange={updateImageUrl} />
                        <label>description:</label>
                        <input
                            type="text"
                            placeholder='edit description here'
                            min="2"
                            value={description}
                            onChange={updateDescription} />
                        <div className="button-container" id={targetSong.id}>
                            <button type='submit' onClick={handleEdit}>Update</button>
                            <button type='button' onClick={handleCancel}>Cancel Edit</button>
                            <button type='button' onClick={handleDelete}>Delete Song</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default SongDetails;
