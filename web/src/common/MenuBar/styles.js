import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100%;
  padding-top: 96px;
  border-right: 1px solid var(--gray-300);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  text-align: left;
  padding: 12px 32px;
  width: 100%;
  color: var(--gray-800);
  font-size: 16px;
  font-weight: 500;
  background-color: ${(props) => (props.activated) ? "var(--gray-200)" : "var(--gray-100)"};

  &:hover {
    background-color: var(--gray-200);
  }
`;
