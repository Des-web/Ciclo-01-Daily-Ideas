import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Wrapper, Button } from './styles';

function MenuBar() {
  return (
    <Container>
      <Wrapper>
        <Link to="/"><Button>Feed</Button></Link>
      </Wrapper>
    </Container>
  );
}

export default MenuBar;