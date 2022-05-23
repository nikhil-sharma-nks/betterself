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
    default:
      return state;
  }
};

export { VideoReducer };
