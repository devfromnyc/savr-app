import React, { useContext, useState, useCallback, useEffect } from 'react';

import { AuthContext } from '../../context/auth-context';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import './piechart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {

    const auth = useContext(AuthContext);

    const uid = auth.userId;

    const [userDataState, setUserData] = useState(null);

    const pieChartArrData = useCallback((userDataServer) => {
        setUserData(userDataServer);
    }, []);

    const pieChartDataReq = async () => {

        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/items/user/${uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null
            });
    
            const responseData = await response.json();

            const userDataServer = await responseData.items;

            console.log(userDataServer);

            pieChartArrData(userDataServer);
            

        } catch (err){
            console.log(err);
        }

    }

    useEffect(() => {
        if(userDataState === null){
            pieChartDataReq();
        }
      }, [userDataState]);

    if(userDataState != null){

        const userData = userDataState;

        const categoryList = ['Electronics', 'Entertainment', 'Household', 'Restaurant', 'Travel'];

        
        const userDataArr = categoryList.map(function(category) {
            let fullCost = [];
            for (let i = 0; i < userData.length; i++){
                if(category === userData[i].category){ 
                    fullCost.push(userData[i].cost);
                }
            }
            const initialValue = 0;
            let fullCostSum = fullCost.reduce((previousValue, currentValue) => previousValue + currentValue,
                    initialValue);
            return (fullCostSum);
        });

        const PieData = {
            labels: ['Electronics', 'Entertainment', 'Household', 'Restaurant', 'Travel'],
            datasets: [
                {
                    data: userDataArr,
                    backgroundColor: [
                    'rgba(3, 4, 94, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(2, 62, 138, 0.5)',
                    'rgba(0, 119, 182, 0.5)',
                    'rgba(0, 180, 216, 0.5)'
                    ],
                    borderColor: [
                    'rgba(3, 4, 94, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(2, 62, 138, 1)',
                    'rgba(0, 119, 182, 1)',
                    'rgba(0, 180, 216, 1)'
                    ],
                    borderWidth: 1,
                },
            ],
        }

        console.log(userDataArr);

        return (
            <section className="d-flex flex-column justify-content-center align-items-center width100">
                <h2 className="text-center">Total Money Saved</h2>
                <h3 className='sr-only'>Electronics ${userDataArr[0]}, Entertainment ${userDataArr[1]}, Household ${userDataArr[2]}, Restaurant ${userDataArr[3]}, Travel ${userDataArr[4]}</h3>
                <Pie data={PieData} options={{
                plugins:{
                    title: {
                        display: true,
                        text: 'Total Money Saved In Dollars',
                        padding: {
                            top: 10,
                            bottom: 30
                        },
                        font: {
                            size: 32
                        }
                    }
                }
            }} />
            </section>
        ); 
    } else {
        return (
            <section className="text-center width100">
                <p className="text-center">Please Add Items to your collection<br />in order to view your personalized pie chart<br />You can do this by activating the modal<br />on the top right of the page.</p>
            </section>
        )
    }

};

export default PieChart;