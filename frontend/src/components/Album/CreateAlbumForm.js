import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addNewAlbum } from '../../store/album';

const CreateAlbumForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [previewImage, setPreviewImage] = useState('');
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

        let createNewAlbum = await dispatch(addNewAlbum(payload));
        window.location.reload();
        if (createNewAlbum) {
            history.push(`/albums/myalbums`);
        }
    }
    // const demoAutoFill = e => {
    //     e.preventDefault();
    //     name = 'riri-test-demo'
    //     previewImage = 'https://i0.wp.com/i.pinimg.com/236x/09/ca/27/09ca2737889f26a6006c94a946a4105e.jpg'
    // };
    const handleCancelClick = e => {
        e.preventDefault();
        hideForm();
    };

    return (
        <section className='newalbum-section'>
            <form className='new-album-form' onSubmit={handleSubmitNewAlbum}>
                Create a New Album:
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
                <button type='button' onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )

}

export default CreateAlbumForm;
