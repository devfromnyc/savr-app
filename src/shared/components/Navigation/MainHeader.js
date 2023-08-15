import React from 'react';
import MainNav from './MainNav';

const MainHeader = props => {
  return (
    <header>
      <MainNav showTrigger={props.showTrigger} />
    </header>
  );
};

export default MainHeader;