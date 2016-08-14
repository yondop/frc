'use strict';

import './style.scss';
import topojson from 'topojson';

const URL_METEORS = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';
const URL_EARTH = 'https://raw.githubusercontent.com/mbostock/topojson/master/examples/world-50m.json';



const WIDTH = window.innerWidth - 100;
const HEIGHT = window.innerHeight - 100;


const svg = d3.select('.world')
  .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

const tooltip = d3.select('.world')
  .append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

const projection = d3.geoEquirectangular()
  .translate([WIDTH / 2,HEIGHT / 2 - 20])
  .scale(200);

const path = d3.geoPath()
  .projection(projection);


function buildMap(world) {
  svg.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);

  svg.insert("path", ".graticule")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path);
}

function buildMeteors(data) {
  data.features.sort((a, b) => b.properties.mass - a.properties.mass);
  svg.append('g')
  .selectAll('path')
    .data(data.features)
    .enter()
      .append('circle')
      .attr('cx', (d) => projection([d.properties.reclong,d.properties.reclat])[0])
      .attr('cy', (d) => projection([d.properties.reclong,d.properties.reclat])[1])
      .attr('r', (d) =>  {
        var range = 718750/2/2;

        if (d.properties.mass <= range) return 2;
        else if (d.properties.mass <= range*2) return 10;
        else if (d.properties.mass <= range*3) return 20;
        else if (d.properties.mass <= range*20) return 30;
        else if (d.properties.mass <= range*100) return 40;
        return 50;
      })
      .attr('fill-opacity', (d) =>  {
        var range = 718750/2/2;
        if (d.properties.mass <= range) return 1;
        return .5;
      })
      .attr('stroke-width', 1)
      .attr('stroke', '#EAFFD0')
      .attr('fill', (d) =>  d.color )
      .on('mouseover', (d) => {
        const {name, mass, fall, recclass} = d.properties;

        const html =
          `<p>name: ${name}</p>
          <p>mass: ${mass}</p>
          <p>fall: ${fall}</p>
          <p>recclass: ${recclass}</p>`;

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


fetch(URL_EARTH)
  .then((response) => {
    return response.json()
  })
  .then((payload) => {
    buildMap(payload);

    fetch(URL_METEORS)
      .then((response) => {
        return response.json()
      })
      .then((payload) => {
        buildMeteors(payload);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
