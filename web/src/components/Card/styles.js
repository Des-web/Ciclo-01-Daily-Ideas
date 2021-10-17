import styled from 'styled-components';
import { GoArrowUp, GoComment } from 'react-icons/go';

export const Container = styled.div`
  background-color: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

export const Tittle = styled.span`
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  a {
    text-decoration: none;
    font-size: 18px;
    color: var(--gray-700);
    font-weight: 700;
  }
`;

export const CreatedAt = styled.span`
  font-size: 14px;
  color: var(--gray-500);
  margin: 8px 0 16px 0;
`;

export const Image = styled.div`
  background-image: url(https://images.unsplash.com/photo-1634156692766-6a39e8fe99f5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80);
  background-size: 200px 100px;
  height: 100px;
  width: 200px;
`;

export const Stats = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;

  span {
    font-size: 16px;
    font-weight: 500;
    color: var(--gray-500);
    margin: 0 4px;
  }
`;

export const Votes = styled.div`
  display: flex;
  align-items: center;
  margin-right: 32px;
`;

export const Comments = styled.div`
  display: flex;
  align-items: center;
`;

export const VoteIcon = styled(GoArrowUp)`
  height: 24px;
  width: 24px;
  
  fill: ${(props) => props.voted ? "var(--primary)" : "var(--gray-400)"};
`;

export const CommentIcon = styled(GoComment)`
  height: 24px;
  width: 24px;
  margin-top: 8px;
  margin-right: 4px;

  fill: var(--gray-400);
`;
