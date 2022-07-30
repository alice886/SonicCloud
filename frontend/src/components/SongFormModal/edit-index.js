import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { getOneSong, deleteOneSong, editOneSong } from '../../store/song';
import { getMyAlbums } from '../../store/album';

const EditSongModal = ({ targetSong }) => {

    const dispatch = useDispatch();
    const { songId } = useParams();
    const history = useHistory();
    const [title, setTitle] = useState(targetSong?.title);
    const [albumId, setAlbumId] = useState('');
    const [description, setDescription] = useState(targetSong?.description);
    const [url, setUrl] = useState(targetSong?.url);
    const [previewImage, setPreviewImage] = useState(targetSong?.previewImage);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);

    const myAlbums = useSelector(state => Object.values(state.album));

    const updateTitle = e => setTitle(e.target.value);
    const updateAlbum = e => setAlbumId(e.target.value);
    const updateDescription = e => setDescription(e.target.value);
    const updateUrl = e => setUrl(e.target.value);
    const updateImageUrl = e => setPreviewImage(e.target.value);

    useEffect(() => {
        dispatch(getOneSong(songId))
    }, [dispatch, title, albumId, description, url, previewImage, showModal, errors]);

    useEffect(() => {
        dispatch(getMyAlbums())
    }, [dispatch]);


    // console.log('target song is ---', targetSong)
    // console.log('target song name is ---', targetSong?.title)
    // console.log('target song img is ---', targetSong?.previewImage)


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

    const closeModal = () => setShowModal(false);

    // const handleCancel = async e => {
    //     e.preventDefault();
    //     errors.reset();
    // }

    const handleEdit = async e => {
        e.preventDefault();

        const payload = {
            ...targetSong,
            id: songId,
            title,
            albumId,
            description,
            url,
            previewImage
        };

        if (!title || !url || !albumId) {
            setErrors([]);
            return dispatch(editOneSong(payload)).catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
        }

        const closeModal = () => { setShowModal(false) }

        let editSong = await dispatch(editOneSong(payload));
        if (editSong) {
            closeModal();
            window.alert('song is now updated!')
        }
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form hidden={showModal} id='song-form'>
                        {/* <label>Song Id: {targetSong.id}</label> */}
                        <label>Song name: {targetSong?.title}</label>
                        <ul>
                            {errors.map((error, idx) => {
                                if (error !== 'Invalid value') {
                                    return <li key={idx}>{error}</li>
                                }
                            }
                            )}
                        </ul>
                        <label>new title</label>
                        <input
                            type="text"
                            placeholder={targetSong?.title}
                            min="2"
                            required
                            value={title}
                            onChange={updateTitle} />
                        <br></br>
                        <label>choose an album</label>
                        <select id="mydropdown" className="dropdown-content" onChange={updateAlbum} >
                            <option value='' selected disabled hidden> your albums ...</option>
                            {myAlbums && myAlbums.map(album => {

                                return <option key={album.id} value={album.id}>{album.name}</option>
                            })
                            }
                        </select>
                        <br></br>
                        <label>audio URL</label>
                        <input
                            type="text"
                            placeholder={targetSong?.url}
                            min="2"
                            value={url}
                            onChange={updateUrl} />
                        <label>image URL</label>
                        <label>(not required)</label>
                        <input
                            type="text"
                            placeholder={targetSong?.previewImage}
                            value={previewImage}
                            onChange={updateImageUrl} />
                        <label>description:</label>
                        <label>(not required)</label>
                        <input
                            type="text"
                            placeholder='edit description here'
                            min="2"
                            value={description}
                            onChange={updateDescription} />
                        <div className="button-container" id={targetSong?.id}>
                            <button type='submit' onClick={handleEdit}>Update</button>
                            <button type='button' onClick={closeModal}>Cancel Edit</button>
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
