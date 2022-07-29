import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addNewAlbum } from '../../store/album';

const CreateAlbumForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const currentUser = useSelector(state => state.session.user)
    // const userId = currentUser.id

    const updateName = e => setName(e.target.value);
    const updatePreviewImage = e => setPreviewImage(e.target.value);

    const handleSubmitNewAlbum = async e => {
        e.preventDefault();

        const payload = {
            name,
            previewImage
        };


        if (name || previewImage) {
            setErrors([]);
            return dispatch(addNewAlbum({ name, previewImage }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }

        let createNewAlbum = await dispatch(addNewAlbum(payload));
        history.push(`/albums/myalbums/`);
        if (createNewAlbum) {
            alert('new album created!');
        }
    }

    // const handleCancelClick = e => {
    //     e.preventDefault();
    //     // hideForm();
    // };

    return (
        <form className='new-album-form' onSubmit={handleSubmitNewAlbum} hidden={showModal}>
            Create a New Album:
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <input
                type="text"
                placeholder="name"
                min="2"
                required
                value={name}
                onChange={updateName} />
            <input
                type="text"
                placeholder="Image URL"
                value={previewImage}
                onChange={updatePreviewImage} />
            <button type='submit'>Create new Album</button>
            {/* <button type='button' onClick={demoAutoFill}>demo album</button> */}
            {/* <button type='button' onClick={()=>setShowModal(true)}>Cancel</button> */}
        </form>
    )

}

export default CreateAlbumForm;
