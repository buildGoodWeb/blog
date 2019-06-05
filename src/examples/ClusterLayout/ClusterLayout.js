import React from 'react';
import { hierarchy, cluster } from 'd3-hierarchy';
import data from './datas';
import './style.scss';

const width = 450;
const height = 500;

const clusterLayout = cluster().size([height - 50, width - 100]);
const root = hierarchy(data, function (d) {
  return d.children;
});
clusterLayout(root);

// function formatPath(d) {
//   const averageY = (d.source.y + d.target.y) / 2;
//   return `M ${d.source.y}, ${d.source.x}
//     C ${averageY}, ${d.source.x} ${averageY}, ${d.target.x} ${d.target.y}, ${d.target.x}`;
// }

// function formatPath(d) {
//   const averageX = (d.source.x + d.target.x) / 2;
//   return `M ${d.source.x}, ${d.source.y}
//     C ${averageX}, ${d.source.y} ${averageX}, ${d.target.y} ${d.target.x}, ${d.target.y}`;
// }

class ClusterLayout extends React.PureComponent {
  renderNodes = () => {
    return root.descendants().map((d, idx) => {
      return (
        <g
          className="node"
          key={`link_${idx}`}
        >
          <circle r="4" cx={d.x} cy={d.y}/>
        </g>
      )
    });
  }
  renderLinks = () => {
    return root.links().map((d, idx) => {
      return (
        <line
          className="link"
          key={`link_${idx}`}
          x1={d.source.x}
          y1={d.source.y}
          x2={d.target.x}
          y2={d.target.y}
        />
      )
    });
  }
  // renderLinks = () => {
  //   return root.links().map((d, idx) => {
  //     return (
  //       <path
  //         className="link"
  //         d={formatPath(d)}
  //         key={`link_${idx}`}
  //       />
  //     )
  //   });
  // }
  renderSvg = () => {
    return (
      <svg width={width} height={height}>
        <g transform="translate(0, 40)">
          <g className="links">
            {this.renderLinks()}
          </g>
          <g className="nodes">
            {this.renderNodes()}
          </g>
        </g>
      </svg>
    )
  }
  render() {
    return (
      <div className="Dendrogram">
        {this.renderSvg()}
      </div>
    )
  }
}

export default ClusterLayout;