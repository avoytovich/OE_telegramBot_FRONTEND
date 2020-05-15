const generalReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_GROUP':
      const changedStateFetchGroup = { ...state };
      changedStateFetchGroup.groups = action.payload;
      return changedStateFetchGroup;
    case 'FETCH_SUBGROUP':
      const changedStateFetchSubGroup = { ...state };
      changedStateFetchSubGroup.subGroups = action.payload;
      return changedStateFetchSubGroup;
    case 'FETCH_BOOKMARK':
      const changedStateFetchBookmark = { ...state };
      changedStateFetchBookmark.bookmarks = action.payload;
      return changedStateFetchBookmark;
    case 'SEARCH_BOOKMARK':
      const changedStateSearchBookmark = { ...state };
      changedStateSearchBookmark.searchBookmark = action.payload;
      return changedStateSearchBookmark;
    case 'SEARCH_SUBGROUP':
      const changedStateSearchSubGroup = { ...state };
      if (changedStateSearchSubGroup.searchSubGroup) {
        changedStateSearchSubGroup.searchSubGroup[action.payload.id] =
          action.payload.searchSubGroup;
      } else {
        changedStateSearchSubGroup.searchSubGroup = [];
        changedStateSearchSubGroup.searchSubGroup[action.payload.id] =
          action.payload.searchSubGroup;
      }
      return changedStateSearchSubGroup;
    case 'RESOLVE_DESCRIPTION':
      const changedStateResolveDescription = { ...state };
      if (changedStateResolveDescription.resolveDescription) {
        changedStateResolveDescription.resolveDescription[action.payload.id] =
          action.payload.structure;
      } else {
        changedStateResolveDescription.resolveDescription = [];
        changedStateResolveDescription.resolveDescription[action.payload.id] =
          action.payload.structure;
      }
      return changedStateResolveDescription;
    case 'ERROR_NOTIFICATION':
      const changedStateErrorNotification = { ...state };
      changedStateErrorNotification.errorNotification = action.payload;
      return changedStateErrorNotification;
    case 'SUCCESS_NOTIFICATION':
      const changedStateSuccessNotification = { ...state };
      changedStateSuccessNotification.successNotification = action.payload;
      return changedStateSuccessNotification;
    default:
      return state;
  }
};

export default generalReducer;
