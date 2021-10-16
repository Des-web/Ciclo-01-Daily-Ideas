import React from 'react';

import { Container } from './styles';

import Header from '../Header';
import MenuBar from '../MenuBar';

function Layout(props) {
  return (
    <>
      <Header/>
      <MenuBar/>
      
      <Container>
        {props.children}
      </Container>
    </>
  );
}

export default Layout;