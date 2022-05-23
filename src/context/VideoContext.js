import { createContext, useContext, useReducer } from 'react';
import { VideoReducer } from '../reducers';

const VideoContext = createContext();

const useVideo = () => useContext(VideoContext);

const InitialVideoState = {
  categories: [],
  likedVideos: [],
  history: [],
  videos: [],
  watchLater: [],
  playlists: [],
  sortBy: '',
  searchQuery: '',
  categorizedBy: 'all',
};

const VideoProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(
    VideoReducer,
    InitialVideoState
  );

  return (
    <VideoContext.Provider value={{ videoState, videoDispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

export { VideoProvider, useVideo, InitialVideoState };
