import styled from "styled-components";

export const ClipsBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 140px;
  flex: 1;

  @media only screen and (max-width: 750px) {
    padding: 50px 15px;
  }
`;

export const Heading = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.accent};

  h1 {
    margin: 0;
    flex: 1;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.accent};
      margin-right: 15px;
    }
  }

  p {
    color: ${(props) => props.theme.grey};
    font-weight: 100;
  }
`;
