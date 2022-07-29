import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSongForm from '../Song/CreateSongForm';

const CreateSongModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create New Song</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateSongForm />
                </Modal>
            )
            }
        </>
    )

}

export default CreateSongModal;
