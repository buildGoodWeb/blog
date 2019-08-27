import React from 'react';
import './style.scss';

function Toc({ headings, location }) {
  return (
    <div className="main-toc row">
      <div>目录</div>
      {headings.map(({ depth, value }, idx) => {
        const key = encodeURIComponent(value);
        const isCurrent = location.hash && location.hash.includes(key);
        return (
          <div key={idx} className={`main-toc--li${depth}`}>
            <a href={`#${key}`} className={`${isCurrent ? 'current' : ''}`}>
              {value}
            </a>
          </div>
        )
      })}
    </div>
  );
}

export default Toc;