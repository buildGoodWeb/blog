import React from 'react';
import './style.scss';

function LinkedHeading({ h, children, ...props }) {
  const key = window.encodeURIComponent(children);
  const H = `h${h}`;
  return (
    <H id={key} className="heading">
      <span>{children}</span>
      <a name={children} href={`#${key}`} className="anchor">
        #
      </a>
    </H>
  );
}

export default LinkedHeading;
