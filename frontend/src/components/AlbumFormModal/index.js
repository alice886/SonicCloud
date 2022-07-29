import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateAlbumForm from '../Album/CreateAlbumForm';

const CreateAlbumModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create New Album</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateAlbumForm />
                </Modal>
            )
            }
        </>
    )

}

export default CreateAlbumModal;
