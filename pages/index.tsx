import { NextPage } from "next";
import { fetcher } from "../lib/fetcher";
import { Clip } from "../interfaces/clips";
import ErrorPage from "./_error";
import styled from "styled-components";
import { timeSince } from "../lib/timeSince";
import { rgba } from "polished";
import { ClipsBody, Heading } from "../components/clips";
import Link from "next/link";
import Head from "next/head";

const clipsQuery = `
query {
  lastUpdated
  clips {
    contentId
    directClipUrl
    contentTitle
    contentViews
    contentThumbnail
    createdTimestamp
  }
}
`;

interface Props {
  clips?: Clip[];
  lastUpdated?: string;
  error?: string;
}

const ClipsPage: NextPage<Props> = ({ clips, lastUpdated, error }) => {
  if (error) return <ErrorPage err={error} statusCode={500} />;

  return (
    <ClipsBody>
      <Head>
        <title>tim.rip - ModestTim's Medal TV Clips</title>
      </Head>
      <Heading>
        <h1>Medal.tv Clips</h1>
        <p>Last Updated: {lastUpdated}</p>
      </Heading>
      <ClipsContainer>
        {clips.map((clip: Clip) => (
          <Link href="/[clip]" as={`/${clip.contentId.replace("cid", "")}`}>
            <a>
              <div className="clip" key={clip.contentId}>
                <div className="meta">
                  <img src={clip.contentThumbnail} />
                  <ClipMeta horizontal="right" vertical="top">
                    {timeSince(clip.createdTimestamp * 1000)}
                  </ClipMeta>
                  <ClipMeta horizontal="right" vertical="bottom">
                    {clip.contentViews} views
                  </ClipMeta>
                </div>
                <p>{clip.contentTitle}</p>
              </div>
            </a>
          </Link>
        ))}
      </ClipsContainer>
    </ClipsBody>
  );
};

ClipsPage.getInitialProps = async () => {
  try {
    const { data, errors } = await fetcher(clipsQuery).then((data) =>
      data.json()
    );

    return {
      clips: data?.clips,
      lastUpdated: data?.lastUpdated ? timeSince(data.lastUpdated) : null,
      error: errors && errors[0]?.message,
    };
  } catch (e) {
    return { error: "Failed to load clips" };
  }
};

export default ClipsPage;

const ClipsContainer = styled.div`
  display: grid;
  margin-top: 15px;
  grid-template-columns: 100%;

  @media only screen and (min-width: 850px) {
    grid-template-columns: 50% 50%;
  }
  @media only screen and (min-width: 1000px) {
    grid-template-columns: 33.333% 33.333% 33.333%;
  }
  @media only screen and (min-width: 1300px) {
    grid-template-columns: 25% 25% 25% 25%;
  }

  @media only screen and (min-width: 1500px) {
    grid-template-columns: 20% 20% 20% 20% 20%;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.color};
  }

  div.clip {
    background: ${(props) => props.theme.darker};
    margin: 10px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${(props) => props.theme.accent};
    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme.accent};
      color: ${(props) => props.theme.darker};
    }

    p {
      margin: 10px 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    div.meta {
      position: relative;
      display: flex;

      img {
        width: 100%;
      }
    }
  }
`;

const ClipMeta = styled.div<{
  horizontal: "left" | "right";
  vertical: "top" | "bottom";
}>`
  position: absolute;
  color: ${(props) => props.theme.color};
  background: ${(props: any) => rgba(props.theme.darker, 0.75)};
  padding: 0 10px;
  font-size: 0.8rem;

  ${(props) => props.horizontal}: 0;
  ${(props) => props.vertical}: 0;
`;
