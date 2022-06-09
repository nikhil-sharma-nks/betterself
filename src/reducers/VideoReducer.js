const VideoReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_VIDEOS': {
      return {
        ...state,
        videos: payload,
      };
    }
    case 'LOAD_CATEGORIES': {
      return {
        ...state,
        categories: payload,
      };
    }
    case 'SORT_BY': {
      return {
        ...state,
        sortBy: payload,
      };
    }
    case 'CATEGORIZED_BY': {
      return {
        ...state,
        categorizedBy: payload,
      };
    }
    case 'SEARCH_QUERY': {
      return {
        ...state,
        searchQuery: payload,
      };
    }
    case 'ADD_TO_LIKED': {
      return {
        ...state,
        likes: payload,
      };
    }
    case 'ADD_TO_WATCH_LATER': {
      return {
        ...state,
        watchlater: payload,
      };
    }
    case 'ADD_TO_PLAYLISTS': {
      return {
        ...state,
        playlists: payload,
      };
    }
    case 'ADD_TO_HISTORY': {
      return {
        ...state,
        history: payload,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        likes: [],
        history: [],
        watchlater: [],
        playlists: [],
        sortBy: '',
        searchQuery: '',
        categorizedBy: 'all',
      };
    }
    default:
      return state;
  }
};

export { VideoReducer };
