import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory, Redirect } from "react-router-dom";
import { getOneSong, getMySongs, deleteOneSong, addNewSong } from '../../store/song';
import { getMyAlbums } from '../../store/album';

function CreateSongForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [albumId, setAlbumId] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setAudioUrl] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState();
    const [showModal, setShowModal] = useState(false);

    const updateTitle = e => setTitle(e.target.value);
    const updateDescription = e => setDescription(e.target.value);
    const updateUrl = e => setAudioUrl(e.target.value);
    const updateImageUrl = e => setPreviewImage(e.target.value);

    useEffect(() => {
        dispatch(getMyAlbums())
    }, [dispatch]);

    const myAlbums = useSelector(state => Object.values(state.album));
    // const targetSong = useSelector(state => (state.song));
    // firstAlbumVal = Object.values(myAlbums)[0]?.id;
    // console.log('firstAlbumVal ---', firstAlbumVal)

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

        if (!title) {
            setErrors([]);
            return dispatch(addNewSong({ albumId, title, description, url, previewImage }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data?.errors) setErrors(data.errors);
                });

        };

        let newSong = await dispatch(addNewSong(payload));
        if (newSong) {
            window.alert('new song created!');
            history.push(`/songs/mysongs`);
        }
    }

    // console.log('hello errors--- ', errors);
    // console.log('hello album default--- ', albumId);

    return (
        <>
            <form id='new-song-form' onClose={() => setShowModal(false)}>
                <ul>
                    {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <br></br>
                <label>pick an album</label>
                <select id="mydropdown" className="dropdown-content" onChange={albumSelected} >
                    <option value='' selected disabled hidden> Choose your album</option>
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
                    <button type='button' onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default CreateSongForm;
