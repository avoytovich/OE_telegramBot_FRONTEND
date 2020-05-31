const generalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ADMIN':
      const changedStateSetAdmin = { ...state };
      changedStateSetAdmin.isAdmin = action.payload;
      return changedStateSetAdmin;
    case 'FETCH_GROUP':
      return {
        ...state,
        groups: action.payload,
      };
    case 'FETCH_SUBGROUP':
      return {
        ...state,
        subGroups: { ...state.subGroups, [action.group_id]: action.payload },
      };
    case 'FETCH_BOOKMARK':
      return {
        ...state,
        bookmarks: { ...state.bookmarks, [action.subGroup_id]: action.payload },
      };
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
