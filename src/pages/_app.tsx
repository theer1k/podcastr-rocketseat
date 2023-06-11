import Header from '@components/Header'
import Player from '@components/Player'
import { PlayerContextProvider } from '@contexts/PlayerContext'
import '../styles/global.scss'
import styles from '../styles/app.module.scss'

function PodcastrApp({ Component, pageProps }): JSX.Element {
  return (
    <PlayerContextProvider>
      <div className={styles.appContainer}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default PodcastrApp
