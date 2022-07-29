import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { getOneSong, deleteOneSong, editOneSong } from '../../store/song';

const EditSongModal = () => {
    const [showModal, setShowModal] = useState(false);
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
    }, [dispatch]);

    const targetSong = useSelector(state => (state.song));

    const handleDelete = async (e) => {
        e.preventDefault();
        const payload = {
            id: songId
        }

        let deleteSong = await dispatch(deleteOneSong(payload))
        history.push(`/songs/mysongs`);
        // push to history first then reload
        // window.location.reload();
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
        if (!url) alert('song url is required')
        let editSong = await dispatch(editOneSong(payload));
        console.log('what is payload.id', payload.id)
        console.log('what is id', songId)


        history.push(`/songs/${songId}`);
        if (editSong) {
            alert('song is now updated!')
            // history.go()
        }
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form hidden={hideEditform} id='song-form'>
                        <label>Song Id: {targetSong.id}</label>
                        <label>Song name: {targetSong.title}</label>
                        <label>new title</label>
                        <input
                            type="text"
                            placeholder={targetSong.title}
                            min="2"
                            required
                            value={title}
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
                            <button type='button' onClick={() => setShowModal(false)}>Cancel Edit</button>
                            <button type='button' onClick={handleDelete}>Delete Song</button>
                        </div>
                    </form>
                </Modal>
            )
            }
        </>
    )

}

export default EditSongModal;
