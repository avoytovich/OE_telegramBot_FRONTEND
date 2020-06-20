const generalReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_FOLLOWER':
      return {
        ...state,
        followers: action.payload,
      };
    case 'ERROR_NOTIFICATION':
      const changedStateErrorNotification = { ...state };
      changedStateErrorNotification.errorNotification = action.payload;
      return changedStateErrorNotification;
    case 'SUCCESS_NOTIFICATION':
      const changedStateSuccessNotification = { ...state };
      changedStateSuccessNotification.successNotification = action.payload;
      return changedStateSuccessNotification;
    case 'LOG_OUT':
      return {};
    default:
      return state;
  }
};

export default generalReducer;
