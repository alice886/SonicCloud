import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { getOneSong, getMySongs, deleteOneSong, addNewSong } from '../../store/song';
import { getMyAlbums } from '../../store/album';

function CreateSongForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
    const [albumId, setAlbumId] = useState();
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
        dispatch(getMyAlbums())
    }, [dispatch]);

    // const targetSong = useSelector(state => (state.song));
    const myAlbums = useSelector(state => Object.values(state.album));

    const albumSelected = async e => {
        e.preventDefault();
        setAlbumId(e.target.value);
    }

    const handleCreateSong = async e => {
        e.preventDefault();

        const payload = {
            albumId,
            title,
            description,
            url,
            previewImage
        };
        console.log('albumId---', albumId)
        console.log('payload---', payload)

        if (!title) alert('song title is required')
        if (!url) alert('Audio is required')

        let newSong = await dispatch(addNewSong(payload));

        // window.location.reload()
        if (newSong) {
            window.alert('new song created!');
            history.push(`/api/songs/mysongs/${newSong.id}}`);
        }
    }

    const handleCancel = e => {
        e.preventDefault();
        setHideEditForm(true);
    };

    return (
        <>
            {/* {targetSong && ( */}
            <div>
                <form hidden={false} id='new-song-form'>
                    <label>pick an album</label>

                    <select id="mydropdown" className="dropdown-content" onChange={albumSelected}>
                        {myAlbums && myAlbums.map(album => {
                            return <option key={album.id} value={album.id}>{album.name}</option>
                        })
                        }
                    </select>
                    <br></br>
                    <label>song title</label>
                    <input
                        type="text"
                        placeholder='name your song here'
                        min="2"
                        required
                        value={title}
                        onChange={updateTitle} />
                    <label>audio URL</label>
                    <input
                        type="text"
                        placeholder='add audio link here'
                        min="2"
                        value={url}
                        onChange={updateUrl} />
                    <label>image URL</label>
                    <input
                        type="text"
                        placeholder='add image link here'
                        value={previewImage}
                        onChange={updateImageUrl} />
                    <label>description:</label>
                    <input
                        type="text"
                        placeholder='add description here'
                        min="2"
                        value={description}
                        onChange={updateDescription} />
                    <div className="button-container" id='buttons'>
                        <button type='submit' onClick={handleCreateSong}>Upload</button>
                        <button type='button' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
            {/* )} */}
        </>
    );
}

export default CreateSongForm;
