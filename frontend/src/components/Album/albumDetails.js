import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { getOneAlbum, getAllAlbums } from '../../store/album'
import { deleteOneAlbum, editOneAlbum } from '../../store/album';

function AlbumDetails() {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const history = useHistory();
    const [name, setName] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [hideEditform, setHideEditForm] = useState('true')

    const updateName = e => setName(e.target.value);
    const updatePreviewImage = e => setPreviewImage(e.target.value);

    useEffect(() => {
        dispatch(getOneAlbum(albumId))
    }, [dispatch, albumId]);

    // const targetAlbum = useSelector(state => Object.values(state.album));
    // no need for Object.values since it's already an object
    const targetAlbum = useSelector(state => (state.album));

    // const albumSongs = targetAlbum.Songs;
    // const albumArtist = targetAlbum.Artist;
    // console.log('targetAlbum is retrieved -- ', targetAlbum)
    // console.log('album song is retrieved -- ', targetAlbum.Songs)
    // console.log('album artist is retrieved -- ', targetAlbum.Artist.username)
    // console.log('album artist is retrieved -- ', targetAlbum.name.Artist.username)

    const handleDelete = async (e) => {
        e.preventDefault();
        const payload = {
            id: albumId
        }
        // console.log('id??', payload.id)

        let deleteAlbum = await dispatch(deleteOneAlbum(payload))
        window.location.reload();
        if (deleteAlbum) {
            alert(`song is now deleted`)
            history.push(`/albums/myalbums`);
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
        window.location.reload()
        if (editAlbum) {
            history.push(`/api/albums/myalbums/${albumId}}`);
        }
    }

    const handleCancel = e => {
        e.preventDefault();
        setHideEditForm(!hideEditform);
    };


    return (
        <>
            {targetAlbum && (
                <div>
                    <h2>{targetAlbum.name}</h2>
                    {/* <h3>artist: {targetAlbum.Artist.username}</h3> */}
                    <img src={targetAlbum.previewImage} alt={targetAlbum.name} width="200" height="200" />
                    {/* <div className="albumSongContainer">
                        {albumSongs.map((song) => {
                            return <div className="albumSongs" key={song.id}>hello
                                <Link to={`/songs/${song.id}`}>{song.name}</Link>
                            </div>
                        })
                        }
                    </div> */}
                    <button onClick={() => setHideEditForm(!hideEditform)}> See Details/Edit </button>
                    <form hidden={hideEditform}>
                        <label>Album Id:</label>
                        <input
                            type="text"
                            placeholder={targetAlbum.id}
                            value={targetAlbum.id}
                            disabled={true}
                        />
                        <label>name:</label>
                        <input
                            type="text"
                            placeholder={targetAlbum.name}
                            min="2"
                            required
                            value={name}
                            onChange={updateName} />
                        <label>Image URL</label>
                        <input
                            type="text"
                            placeholder={targetAlbum.previewImage}
                            value={previewImage}
                            onChange={updatePreviewImage} />
                        <div className="button-container" id={targetAlbum.id}>
                            <button type='submit' onClick={handleEdit}>Update</button>
                            <button type='button' onClick={handleCancel}>Cancel Edit</button>
                            <button type='button' onClick={handleDelete}>Delete Album</button>
                        </div>
                    </form>
                </div>
            )
            }
        </>
    )
}

export default AlbumDetails;
