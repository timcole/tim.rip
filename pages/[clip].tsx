import { NextPage, NextPageContext } from 'next';
import { fetcher, host } from '../lib/fetcher';
import { Clip } from '../interfaces/clips';
import ErrorPage from './_error';
import styled from 'styled-components';
import { timeSince } from '../lib/timeSince';
import { ClipsBody, Heading } from '../components/clips';
import Link from 'next/link';
import Head from 'next/head';

interface Props {
  id?: string;
  clip?: Clip;
  error?: string;
}

const ClipPage: NextPage<Props> = ({ id, clip, error }) => {
  if (error) return <ErrorPage err={error} statusCode={500} />;

  return (
    <ClipsBody>
      <Head>
        <title>
          {clip.contentTitle} - tim.rip - ModestTim's Medal TV Clips
        </title>
        <meta name="twitter:card" content="photo" />
        <meta name="twitter:title" content={clip.contentTitle} />
        <meta name="twitter:image" content={clip.contentThumbnail} />
        <meta name="twitter:url" content={`${host}/${id}`} />

        <meta property="og:title" content={clip.contentTitle} />
        <meta property="og:type" content="video" />
        <meta property="og:video" content={clip.directClipUrl} />
        <meta
          property="og:site_name"
          content="Timothy Cole - Software Engineer"
        />
        <meta property="og:description" content={clip.contentTitle} />

        <meta itemProp="name" content={clip.contentTitle} />
        <meta itemProp="description" content={clip.contentTitle} />
        <meta itemProp="image" content={clip.contentThumbnail} />
      </Head>
      <Heading>
        <h1>
          <Link href="/">
            <a>⬅</a>
          </Link>
          {clip.contentTitle}
        </h1>
        <p>Published: {timeSince(clip.createdTimestamp * 1000)}</p>
      </Heading>
      <VideoContainer>
        <VideoPlayer src={clip.directClipUrl} />
      </VideoContainer>
    </ClipsBody>
  );
};

ClipPage.getInitialProps = async ({ query }: NextPageContext) => {
  const id: string = query.clip as string;

  try {
    const { data, errors } = await fetcher(`
      query {
        clip(contentId: "cid${id}") {
          directClipUrl
          contentTitle
          contentThumbnail
          createdTimestamp
        }
      }
    `).then((data) => data.json());

    return {
      id,
      clip: data?.clip,
      error:
        (!data?.clip && 'Clip not found') || (errors && errors[0]?.message),
    };
  } catch (e) {
    return { error: 'Clip not found' };
  }
};

export default ClipPage;

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;

  @media only screen and (min-width: 2100px) {
    padding-bottom: 45.25%;
  }
`;

const VideoPlayer = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;
