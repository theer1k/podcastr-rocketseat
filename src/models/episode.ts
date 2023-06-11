export interface EpisodesAPIResponseModel {
  creator: CreatorModel
  episode: EpisodeModel
  episodeAudios: EpisodeAudioModel[]
  episodes: EpisodeModel[] | EpisodesAPIResponseModel[]
  podcastMetadata: PodcastMetadata
  podcastUrlDictionary: PodcastURLDictionaryModel
  defaultProfileHeaderColor: string
}

export interface CreatorModel {
  url: null
  generatedImage: null
  name: string
  userId: number
  vanitySlug: string
}

export interface EpisodeModel {
  created: string
  createdUnixTimestamp: number
  isDeleted: boolean
  modified: null | string
  publishOn: string
  publishOnUnixTimestamp: number
  hourOffset: number
  podcastEpisodeIsExplicit?: boolean
  podcastEpisodeType?: PodcastEpisodeType
  podcastEpisodeUuid: string
  podcastSeasonNumber?: number
  description: string
  descriptionPreview: string
  duration: number
  episodeId: string
  episodeImage?: string
  shareLinkPath: string
  shareLinkEmbedPath: string
  stationId: string
  title: string
  isMT?: boolean
  spotifyUrl: string
  episodeEnclosureUrl?: string
  isAdSlotEnabled?: boolean
}

export enum PodcastEpisodeType {
  Full = 'full',
}

export interface EpisodeAudioModel {
  audioId: string
  audioType: string
  audioUrl: string
  caption: string
  createdUnixTimestamp: number
  duration: number
  durationHMS: string
  key: string
  stationAudioId: string
  sort: number
  thirdPartySources: unknown[]
  url: string
  userId: number
}

export interface PodcastMetadata {
  hasAnchorBrandingRemoved: boolean
  isPublicCallinHiddenFromWeb: boolean
  language: string
  podcastAuthorName: string
  podcastCategory: string
  podcastDescription: string
  podcastImage: string
  podcastImage400: string
  podcastIsExplicit: boolean
  podcastName: string
  isRssFeedEnabled: boolean
  spotifyShowUrl: string
}

export interface PodcastURLDictionaryModel {
  breaker: string
  castbox: string
  googlePodcasts: string
  itunes: string
  overcast: string
  pocketCasts: string
  podBean: string
  radioPublic: string
  spotify: string
  stitcher: string
}
