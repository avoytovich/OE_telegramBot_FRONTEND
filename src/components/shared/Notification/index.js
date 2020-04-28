import React, { useState, useEffect } from 'react';
import connect from './../../../utils/connectFunction';
import action from './../../../utils/actions';

import './notification.sass';

const Notification = props => {
  console.log('Notification props', props);

  const [right, setRight] = useState('-100%');

  useEffect(() => showNotification, [props.store.errorNotification]);

  const showNotification = () => {
    setRight('16px');
    setTimeout(() => {
      props.dispatchErrorNotification('errorNotification', null);
      setRight('-100%');
    }, 3000);
  };

  return (
    (props.store.errorNotification && (
      <div
        className="wrapper-notification"
        style={{
          position: 'absolute',
          top: '96px',
          right: right,
          backgroundColor: 'red',
        }}
      >
        {props.store.errorNotification.message}
      </div>
    )) ||
    null
  );
};

const mapStateToProps = state => {
  return { store: state };
};

const mapDispatchToProps = dispatch => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchErrorNotification: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
