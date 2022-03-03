import ICategory from './category';

export interface IVideo {
  _id?: string;
  youtubeId?: string;
  categories?: ICategory[];
}
