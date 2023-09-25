import React, { useContext, useCallback, useState, useEffect } from "react";

import { AuthContext } from '../../context/auth-context';

import UserCard from './UserCard';

import './avatar-collection.css';

const UserCardList = () => {

    const auth = useContext(AuthContext);

    const uid = auth.userId;

    const [cardDataState, setUserData] = useState(null);

    const userCardArrData = useCallback((cardDataServer) => {
        setUserData(cardDataServer);
    }, []);

    const userCardData = async () => {

        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/items/user/${uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null
            });
    
            const responseData = await response.json();

            const cardDataServer = await responseData.items;

            userCardArrData(cardDataServer);
            

        } catch (err){
            console.log(err);
        }

    }

    useEffect(() => {
        if(cardDataState === null){
            userCardData();
        }
      }, [cardDataState]);

      if(cardDataState != null){

        const cardData = cardDataState;

        return(
            <section className="avatar-collection width100 mb-30">
                <h2 className="text-center">Saved Items</h2>
                <ul className="collection width80">
                    {cardData.map(item => (
                        <UserCard
                            key={item.title} 
                            itemTitle={item.title}
                            itemCategory={item.category}
                            itemCost={item.cost}
                            itemDate={item.date}
                            itemServerId={item._id}
                        />
                    ))}
                </ul>
            </section>
        );

      }

}

export default UserCardList;