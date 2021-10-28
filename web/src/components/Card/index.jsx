import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { 
  Container,
  Tittle,
  CreatedAt,
  Image,
  Stats,
  Votes,
  Comments,
  VoteIcon,
  CommentIcon
} from './styles';

function Card() {

  const [ voted, setVoted ] = useState(false);

  return (
    <Container>
      <Tittle>
        <Link to="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquet, elit a elementum sagittis, nisi lectus bibendum erat, non facilisis diam nisi ac dolor.</Link>
      </Tittle>
      
      <CreatedAt>2 days ago</CreatedAt>
      <Link to="#">
        <Image></Image>
      </Link>
      <Stats>
        <Votes>
          <button onClick={() => (voted) ? setVoted(false) : setVoted(true)}>
            <VoteIcon $voted={voted}/>
          </button>
          <span>5</span>
        </Votes>
        <Comments>
          <Link to="#">
            <CommentIcon/>
          </Link>
          <span>2</span>
        </Comments>
      </Stats>
    </Container>
  );
}

export default Card;
