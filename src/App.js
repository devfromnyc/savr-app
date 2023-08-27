import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import MainHeader from './shared/components/Navigation/MainHeader';
import Hero from './shared/components/UserInterface/Hero';
import HomepageFormContainer from './shared/components/Forms/HomepageFormContainer';
import UserCardList from './shared/components/UserInterface/UserCardList';
import PieChart from './shared/components/Graphs/PieChart';
import AddModal from './shared/components/Forms/AddModal';
import EditModal from './shared/components/Forms/EditModal';
import Footer from './shared/components/Navigation/Footer';

// import { cookieFind } from './shared/hooks/cookie-hook';

import { AuthContext } from '../src/shared/context/auth-context';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userId, setUserId] = useState(false);

  // const [userCookie, setUserCookie] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
    // setUserCookie(true);
  }, []);

  // const hasCookie = cookieFind();

  let displayContent;

  if (isLoggedIn) {
    displayContent =(
    <React.Fragment>
      <MainHeader showTrigger="true" />
      <main className="width100">
        <Hero
        mainHeader="Welcome back!"
        subHeader="You're doing great! Keep saving!"
        />
        <PieChart/>
        <UserCardList />
      </main>
      <Footer />
    </React.Fragment>
    );
  } else{
    displayContent = (
      <React.Fragment>
        <MainHeader showTrigger="false" />
        <main className="width100">
          <Hero
          mainHeader="Welcome to SAVR!"
          subHeader="Please Login or Signup to continue"
          />
          <HomepageFormContainer />
        </main>
        <Footer />
      </React.Fragment>
    );
  }
  return (
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, userId: userId, login: login }}
      >
        <Router>
          {displayContent}
          <EditModal />
          <AddModal />
        </Router>
      </AuthContext.Provider>
  );
}

export default App;