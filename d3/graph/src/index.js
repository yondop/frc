'use strict';

import './style.scss';


const URL = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';




const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;


const svg = d3.select('.chart')
  .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

const simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id((d) => d.index))
    .force("charge", d3.forceManyBody())
    .force('center', d3.forceCenter(WIDTH / 2, HEIGHT / 2));

function build(payload) {
  let {links, nodes} = payload;

  let link = svg.append('g')
    .selectAll('line')
    .data(links)
    .enter().append('line')
    .attr('class', 'link');


  let node = d3.select('.flagbox')
    .selectAll('.node')
    .data(nodes)
    .enter().append('div')
      .attr('r', 5)
      .attr('class', (d) => `flag flag-${d.code}`)
      .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

  simulation
        .nodes(nodes)
        .on('tick', ticked);

    simulation.force('link')
        .links(links);

    function ticked() {
      link
          .attr('x1', function(d) { return d.source.x; })
          .attr('y1', function(d) { return d.source.y; })
          .attr('x2', function(d) { return d.target.x; })
          .attr('y2', function(d) { return d.target.y; });

      node
        .style('left', d => (d.x - 16) + 'px')
        .style('top', d => (d.y - 16) + 'px');
    }
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}


fetch(URL)
  .then((response) => {
    return response.json()
  })
  .then((payload) => {
    build(payload);
  })
  .catch((error) => {
    console.log(error);
  });
