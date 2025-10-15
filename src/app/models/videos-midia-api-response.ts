import { SafeResourceUrl } from '@angular/platform-browser';

export interface VideosMidiaApiResponse {
  id: number;
  results: VideoMidia[];
}

export interface VideoMidia {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string | SafeResourceUrl;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
