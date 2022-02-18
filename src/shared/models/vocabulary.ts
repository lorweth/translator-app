import ICategory from './category';

export default interface IVocabulary {
  _id?: string;
  word?: string;
  meaning?: string;
  categories?: ICategory[];
}

export const defaultValue: IVocabulary = {
  _id: '',
  word: '',
  meaning: '',
  categories: [],
};
