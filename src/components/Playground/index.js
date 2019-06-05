import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import examples from '../../examples';
import './style.scss';

export default ({ run, children, previewOnly }) => {
  const [show, setShow] = useState(true);
  const toggle = () => {
    setShow(!show);
  }
  return (
    <LiveProvider scope={{ ReactDOM, ...examples }} code={children.trim()}>
      {previewOnly ? <LivePreview/> : (
        <div className={`playground ${(show || !run) ? 'show' : ''}`}>
          {!run ? (
            <LiveEditor disabled/>
          ) : (
            <>
              <div className="playground-error">
                <LiveError />
              </div>
              <div className="playground-view">
                <LivePreview />
                <button className="pure-button pure-button-primary" onClick={toggle}>{show ? '隐藏代码' : '展开代码'}</button>
              </div>
              {show && <LiveEditor />}
            </>
          )}
        </div>
      )}
    </LiveProvider>
  )
}