export default (name, payload) => {
  switch (name) {
    case 'fetchGroup':
      return {
        type: 'FETCH_GROUP',
        payload,
      };
    case 'fetchSubGroup':
      return {
        type: 'FETCH_SUBGROUP',
        payload,
      };
    case 'fetchBookmark':
      return {
        type: 'FETCH_BOOKMARK',
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
