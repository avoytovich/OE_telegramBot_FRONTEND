import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, List } from 'antd';

import connect from './../../../utils/connectFunction';
import action from './../../../utils/actions';
import { wrapRequest } from './../../../utils/api';
import { API } from './../../../helper/constants';
import { get } from 'lodash';

import './search.sass';

function Search(props) {
  console.log('Search props', props);

  const { Search } = Input;

  const groups = get(props, 'store.groups');
  const user_id = get(props, 'match.params.id');

  const { searchBookmark } = props.store;

  useEffect(() => {
    searchBookmark &&
      searchBookmark.forEach(each => {
        wrapRequest({
          method: 'GET',
          url: `${API.URL}:${API.PORT}/user/${user_id}/subgroup/${
            each.SubGroupOfBookmarksId
          }`,
          mode: 'cors',
          cache: 'default',
        })
          .then(data => {
            if ([200, 201].includes(data.status)) {
              const subGroup = get(data, 'data.subGroup');
              const group = groups.filter(
                each => each.id == subGroup.GroupOfBookmarksId
              );
              let payloadSubGroup = {
                id: each.id,
                searchSubGroup: subGroup,
              };
              props.dispatchSearchSubGroups('searchSubGroup', payloadSubGroup);
              let payloadResolveDescription = {
                id: each.id,
                structure: `${group[0].name} /\ ${subGroup.name}`,
              };
              props.dispatchResolveDescription(
                'resolveDescription',
                payloadResolveDescription
              );
            }
          })
          .catch(e => props.dispatchErrorNotifiction('errorNotification', e));
      });
  }, [searchBookmark]);

  const onSearch = async value => {
    await wrapRequest({
      method: 'GET',
      url: `${API.URL}:${API.PORT}/user/${user_id}/search?searchWords=${value}`,
      mode: 'cors',
      cache: 'default',
    })
      .then(data => {
        if ([200, 201].includes(data.status)) {
          const listBookmarks = get(data, 'data.bookmarks');
          props.dispatchSearchBookmarks('searchBookmark', listBookmarks);
        }
      })
      .catch(e => props.dispatchErrorNotifiction('errorNotification', e));
  };

  const resolveLink = (subGroup_id, bookmark_id) => {
    const { searchSubGroup } = props.store;
    const subGroup = searchSubGroup.filter(each => each.id == subGroup_id);
    const group_id = get(subGroup, '[0].GroupOfBookmarksId');
    return `/user/${user_id}/group/${group_id}/subgroup/${subGroup_id}/bookmark/${bookmark_id}`;
  };

  const data = get(props, 'store.searchBookmark') || [];
  const resolveDescription = get(props, 'store.resolveDescription');

  return (
    <div className="dashboard-search">
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{
          width: '50%',
        }}
      />
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            {resolveDescription && (
              <List.Item.Meta
                title={
                  <Link to={resolveLink(item.SubGroupOfBookmarksId, item.id)}>
                    {item.title}
                  </Link>
                }
                description={resolveDescription[item.id]}
              />
            )}
          </List.Item>
        )}
      />
    </div>
  );
}

const mapStateToProps = state => {
  console.log('Search state');
  return { store: state };
};

const mapDispatchToProps = dispatch => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchSearchBookmarks: actionData,
    dispatchSearchSubGroups: actionData,
    dispatchResolveDescription: actionData,
    dispatchErrorNotifiction: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Search));
