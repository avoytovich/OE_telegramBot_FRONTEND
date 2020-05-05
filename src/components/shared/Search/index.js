import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Input } from 'antd';

import connect from './../../../utils/connectFunction';
import action from './../../../utils/actions';

import './search.sass';

function Search(props) {
  console.log('Search props', props);

  const { Search } = Input;

  useEffect(() => {
    props.dispatchErrorNotifiction('errorNotification', 'hayu');
  }, []);

  return (
    <div className="dashboard-search">
      <Search
        placeholder="input search text"
        onSearch={value => console.log(value)}
        style={{
          width: '50%',
        }}
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
    dispatchFetchGroup: actionData,
    dispatchErrorNotifiction: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Search));
