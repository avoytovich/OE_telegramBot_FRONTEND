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
    case 'ERROR_NOTIFICATION':
      const changedStateErrorNotification = { ...state };
      changedStateErrorNotification.errorNotification = action.payload;
      return changedStateErrorNotification;
    case 'SUCCESS_NOTIFICATION':
      const changedStateSuccessNotification = { ...state };
      changedStateSuccessNotification.successNotification = action.payload;
      return changedStateSuccessNotification;
    case 'REMOVE_TITLE':
      const changedStateRemoveTitle = { ...state };
      changedStateRemoveTitle.content = state.content.filter(
        (el, index) => index != action.payload
      );
      if (!changedStateRemoveTitle.selectedMenuItem) {
        changedStateRemoveTitle.selectedMenuItem = 0;
      } else if (
        changedStateRemoveTitle.selectedMenuItem ==
        changedStateRemoveTitle.content.length
      ) {
        changedStateRemoveTitle.selectedMenuItem -= 1;
      }
      return changedStateRemoveTitle;
    // case 'ADD_LINK':
    //   const changedStateAddLink = { ...state };
    //   const content = [];
    //   changedStateAddLink.content.map((el, index) =>
    //     index == action.selectedMenuItem
    //       ? content.push({
    //           title: state.content[action.selectedMenuItem].title,
    //           links: [
    //             ...state.content[action.selectedMenuItem].links,
    //             action.payload,
    //           ],
    //         })
    //       : content.push(el)
    //   );
    //   changedStateAddLink.content = content;
    //   return changedStateAddLink;
    case 'REMOVE_LINK':
      const changedStateRemoveLink = { ...state };
      changedStateRemoveLink.content[action.selectedMenuItem] = {
        title: state.content[action.selectedMenuItem].title,
        links: [
          ...state.content[action.selectedMenuItem].links.filter(
            (el, index) => index != action.payload
          ),
        ],
      };
      return changedStateRemoveLink;
    case 'GET_LOCALSTORAGE':
      return JSON.parse(localStorage.getItem('store'));
    case 'AUTH':
      return { ...state, auth: action.payload };
    default:
      return state;
  }
};

export default generalReducer;
