import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { getOneAlbum, deleteOneAlbum, editOneAlbum } from '../../store/album';

const EditAlbumModal = () => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const { albumId } = useParams();
    const history = useHistory();
    const [name, setName] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [hideEditform, setHideEditForm] = useState(true)

    const updateName = e => setName(e.target.value);
    const updatePreviewImage = e => setPreviewImage(e.target.value);


    useEffect(() => {
        dispatch(getOneAlbum(albumId))
    }, [dispatch, albumId]);

    // const targetAlbum = useSelector(state => Object.values(state.album));
    // no need of Object.values since it's already an object
    const targetAlbum = useSelector(state => (state.album));

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
            alert(`album is now deleted`)
        }
    }

    const handleEdit = async e => {
        e.preventDefault();

        const payload = {
            id: albumId,
            name,
            previewImage
        };

        if (!name) alert('album title is required')
        let editAlbum = await dispatch(editOneAlbum(payload));
        history.push(`/albums/myalbums/`);
        // history.push(`/albums/myalbums/${editAlbum.id}/`);
        if (editAlbum) {
            alert('album was edited')
        }
    }

    const handleCancel = e => {
        e.preventDefault();
        setHideEditForm(true);
    };

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form hidden={hideEditform} id='album-form'>
                        <label>Album name: {targetAlbum.name}</label>
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
