import React from 'react';
import ReactDOM from 'react-dom';

import AddItemForm from './AddItemForm';

const AddModalOverlay = () =>{

    const content =(
        <div id="modal1" className="modal">
            <div className="modal-content">
                <h4>Add an Item</h4>
                <AddItemForm />
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
        </div>
    );

    return ReactDOM.createPortal(content, document.getElementById('add-modal-hook'));
}

const AddModal = () =>{
    return <AddModalOverlay />;
}

export default AddModal;