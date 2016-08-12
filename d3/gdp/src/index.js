'use strict';

import './style.scss';


const URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currency = d3.format("$,.2f");

const margin = {
  top: 10,
  right: 10,
  bottom: 30,
  left: 70
}

const FULL_WIDTH = 1000;
const FULL_HEIGHT = 600;
const WIDTH = FULL_WIDTH - margin.left - margin.right;
const HEIGHT = FULL_HEIGHT - margin.bottom - margin.top;

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

function build(payload) {
  console.log(payload);
  const data = payload.data;
  const fromDate = new Date(payload.from_date);
  const toDate = new Date(payload.to_date);
  const barWidth = Math.ceil(WIDTH / data.length);

  const x = d3.scaleTime()
    .domain([fromDate, toDate])
    .rangeRound([0, WIDTH]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d[1])])
    .range([HEIGHT, 0]);

  svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0, ' + HEIGHT + ')')
    .call(d3.axisBottom(x));

  svg.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(y));

  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(new Date(d[0])))
    .attr('y', (d) => y(d[1]))
    .attr('height', (d) => (HEIGHT - y(d[1])))
    .attr('width', barWidth)
    .on('mouseover', (d) => {
      const date = new Date(d[0]);
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const amount = currency(d[1]);

      const html =
        `<span class="amount">${amount} &nbsp;bn </span>
        <span class="date">${month} - ${year} </span>`

      tooltip
          .style('opacity', 0.7);
      tooltip.html(html)
        .style('top', (d3.event.pageY - 50) + 'px')
        .style('left', (d3.event.pageX+ 5) + 'px');
    })
    .on('mouseout', (d) => {
      tooltip
          .style('opacity', 0);
    });
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
