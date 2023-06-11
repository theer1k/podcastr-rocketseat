import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useEffect, useRef, useState } from 'react'

import { usePlayer } from '@contexts/PlayerContext'
import FormatEndingDuration from '@utils/helpers/FormatEndingDuration'
import FormatStartingDuration from '@utils/helpers/FormatStartingDuration'
import Image from 'next/image'
import styles from './styles.module.scss'

export default function Player(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    isLooping,
    toggleLoop,
    isShuffling,
    toggleShuffle,
    clearPlayerState,
  } = usePlayer()

  const episode = episodeList[currentEpisodeIndex]

  useEffect(() => {
    ;(async () => {
      try {
        if (!audioRef.current) {
          return
        }

        if (isPlaying) {
          await audioRef.current.play()
        } else {
          audioRef.current.pause()
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [isPlaying])

  function setupProgressList() {
    audioRef.current.currentTime = 0
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime * 1000))
    })
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount / 1000
    setProgress(amount)
  }

  function handleEpisodeEnded() {
    setProgress(0)
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image width={250} height={190} src={episode.episodeImage} objectFit="contain" />
          <strong>{episode.title}</strong>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{FormatStartingDuration(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{FormatEndingDuration(episode?.duration ?? 0)}</span>
        </div>

        {episode && (
          <audio
            onPause={() => setPlayingState(false)}
            onPlay={() => setPlayingState(true)}
            loop={isLooping}
            ref={audioRef}
            src={episode.episodeEnclosureUrl}
            autoPlay
            onLoadedMetadata={setupProgressList}
            onEnded={handleEpisodeEnded}
          >
            <track kind="captions" label="Portuguese" default />
          </audio>
        )}

        <div className={styles.buttons}>
          <button
            type="button"
            className={isShuffling ? styles.isActive : ''}
            onClick={toggleShuffle}
            disabled={!episode || episodeList.length === 1}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            disabled={!episode}
            className={styles.playButton}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Pausar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>
          <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button
            type="button"
            className={isLooping ? styles.isActive : ''}
            onClick={toggleLoop}
            disabled={!episode}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}
