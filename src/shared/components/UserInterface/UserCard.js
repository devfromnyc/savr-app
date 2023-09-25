import React from 'react';

import './avatar-collection.css';

const UserCard = props => {

    const editItem = (e) => {
        e.preventDefault();

        const editForm = document.getElementById('edit-item-form');

        editForm.setAttribute("data-item-id", `item-container__${props.itemServerId}`);

    }

    const deleteItem = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/items/${props.itemServerId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null
            });
    
            const responseData = await response.json();

            console.log(responseData.message);

            if (response.ok){
                const element = document.getElementById(`item-container__${props.itemServerId}`);

                element.remove();

                console.log("Just Removed " + props.itemTitle);
            }
            

        } catch (err){
            console.log(err);
        }
    }
        
    return(
        <li className="collection-item avatar" id={`item-container__${props.itemServerId}`}>
            <i className="material-icons circle red">attach_money</i>
            <span className="title" id="item-title" data-item-title={props.itemTitle}>{props.itemTitle}</span>
            <p><span id="item-category" data-item-category={props.itemCategory}>{props.itemCategory}</span> <span id="item-cost" data-item-cost={props.itemCost}>${props.itemCost}</span><br/>
                <span id="item-date" data-item-date={props.itemDate}>{props.itemDate}</span> <br />
            </p>
            <a href="#modal2" className="secondary-content secondary-content-edit modal-trigger" onClick={(e) => editItem(e)}><i className="material-icons">edit</i></a>
            <a href="#!" className="secondary-content secondary-content-delete" onClick={(e) => deleteItem(e)}><i className="material-icons">clear</i></a>
        </li>
    );
}

export default UserCard;