export default (name, payload, id) => {
  switch (name) {
    case 'fetchFollower':
      return {
        type: 'FETCH_FOLLOWER',
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
