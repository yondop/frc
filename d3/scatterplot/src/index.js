'use strict';

import './style.scss';


const URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

const margin = {
  top: 30,
  right: 90,
  bottom: 30,
  left: 70
}

const FULL_WIDTH = 1000;
const FULL_HEIGHT = 600;
const WIDTH = FULL_WIDTH - margin.left - margin.right;
const HEIGHT = FULL_HEIGHT - margin.bottom - margin.top;
const R = 8;
const legendData = [
  {
    color: 'red',
    text: 'Doping allegations'
  },
  {
    color: 'green',
    text: 'No doping allegations'
  }
];

const svg = d3.select('.chart')
  .append('svg')
    .attr('width', FULL_WIDTH)
    .attr('height', FULL_HEIGHT)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


const tooltip = d3.select('.card')
  .append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

function tooltipHTML(d) {
  return `<p>${d.Name}: ${d.Nationality}</p>
<p>Year: ${d.Year} Time:${d.Time}</p>
  <p>${d.Name}: ${d.Nationality}</p>`;
}

function build(payload) {
  console.log(payload);
  const data = payload;
  const minSeconds = d3.min(data, (d) => +d.Seconds);
  const maxSeconds = d3.max(data, (d) => +d.Seconds);

  const x = d3.scaleLinear()
    .domain([0, maxSeconds - minSeconds + 10])
    .range([WIDTH, 0]);

  const y = d3.scaleLinear()
    .domain([1, data.length + 1])
    .range([0, HEIGHT]);



  svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0, ' + HEIGHT + ')')
      .call(d3.axisBottom(x))
    .append('text')
      .attr('class', 'axis-title')
      .attr('x', WIDTH - 50)
      .attr('dy', '-6px')
      .attr('font-size', '10px')
      .text('Seconds behind best')
      .attr('fill', '#000000');

  svg.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y))
    .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '6px')
      .attr('font-size', '10px')
      .text('Rank')
      .attr('fill', '#000000');


  const legends = [
    svg.append('g')
    .attr('transform', 'translate(' + (WIDTH - 200) + ',' + (HEIGHT / 2 + 100) + ')'),
    svg.append('g')
    .attr('transform', 'translate(' + (WIDTH - 200) + ',' + (HEIGHT / 2 + 120) + ')')];

  legends[0].append('circle')
      .attr('r', R)
      .attr('fill', 'green');
  legends[0].append('text')
    .attr('class', 'axis-title')
    .attr('dx', '14px')
    .attr('dy', '4px')
    .attr('font-size', '10px')
    .text('No doping allegations')
    .attr('fill', '#000000');

  legends[1].append('circle')
      .attr('r', R)
      .attr('fill', 'red');
  legends[1].append('text')
    .attr('class', 'axis-title')
    .attr('dx', '14px')
    .attr('dy', '4px')
    .attr('font-size', '10px')
    .text('Doping allegations')
    .attr('fill', '#000000');

  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'bar')
    .attr('r', R)
    .attr('cx', (d) => x(+d.Seconds - minSeconds))
    .attr('cy', (d) => y(+d.Place))
    .attr('fill', (d) => d.Doping
      ? 'red'
      : 'green')
    .on('mouseover', (d) => {
      const html = tooltipHTML(d);
      console.log(html);
      tooltip
          .style('opacity', 0.7);
      tooltip.html(html);
    })
    .on('mouseout', (d) => {
      tooltip.style('opacity', 0);
    });

  svg.selectAll('.label')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'label')
    .text((d) => d.Name)
    .attr('x', (d) => x(+d.Seconds - minSeconds))
    .attr('y', (d) => y(+d.Place))
    .attr('dx', 10)
    .attr('dy', '4px')
    .attr('font-size', '10px');
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
