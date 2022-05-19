import { IVideo } from 'src/shared/models/video';

export const getThumbNailUrl = videoId => `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;

export const searchVideoByName = (list: ReadonlyArray<IVideo>, videoId: string) => {
  return list.find(item => item.youtubeId === videoId);
};

export const getVideoId = url => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return null;
  }
};
