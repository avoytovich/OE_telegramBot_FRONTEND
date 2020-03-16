export default (name, payload) => {
  switch (name) {
  case 'fetchGroup':
    return {
      type: 'FETCH_GROUP',
      payload,
    }
  case 'removeTitle':
    console.log('tes');
    return {
      type: 'REMOVE_TITLE',
      payload,
    };
  case 'changedSelectedMenuItem':
    return {
      type: 'CHANGE_SELECTED_MENU_ITEM',
      payload,
    }
  }
}

// export const dispatchRemoveTitle = (payload) => ({
//   type: 'REMOVE_TITLE',
//   payload,
// });

// export const dispatchChangedSelectedMenuItem = (payload) => ({
//   type: 'CHANGE_SELECTED_MENU_ITEM',
//   payload,
// });
