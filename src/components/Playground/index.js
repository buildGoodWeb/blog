import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import './style.scss';

export default ({ isHide, children, previewOnly }) => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  }
  return (
    <LiveProvider scope={{ ReactDOM }} code={children.trim()}>
      {previewOnly ? <LivePreview/> : (
        <div className={`playground ${(show || !isHide) ? 'show' : ''}`}>
          {!isHide ? (
            <LiveEditor disabled/>
          ) : (
            <>
              <div className="playground-error">
                <LiveError />
              </div>
              <div className="playground-view">
                <LivePreview />
                <button onClick={toggle}>{show ? '隐藏代码' : '展开代码'}</button>
              </div>
              {show && <LiveEditor />}
            </>
          )}
        </div>
      )}
    </LiveProvider>
  )
}