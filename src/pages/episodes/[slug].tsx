/* eslint-disable react/no-danger */
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import getEpisodeById from '@api/episodes.api'
import { usePlayer } from '@contexts/PlayerContext'
import { EpisodeModel } from '@models/episode'
import FormatEndingDuration from '@utils/helpers/FormatEndingDuration'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import styles from './styles.module.scss'

type EpisodeProps = {
  episode: EpisodeModel
}

export default function Episode({ episode }: EpisodeProps): JSX.Element {
  const { play, isPlaying } = usePlayer()

  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        {episode.episodeImage && (
          <Image width={700} height={160} src={episode?.episodeImage} objectFit="contain" />
        )}
        <button type="button" onClick={() => play(episode)}>
          {isPlaying ? (
            <img src="/pause.svg" alt="Pausar" />
          ) : (
            <img src="/play.svg" alt="Tocar episódio" />
          )}
        </button>
      </div>
      <header>
        <h1>{episode.title}</h1>
        <span> {format(parseISO(episode.publishOn), 'd MMM yy', { locale: ptBR })}</span>
        <span>{FormatEndingDuration(episode.duration)}</span>
      </header>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await getEpisodeById('e1n0gag')

  const paths = data.episodes.map((episode) => ({
    params: {
      slug: episode.episodeId,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const { data } = await getEpisodeById(slug)

  if (!data.episode.episodeImage) {
    data.episode.episodeImage =
      'https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/production/podcast_uploaded400/528611/528611-1602707573886-8dd7649954672.jpg'
  }

  return {
    props: { episode: data.episode },
    revalidate: 1000 * 60 * 60 * 12,
  }
}
