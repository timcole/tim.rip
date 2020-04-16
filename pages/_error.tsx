import { NextPage, NextPageContext } from "next";
import styled from "styled-components";

interface Props {
  statusCode: number;
  err: string;
}

const ErrorPage: NextPage<Props> = ({ statusCode, err }) => {
  return (
    <Error>
      <h2>{err ? "Oh no! 💀" : statusCode}</h2>
      <h3>{err ? err : "Oh no! 💀"}</h3>
    </Error>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, err: err?.toString() };
};

export default ErrorPage;

export const Error = styled.div`
  text-align: center;
  flex: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;

  * {
    margin: 0;
  }

  h2 {
    color: ${(props) => props.theme.error};
    font-size: 8rem;
  }

  h3 {
    font-weight: 100;
    color: ${(props) => props.theme.grey};
  }
`;
