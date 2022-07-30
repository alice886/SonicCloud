import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { getOneAlbum, deleteOneAlbum, editOneAlbum } from '../../store/album';

const EditAlbumModal = ({ targetAlbum }) => {

    const dispatch = useDispatch();
    const { albumId } = useParams();
    const history = useHistory();
    const [name, setName] = useState(targetAlbum?.name);
    const [previewImage, setPreviewImage] = useState(targetAlbum?.previewImage);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);

    const updateName = e => setName(e.target.value);
    const updatePreviewImage = e => setPreviewImage(e.target.value);

    // console.log('target album is ---', targetAlbum)
    // console.log('target album name is ---', targetAlbum?.name)
    // console.log('target album img is ---', targetAlbum?.previewImage)

    useEffect(() => {
        dispatch(getOneAlbum(albumId))
    }, [dispatch, name, previewImage, showModal, errors]);

    // const targetAlbum = useSelector(state => Object.values(state.album));
    // no need of Object.values since it's already an object

    const handleDelete = async (e) => {
        e.preventDefault();
        const payload = {
            id: albumId
        }
        let deleteAlbum = await dispatch(deleteOneAlbum(payload))
        history.push(`/albums/myalbums/`);
        // push to history first then reload
        // window.location.reload();
        if (deleteAlbum) {
            window.alert(`album is now deleted`)
        }
    }

    const handleEdit = async e => {
        e.preventDefault();

        const payload = {
            ...targetAlbum,
            id: albumId,
            name,
            previewImage
        };

        if (!name) {
            setErrors([]);
            return dispatch(editOneAlbum(payload)).catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
        }

        const closeModal = () => { setShowModal(false) }

        let editAlbum = await dispatch(editOneAlbum(payload));
        if (editAlbum) {
            closeModal();
            window.alert('album was edited');
        }
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form hidden={showModal} id='album-form'>
                        <label>Album name: {targetAlbum.name}</label>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        {/* <label>Album Id: {targetAlbum.id}</label> */}
                        {/* <input
                            type="text"
                            placeholder={targetAlbum.id}
                            value={targetAlbum.id}
                            disabled={true}
                        /> */}
                        <input
                            type="text"
                            placeholder='new name here'
                            min="2"
                            required
                            value={name}
                            onChange={updateName} />
                        <label>Image URL</label>
                        {/* <label>{targetAlbum.previewImage}</label> */}
                        <input
                            type="text"
                            placeholder='new image url here'
                            value={previewImage}
                            onChange={updatePreviewImage} />
                        <div className="button-container" id={targetAlbum.id}>
                            <button type='submit' onClick={handleEdit}>Update</button>
                            <button type='button' onClick={() => setShowModal(false)}>Cancel Edit</button>
                            <button type='button' onClick={handleDelete}>Delete Album</button>
                        </div>
                    </form>
                </Modal>
            )
            }
        </>
    )

}

export default EditAlbumModal;
