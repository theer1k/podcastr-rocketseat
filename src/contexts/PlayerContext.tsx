import { EpisodeModel } from '@models/episode'
import { ReactNode, createContext, useContext, useState } from 'react'

type PlayerContextData = {
  episodeList: Array<EpisodeModel>
  currentEpisodeIndex: number
  isPlaying: boolean
  play: (episode: EpisodeModel) => void
  togglePlay: () => void
  setPlayingState: (state: boolean) => void
  playList: (episodes: Array<EpisodeModel>, index: number) => void
  playNext: () => void
  playPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
  toggleLoop: () => void
  isLooping: boolean
  toggleShuffle: () => void
  isShuffling: boolean
  clearPlayerState: () => void
}

type PlayerContextProviderPros = {
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({ children }: PlayerContextProviderPros): JSX.Element {
  const [episodeList, setEpisodeList] = useState<Array<EpisodeModel>>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function play(episode: EpisodeModel) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    togglePlay()
    setIsShuffling(false)
  }

  function playList(episodes: Array<EpisodeModel>, index: number) {
    setEpisodeList(episodes)
    setCurrentEpisodeIndex(index)
    setPlayingState(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  function clearPlayerState() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  return (
    <PlayerContext.Provider
      value={{
        currentEpisodeIndex,
        episodeList,
        isPlaying,
        play,
        togglePlay,
        setPlayingState,
        playList,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        toggleLoop,
        isLooping,
        toggleShuffle,
        isShuffling,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = (): PlayerContextData => useContext(PlayerContext)
