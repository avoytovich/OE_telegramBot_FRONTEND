const generalReducer = (state, action) => {
  switch (action.type) {
  case 'FETCH_GROUP':
    const changedStateFetchGroup = {...state};
    changedStateFetchGroup.groups = action.payload;
    return changedStateFetchGroup;
  case 'CHANGE_SELECTED_MENU_ITEM':
    const changedStateSelectedMenuItem = {...state};
    changedStateSelectedMenuItem.selectedMenuItem = action.payload;
    return changedStateSelectedMenuItem;
  case 'ADD_TITLE':
    const changedStateAddTitle = {...state};
    changedStateAddTitle.content = [
      ...state.content,
      {
        title: action.payload,
        links: [],
      },
    ];
    return changedStateAddTitle;
  case 'REMOVE_TITLE':
    const changedStateRemoveTitle = {...state};
    changedStateRemoveTitle.content = state.content.filter((el, index) => index != action.payload);
    if (!changedStateRemoveTitle.selectedMenuItem) {
      changedStateRemoveTitle.selectedMenuItem = 0;
    } else if (changedStateRemoveTitle.selectedMenuItem == changedStateRemoveTitle.content.length) {
      changedStateRemoveTitle.selectedMenuItem -= 1;
    }
    return changedStateRemoveTitle;
  case 'ADD_LINK':
    const changedStateAddLink = {...state};
    const content = [];
    changedStateAddLink.content.map((el, index) => index == action.selectedMenuItem ?
      content.push({
        title: state.content[action.selectedMenuItem].title,
        links: [...state.content[action.selectedMenuItem].links, action.payload]
      }) : content.push(el)
    );
    changedStateAddLink.content = content;
    return changedStateAddLink;
  case 'REMOVE_LINK':
    const changedStateRemoveLink = {...state};
    changedStateRemoveLink.content[action.selectedMenuItem] = {
      title: state.content[action.selectedMenuItem].title,
      links: [...state.content[action.selectedMenuItem].links.filter((el, index) => index != action.payload)]
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