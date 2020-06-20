import React from 'react';
import { forEach } from 'lodash';

const customizeIcon = (props) => {
  //console.log('props SvgIcons', props);
  const helper = forEach(props, (value, key) => {
    return {
      ...helper,
      key: value,
    };
  });
  const { className, source } = helper;

  const resolvePath = () => `url(${source})`;

  return (
    <div
      className={className}
      style={{
        backgroundImage: resolvePath(),
        ...props,
      }}
    >
      {props.children}
    </div>
  );
};

export default customizeIcon;
