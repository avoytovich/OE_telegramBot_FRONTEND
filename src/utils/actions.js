export default (name, payload, id) => {
  switch (name) {
    case 'setAdmin':
      return {
        type: 'SET_ADMIN',
        payload,
      };
    case 'fetchGroup':
      return {
        type: 'FETCH_GROUP',
        payload,
      };
    case 'fetchSubGroup':
      return {
        type: 'FETCH_SUBGROUP',
        group_id: id,
        payload,
      };
    case 'fetchBookmark':
      return {
        type: 'FETCH_BOOKMARK',
        subGroup_id: id,
        payload,
      };
    case 'fetchArticle':
      return {
        type: 'FETCH_ARTICLE',
        payload,
      };
    case 'searchBookmark':
      return {
        type: 'SEARCH_BOOKMARK',
        payload,
      };
    case 'searchSubGroup':
      return {
        type: 'SEARCH_SUBGROUP',
        payload,
      };
    case 'resolveDescription':
      return {
        type: 'RESOLVE_DESCRIPTION',
        payload,
      };
    case 'errorNotification':
      return {
        type: 'ERROR_NOTIFICATION',
        payload,
      };
    case 'successNotification':
      return {
        type: 'SUCCESS_NOTIFICATION',
        payload,
      };
    case 'logOut':
      return {
        type: 'LOG_OUT',
      };
  }
};

// export const dispatchRemoveTitle = (payload) => ({
//   type: 'REMOVE_TITLE',
//   payload,
// });

// export const dispatchChangedSelectedMenuItem = (payload) => ({
//   type: 'CHANGE_SELECTED_MENU_ITEM',
//   payload,
// });
