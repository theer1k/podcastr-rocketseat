import { AxiosResponse } from 'axios'

import { EpisodesAPIResponseModel } from '@models/episode'
import apiService from '@shared/services/api.service'

const resourcePath = 'pod/api/v3/episodes'

export default async function getEpisodeById(
  id: string
): Promise<AxiosResponse<EpisodesAPIResponseModel>> {
  return apiService.get<EpisodesAPIResponseModel>(`${resourcePath}/${id}`)
}
