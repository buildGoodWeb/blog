import React from 'react';
import { hierarchy, cluster } from 'd3-hierarchy';
import { select } from 'd3-selection';
import datas from './datas';
import './style.scss'

// Set the dimensions and margins of the diagram
const width = 600;
const height = 400;
const diameter = 10;
const distance = 160;

// Collapse the node and all it's children
function collapse(d) {
  if (d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

// Creates a curved (diagonal) path from parent to the child nodes
function diagonal(s, d) {
  const averageY = (s.y + d.y) / 2;
  return `M ${s.y}, ${s.x}
    C ${averageY}, ${s.x} ${averageY}, ${d.x} ${d.y}, ${d.x}`;
}

const clusterLayout = cluster().size([height, width - 100]);
// Assigns parent, children, height, depth
const root = hierarchy(datas, function (d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;


class CollapsibleTree extends React.PureComponent {
  componentDidMount() {
    const svg = select('.CollapsibleTree svg g');
    let i = 0;

    // Collapse after the second level
    root.children.forEach(collapse);
    update(root);

    function update(source) {

      // Assigns the x and y position for the nodes
      const treeData = clusterLayout(root);

      // Compute the new tree layout.
      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      nodes.forEach(function (d) { d.y = d.depth * distance });

      // Update the nodes...
      const node = svg.selectAll('g.node')
        .data(nodes, function (d) { return d.id || (d.id = ++i); });

      // Enter any new modes at the parent's previous position.
      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function (d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);

      // Add Circle for the nodes
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', diameter)
        .style("fill", function (d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      // Add labels for the nodes
      nodeEnter.append('text')
        .attr("dy", 2)
        .attr("x", function (d) {
          return d.children || d._children ? -diameter : diameter;
        })
        .attr("text-anchor", function (d) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function (d) { return d.data.name; });

      // UPDATE
      const nodeUpdate = nodeEnter.merge(node);

      // Transition to the proper position for the node
      nodeUpdate
        .attr("transform", function (d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

      // Update the node attributes and style
      nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", function (d) {
          return d._children ? "lightsteelblue" : "#fff";
        })
        .attr('cursor', 'pointer');


      // Remove any exiting nodes
     node.exit()
        .attr("transform", function (d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

      // Update the links...
      const link = svg.selectAll('path.link')
        .data(links, function (d) { return d.id; });

      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function (d) {
          const o = { x: source.x0, y: source.y0 }
          return diagonal(o, o)
        });

      // UPDATE
      const linkUpdate = linkEnter.merge(link);

      // Transition back to the parent element position
      linkUpdate
        .attr('d', function (d) { return diagonal(d, d.parent) });

      // Remove any exiting links
      link.exit()
        .attr('d', function (d) {
          const o = { x: source.x, y: source.y }
          return diagonal(o, o)
        })
        .remove();

      // Store the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      // Toggle children on click.
      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }
    }
  }
  render() {
    return (
      <div className="CollapsibleTree">
        <svg width={width} height={height}>
          <g transform="translate(50, 0)"/>
        </svg>
      </div>
    )
  }
}

export default CollapsibleTree;