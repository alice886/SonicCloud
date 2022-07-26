import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { getMyAlbums } from '../../store/album'
import CreateAlbumForm from "./CreateAlbumForm";
import { addNewAlbum, deleteOneAlbum } from '../../store/album';

function MyAlbums() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [hideEditform, setHideEditForm] = useState('true')

    const updateName = e => setName(e.target.value);
    const updatePreviewImage = e => setPreviewImage(e.target.value);
    // const currentUser = useSelector(state => state.session.user);

    const myAlbums = useSelector(state => Object.values(state.album))

    useEffect(() => {
        dispatch(getMyAlbums())
    }, [dispatch])

    const [showForm, setShowForm] = useState(false);

    const handleEdit = async (e) => {
        e.preventDefault();
        setHideEditForm(!hideEditform);
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        const payload = {
            id: e.target.id
        }
        console.log(payload)
        dispatch(deleteOneAlbum(payload))
        // history.push('/api/albums/myalbums')
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const payload = {
            name,
            previewImage
        };

        let createNewAlbum = await dispatch(addNewAlbum(payload));
        if (createNewAlbum) {
            history.push(`/albums/${createNewAlbum.id}`);

        }
    }

    const handleCancelClick = e => {
        e.preventDefault();
    };

    return (
        <div className="album-container"> ...... my albums on SonicCloud ......
            <div>
                {myAlbums && myAlbums.map((album) => {
                    return <div className="eachalbum" key={album.id}>
                        <NavLink to={`/albums/${album.id}`}>{album.name}</NavLink>
                        <p>album id{album.id}</p>
                        <form display={hideEditform}>
                            <label>Album Id</label>
                            <input
                                type="text"
                                placeholder={album.id}
                            />
                            <label>name</label>
                            <input
                                type="text"
                                placeholder={album.name}
                                min="2"
                                required
                                value={name}
                                onChange={updateName} />
                            <label>Image URL</label>
                            <input
                                type="text"
                                placeholder={album.previewImage}
                                value={previewImage}
                                onChange={updatePreviewImage} />
                            <button type='submit' onClick={handleSubmit}>Update album</button>
                            <button type='button' onClick={handleCancelClick}>Cancel edit</button>
                            <button type='button' id={album.id} onClick={handleDelete}>Delete album</button>
                        </form>
                        <button onClick={handleEdit}> Details/Edit </button>
                    </div>
                })}
            </div>
            <CreateAlbumForm display={() => setHideEditForm(false)} />
        </div>
    )
}

export default MyAlbums;
