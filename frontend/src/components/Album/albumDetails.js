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
    const [hideEditform, setHideEditForm] = useState(true)

    const updateName = e => setName(e.target.value);
    const updatePreviewImage = e => setPreviewImage(e.target.value);


    useEffect(() => {
        dispatch(getOneAlbum(albumId))
    }, [dispatch, albumId]);

    // const targetAlbum = useSelector(state => Object.values(state.album));
    // no need for Object.values since it's already an object
    const targetAlbum = useSelector(state => (state.album));
    const { Artist, Songs, id, userId } = targetAlbum;
    // console.log('what is Artist and could be go inside of the array??', Artist)
    // console.log('what is Artist and could be go inside of the array??', Artist.username)
    // console.log('what is Songs and could be go inside of the array??', Songs)
    // console.log('what is Songs and could be go inside of the array??', Songs[0].title)
    // console.log('what is Songs and could be go inside of the array??', Songs[0].description)
    // console.log('what is Songs and could be go inside of the array??', Songs[0].url)

    // const albumSongs = targetAlbum.Songs;
    // const albumArtist = targetAlbum.Artist;
    // console.log('targetAlbum is retrieved -- ', targetAlbum)
    // console.log('album song is retrieved -- ', targetAlbum.Songs)
    // console.log('album artist is retrieved -- ', targetAlbum?.Artist)
    // console.log('album artist is retrieved -- ', targetAlbum.Artist.username)
    // console.log('album artist is retrieved -- ', targetAlbum.name.Artist.username)

    const handleDelete = async (e) => {
        e.preventDefault();
        const payload = {
            id: albumId
        }
        let deleteAlbum = await dispatch(deleteOneAlbum(payload))
        history.push(`/albums/myalbums/`); // push to history first then reload
        window.location.reload();
        if (deleteAlbum) {
            alert(`song is now deleted`)
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
        setHideEditForm(true);
    };


    return (
        <>
            {targetAlbum && (
                <div>
                    <h2>{targetAlbum.name}</h2>
                    <img src={targetAlbum.previewImage} alt={targetAlbum.name} width="200" height="200" />
                    <h3>Artist: </h3>
                    <div>{targetAlbum?.Artist?.username}</div>
                    <h3>Songs: </h3>
                    <div className="album-song-container">
                        {(targetAlbum?.Songs?.length > 0) ?
                            targetAlbum?.Songs?.map((song) => {
                                return <div className="albumSongs" key={song.id}>
                                    <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                                </div>
                            }) : ' -- no song in this album yet --'
                        }
                    </div>
                    <button onClick={() => setHideEditForm(false)}> See Details/Edit </button>
                    <form hidden={hideEditform} id='album-form'>
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
