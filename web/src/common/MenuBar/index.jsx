import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, Wrapper, Button } from './styles';

function MenuBar() {

  const [ activated, setActivated ] = useState('feed');
  
  return (
    <Container>
      <Wrapper>
        <Link to="/">
          <Button onClick={() => setActivated("feed")} activated={("feed" === activated) ? true : false}>Feed</Button>
        </Link>
        <Link to="#">
          <Button onClick={() => setActivated("config")} activated={("config" === activated) ? true : false}>Configurações</Button>
        </Link>
      </Wrapper>
    </Container>
  );
}

export default MenuBar;