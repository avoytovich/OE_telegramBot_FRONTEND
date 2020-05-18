import React, { useState, useEffect } from 'react';
import connect from './../../../utils/connectFunction';
import action from './../../../utils/actions';

import './notification.sass';

function Notification(props) {
  // console.log('Notification props', props);

  const [right, setRight] = useState('-100%');

  useEffect(() => showErrorNotification, [props.store.errorNotification]);

  useEffect(() => showSuccessNotification, [props.store.successNotification]);

  const showErrorNotification = () => {
    setRight('16px');
    setTimeout(() => {
      props.dispatchErrorNotification('errorNotification', null);
      setRight('-100%');
    }, 3000);
  };

  const showSuccessNotification = () => {
    setRight('16px');
    setTimeout(() => {
      props.dispatchSuccessNotifiction('successNotification', null);
      setRight('-100%');
    }, 3000);
  };

  const errorNotification = message => (
    <div
      className="wrapper-notification"
      style={{
        position: 'absolute',
        top: '96px',
        right: right,
        backgroundColor: 'red',
      }}
    >
      {message}
    </div>
  );

  const successNotification = message => (
    <div
      className="wrapper-notification"
      style={{
        position: 'absolute',
        top: '96px',
        right: right,
        backgroundColor: 'green',
      }}
    >
      {message}
    </div>
  );

  return (
    (props.store.errorNotification &&
      errorNotification(props.store.errorNotification.message)) ||
    (props.store.successNotification &&
      successNotification(props.store.successNotification.message)) ||
    null
  );
}

const mapStateToProps = state => {
  return { store: state };
};

const mapDispatchToProps = dispatch => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchErrorNotification: actionData,
    dispatchSuccessNotifiction: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
