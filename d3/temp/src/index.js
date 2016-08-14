'use strict';

import './style.scss';


const URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const colors = ['#5e4fa2', '#3288bd', '#66c2a5', '#abdda4', '#e6f598', '#ffffbf', '#fee08b', '#fdae61', '#f46d43', '#d53e4f', '#9e0142'];

const margin = {
  top: 10,
  right: 50,
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

function tooltipHTML(d, baseT) {
  const month = months[+d.month - 1];
  const {year} = d;
  const temp = (d.variance + baseT).toFixed(1);
  return `<p>${month} ${year}</p>
    <p>${temp}&#8451;</p>`;
}

function build(payload) {
  console.log(payload);
  const baseT = payload.baseTemperature;
  const data = payload.monthlyVariance;

  const minYear = d3.min(data, (d) => +d.year);
  const maxYear = d3.max(data, (d) => +d.year);

  const minDT = d3.min(data, (d) => +d.variance);
  const maxDT = d3.max(data, (d) => +d.variance);

  const barWidth = WIDTH / (maxYear - minYear);
  const barHeight = HEIGHT / 12;

  const x = d3.scaleLinear()
    .domain([minYear, maxYear + 1])
    .range([0, WIDTH]);

  const y = d3.scaleLinear()
    .domain([1, 13])
    .range([0, HEIGHT]);

  const colorScale = d3.scaleQuantile()
    .domain([baseT + minDT, baseT + maxDT])
    .range(colors);

  svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0, ' + HEIGHT + ')')
      .call(d3.axisBottom(x)
        .ticks(10, 'f'));


  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(+d.year))
    .attr('y', (d) => y(+d.month))
    .attr('height', (d) => barHeight + 0.8)
    .attr('width', (d) => x(+d.year + 1) - x(+d.year))
    .attr('fill', (d) => colorScale(baseT + (+d.variance)))
    .on('mouseover', (d) => {
      const html = tooltipHTML(d, baseT);
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

  svg.selectAll('.month-label')
    .data(months)
    .enter()
    .append('text')
    .attr('class', 'month-label')
    .attr('x', 5)
    .attr('y', (d) => y(months.indexOf(d)))
    .attr('dx', -70)
    .attr('dy', 80)
    .text((d) => d)
    .attr('font-size', 10)
    .attr('fill', '#000000');

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
