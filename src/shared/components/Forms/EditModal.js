import React from 'react';
import ReactDOM from 'react-dom';

import EditItemForm from './EditItemForm';

const EditModalOverlay = () =>{

    const content = (
        <div id="modal2" className="modal">
            <div className="modal-content">
                <h4>Edit an Item</h4>
                <p>Please Enter the new item properties into the inputs below</p>
                <EditItemForm />
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
        </div>
    );

    return ReactDOM.createPortal(content, document.getElementById('edit-modal-hook'));
}

const EditModal = () =>{
    return <EditModalOverlay />;
}

export default EditModal;