export const setJobs = (jobs) => ({
    type: "SET_JOBS",
    payload: jobs,
  });
  
  export const setLoading = (loading) => ({
    type: "SET_LOADING",
    payload: loading,
  });
  
  // Actions for updating filters
  export const setFilter = (filterName, value) => ({
    type: "SET_FILTER",
    payload: { filterName, value },
  });
  
  // Action to set the offset for pagination
  export const setOffset = (offset) => ({
    type: "SET_OFFSET",
    payload: offset,
  });
  
  export const setAllDataLoaded = (allDataLoaded) => ({
    type: "SET_ALL_DATA_LOADED",
    payload: allDataLoaded,
  });
  