import ICategory from './category';

export default interface IVocabulary {
  _id?: string;
  name?: string;
  categories?: ICategory[];
}

export const defaultValue: IVocabulary = {
  _id: '',
  name: '',
  categories: [],
};
