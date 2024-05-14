const initialState = {
    jobs: [],
    loading: false,
    offset: 0,
    allDataLoaded: false,
    filters: {
      minExperience: "",
      companyName: "",
      location: "",
      techStack: "",
      role: "",
      minBasePay: "",
    },
  };
  
  const jobReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_JOBS":
        return { ...state, jobs: action.payload };
      case "SET_LOADING":
        return { ...state, loading: action.payload };
      case "SET_FILTER":
        return {
          ...state,
          filters: {
            ...state.filters,
            [action.payload.filterName]: action.payload.value,
          },
        };
      case "SET_OFFSET":
        return { ...state, offset: action.payload };
      case "SET_ALL_DATA_LOADED":
        return { ...state, allDataLoaded: action.payload };
      default:
        return state;
    }
  };
  
  export default jobReducer;
  