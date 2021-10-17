import React from 'react';
import Card from '../../components/Card';

import { Container, Wrapper } from './styles';

function Feed() {
  return (
    <Container>
      <Wrapper>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <div style={{flexGrow: 1}}></div>
      </Wrapper>
    </Container>
  );
}

export default Feed;
