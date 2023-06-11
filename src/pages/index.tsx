import { GetStaticProps } from 'next'
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

type HomeProps = {
  episodes: Array<EpisodeModel>
}

export default function Home({ episodes }: HomeProps): JSX.Element {
  const { playList } = usePlayer()

  return (
    <div className={styles.homePage}>
      <Head>
        <title>Home | Podcastr</title>
      </Head>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {episodes.slice(0, 2).map((episode, index) => (
            <li key={episode.episodeId}>
              <Image
                layout="fixed"
                objectFit="contain"
                className={styles.currentEpisode}
                width={90}
                height={90}
                src={episode.episodeImage}
                alt={episode.title}
              />
              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.episodeId}`}>
                  <a>{episode.title}</a>
                </Link>
                <span>{format(parseISO(episode.publishOn), 'd MMM yy', { locale: ptBR })}</span>
                <span>{FormatEndingDuration(episode.duration)}</span>
              </div>
              <button type="button" onClick={() => playList(episodes, index)}>
                <img src="/play-green.svg" alt="Tocar episódio" />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos os episódios</h2>
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Podcast</th>
              <th>Data</th>
              <th>Duração</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {episodes.slice(2).map((episode, index) => (
              <tr key={episode.episodeId}>
                <td>
                  {episode.episodeImage && (
                    <Image
                      layout="fixed"
                      objectFit="contain"
                      className={styles.currentEpisode}
                      width={80}
                      height={80}
                      src={episode.episodeImage}
                      alt={episode.title}
                    />
                  )}
                </td>
                <td>
                  <Link href={`/episodes/${episode.episodeId}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td style={{ width: 100 }}>
                  {format(parseISO(episode.publishOn), 'd MMM yy', { locale: ptBR })}
                </td>
                <td>{FormatEndingDuration(episode.duration)}</td>
                <td>
                  <button type="button" onClick={() => playList(episodes, index + 2)}>
                    <img src="/play-green.svg" alt="Tocar episódio" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await getEpisodeById('e1n0gag')

  const episodes = await Promise.all(
    data.episodes.map(async (episode) => {
      const episodeData = await getEpisodeById(episode.episodeId)
      if (!episodeData.data.episode.episodeImage) {
        episodeData.data.episode.episodeImage =
          'https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/production/podcast_uploaded400/528611/528611-1602707573886-8dd7649954672.jpg'
      }

      return episodeData.data.episode
    })
  )

  return {
    props: {
      episodes,
    },
    revalidate: 1000 * 60 * 60 * 12,
  }
}
