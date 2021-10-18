import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 48px;
  width: 100%;
  height: 48px;
  position: fixed;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-300);
  background-color: #fff;
`;

export const Left = styled.div`
  color: var(--gray-700);
`;
