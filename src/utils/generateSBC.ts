/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as d3 from 'd3'
import {
  formatProblemTrendMapData,
  getLast5YearsQuarters,
  getLast5YearsQuartersFromGivenStartDate
} from 'utils'

import dataVizStyles from '../components/StackedBarChart/datavizStyles.module.css'

import { getCriticalityDetail } from 'components/DetailCardV2'

const groupKey = 'year'
const stackKey = 'quarter'

const colors = {
  'Santa Catarina': '#000000',
  Florianópolis: '#000000',
  totalCityIncidents: '#000000'
}

const keys = ['totalCityIncidents']

const generateSBC = (
  value: any,
  serverData: any,
  measurement_unit: any,
  updatedAt: string
) => {
  if (!serverData || serverData?.length === 0) return
  let slope: string, criticality_info: { index: number; criticality: string }
  let data: Iterable<any>

  if (updatedAt) {
    data = formatProblemTrendMapData(
      getLast5YearsQuartersFromGivenStartDate(updatedAt),
      serverData
    )
  } else {
    data = formatProblemTrendMapData(getLast5YearsQuarters(), serverData)
  }

  // const data = formatProblemTrendMapData(getLast5YearsQuarters(), serverData)

  const trendTransformed =
    typeof value === 'number'
      ? Math.sign(value) === -1
        ? `${value}`
        : Math.sign(value) === 1
        ? `+${value}`
        : 0
      : '-'

  if (trendTransformed === 0 || trendTransformed) {
    if (trendTransformed === '-') {
      slope = 'unavailable'
    } else {
      slope =
        typeof trendTransformed === 'number'
          ? 'neutral'
          : trendTransformed.slice(0, 1) === '-'
          ? 'positive'
          : 'negative'
    }

    criticality_info = getCriticalityDetail(slope)
  }

  // Create a container element
  const container = document.createElement('div')

  d3.select(container).style('background-color', '#00000033')

  //graphic code
  const width = 780
  const height = 550

  const margin = {
    top: 30,
    right: 60,
    bottom: 60,
    left: 70
  }

  const definedBarData = data.filter((d: any) => d.totalCityIncidents !== 0)

  const allBarDataZero = definedBarData.length === 0

  const definedLineData = data.filter(
    (d: any) =>
      d.rateCityIncidents !== undefined && d.rateCityIncidents !== null
  )

  const allLineDataZero =
    definedLineData.filter((item: any) => item.rateCityIncidents === 0)
      .length === definedLineData.length

  const dataByYear = d3.group(data, (d: any) => d[groupKey])
  const dataByQuarter = d3.group(data, (d: any) => d[stackKey])

  const stackGenerator = d3.stack().keys(keys)
  const layers = stackGenerator(data)

  const svg = d3
    .select(container)
    .append('svg')
    .attr('id', 'rootDS')
    .attr('height', height)
    .attr('width', width)

  const outerGroupXScale = d3
    .scaleBand()
    .domain(dataByYear.keys())
    .range([margin.left, width - margin.right])
    .padding(0.05)
  const outerGroupXAxis = (g: any) => {
    g.attr('transform', `translate(0, ${height - margin.bottom / 2 - 16})`)
      .attr('class', 'x-axis')
      .call(d3.axisBottom(outerGroupXScale))
      .call((g: any) => g.selectAll('.domain').remove())
      .call((g: any) => {
        g.selectAll('.tick>line').remove()
      })
      .call((g: any) => {
        g.selectAll('.tick>text')
          .attr('class', dataVizStyles.tick_text)
          .style('font-family', 'Poppins')
          .style('font-size', '10px')
      })
      .call((g: any) => g.select('.domain').attr('d', 'M180,0H820'))
  }

  const innerGroupXScale = d3
    .scaleBand()
    .domain(dataByQuarter.keys())
    .range([0, outerGroupXScale.bandwidth()])
    .padding(0.25)
    .paddingInner(0.25)
    .paddingOuter(0.5)
  const innerGroupXAxis = (g: any) => {
    g.attr('transform', `translate(0, ${height - margin.bottom})`)
      .attr('class', 'x-axis')
      .call(d3.axisBottom(innerGroupXScale))
      .attr('font-size', '10px')
      .call((g: any) => g.selectAll('.domain').remove())
      .call((g: any) => {
        g.selectAll('.tick>line').remove()
      })
      .call((g: any) => {
        g.selectAll('.tick>text')
          .attr('class', dataVizStyles.tick_text)
          .style('font-family', 'Poppins')
          .style('font-size', '10px')
      })
  }

  const extent = [
    0.9 * d3.min(layers, (layer) => d3.min(layer, (d) => d[1])),
    1.1 * d3.max(layers, (layer) => d3.max(layer, (d) => d[1]))
  ]
  const [yMin] = extent
  const yScale = d3
    .scaleLinear()
    .domain(extent)
    .range([height - margin.bottom, margin.top])

  const yAxisLeft = (g: any) => {
    g.attr('transform', `translate(${margin.left}, 0)`)
      .attr('class', dataVizStyles.y_axis)
      .call(d3.axisLeft(yScale))
      .call((g: any) => g.selectAll('.domain').remove())
      .call((g: any) => {
        g.selectAll('.tick>line').remove()
      })
      .call((g: any) => {
        g.selectAll('.tick>text')
          .attr('class', dataVizStyles.tick_text)
          .style('font-family', 'Poppins')
          .style('font-size', '10px')
          .attr(
            'transform',
            allBarDataZero
              ? `translate(10, ${height / 2 - margin.bottom})`
              : 'translate(10, 0)'
          )
      })
  }

  const yAxisLabel = (g: any) => {
    g.append('text')
      .attr('transform', `rotate(-90, -45, ${height / 1.66})`)
      .attr('class', dataVizStyles.y_axis_label)
      .style('fill', '#000000')
      .style('font-family', 'Poppins')
      .style('font-size', '10px')
      .attr('x', 65)
      .attr('y', height / 1.66)
      .text('Número de ocorrências')
  }

  const yAxisLabelLinePlot = (g: any) => {
    g.append('text')
      .attr('transform', `rotate(90, 45, ${height / 2.6})`)
      .attr('class', `${dataVizStyles.y_axis_label} line_y_axis`)
      .style('fill', '#000000')
      .style('font-family', 'Poppins')
      .style('font-size', '10px')
      .attr('x', 40)
      .attr('y', height / 2.65)
      .text(measurement_unit)
  }

  const lineYScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.rateCityIncidents)])
    .range([height - margin.bottom, margin.top])

  const lineYAxis = (g: any) => {
    g.attr('transform', `translate(${width - margin.right}, 0)`)
      .attr('class', `y_axis_line`)
      .call(d3.axisRight(lineYScale))
      .call((g: any) => g.selectAll('.domain').remove())
      .call((g: any) => {
        g.selectAll('.tick>line').remove()
      })
      .call((g: any) => {
        g.selectAll('.tick>text')
          .attr('class', dataVizStyles.tick_text)
          .style('font-family', 'Poppins')
          .style('font-size', '10px')
          .attr(
            'transform',
            allLineDataZero ? `translate(0, ${height / 2 - margin.bottom})` : ''
          )
      })
  }

  const combinedData = data.map((d: any) => ({
    [groupKey]: d[groupKey],
    [stackKey]: d[stackKey],
    values: [
      { key: keys[0], value: d[keys[0]] },
      { key: keys[1], value: d[keys[1]] }
    ],
    rateCityIncidents: d.rateCityIncidents
  }))

  // const tooltip = d3
  //   .select('#dataViz')
  //   .append('div')
  //   .attr('class', 'tooltip')
  //   .style('opacity', 0)

  const stateG = svg
    .selectAll('.state')
    .data(dataByYear)
    .join('g')
    .attr('class', 'state')
    .attr('fill', (d) => colors[d[0]])
    .attr('transform', (d) => `translate(${outerGroupXScale(d[0])}, 0)`)

  stateG.append('g').attr('class', 'stateAxis').call(innerGroupXAxis)

  const yearG = stateG
    .selectAll('.yearG')
    .data((d) => {
      const filteredByState = data.filter((i: any) => i[groupKey] === d[0])
      const groupedByQuarter = d3.group(
        filteredByState,
        (a: any) => a[stackKey]
      )
      return groupedByQuarter
    })
    .join('g')
    .attr('class', 'yearG')
    .attr('transform', (d) => {
      return `translate(${innerGroupXScale(d[0])}, 0)`
    })

  yearG
    .selectAll('.layers')
    .data((d) => {
      return stackGenerator(d[1])
    })
    .join('rect')
    .attr('class', 'layers')
    .attr('y', (d) => yScale(d[0][1]))
    .attr('fill', (d) => colors[d.key])
    .attr('width', () => innerGroupXScale.bandwidth())
    .attr('height', (d) => {
      const lower = d[0][0]
      const upper = d[0][1]
      const firstBarAdjustment = lower === 0 ? yMin : 0
      return yScale(lower + firstBarAdjustment) - yScale(upper)
    })

  yearG
    .selectAll('.textValue')
    .data((d) => {
      return stackGenerator(d[1])
    })
    .join('text')
    .attr('class', 'layers2')
    .attr('y', (d) => yScale(d[0][1]) - 5)
    .attr('fill', () => 'black')
    .text((d) => {
      return d.key === keys[0]
        ? `${d[0].data[keys[0]] !== 0 ? d[0].data[keys[0]] : ''}`
        : `${d[0].data[keys[1]]}`
    })
    .style('font-family', 'Poppins')
    .style('font-size', '10px')
    .style('text-anchor', 'right')

  const line = d3
    .line()
    .defined((d) => d.rateCityIncidents !== undefined)
    .x(
      (d) =>
        outerGroupXScale(d[groupKey]) +
        innerGroupXScale(d[stackKey]) +
        innerGroupXScale.bandwidth() / 2
    )
    .y((d) =>
      allLineDataZero ? height - margin.bottom : lineYScale(d.rateCityIncidents)
    )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const linePath = svg
    .append('path')
    .datum(
      combinedData.filter((item: any) => item.rateCityIncidents !== undefined)
    )
    .attr('class', 'line-path')
    .attr('fill', 'none')
    .attr('stroke-width', 2)
    .attr('stroke', '#50C878')
    .attr('d', line)

  svg
    .selectAll('.circle')
    .data(combinedData)
    .enter()
    .append('circle')
    .attr('class', 'circle')
    .attr(
      'cx',
      (d) =>
        outerGroupXScale(d[groupKey]) +
        innerGroupXScale(d[stackKey]) +
        innerGroupXScale.bandwidth() / 2
    )
    .attr('cy', (d: any) =>
      allLineDataZero ? height - margin.bottom : lineYScale(d.rateCityIncidents)
    )
    .attr('r', (d) =>
      d.rateCityIncidents !== undefined && d.rateCityIncidents !== null ? 5 : 0
    )
    .attr('fill', '#50C878')

  svg
    .selectAll('.textA')
    .data(combinedData)
    .enter()
    .append('text')
    .attr('class', 'circle-label')
    .attr(
      'x',
      (d) =>
        outerGroupXScale(d[groupKey]) +
        innerGroupXScale(d[stackKey]) +
        innerGroupXScale.bandwidth() / 2 -
        3.5
    )
    .attr('y', (d: any) =>
      allLineDataZero
        ? height - margin.bottom
        : lineYScale(d.rateCityIncidents) - 12.5 || 0
    )
    .text((d) =>
      d.rateCityIncidents !== undefined && d.rateCityIncidents !== null
        ? `${`${d.rateCityIncidents}`.slice(0, 4)}`
        : 0
    )
    .attr('fill', (d) =>
      d.rateCityIncidents !== undefined && d.rateCityIncidents !== null
        ? '#50C878'
        : '#FFFFFF'
    )
    .style('text-anchor', 'middle')
    .style('font-size', '10px')

  svg.append('g').call(outerGroupXAxis)
  svg.append('g').call(yAxisLeft).call(yAxisLabel)
  svg.append('g').call(lineYAxis).call(yAxisLabelLinePlot)

  svg.node()

  // Extract the HTML string of the container
  const htmlString = container.innerHTML

  // Remove the container from the DOM
  container.remove()

  return {
    html: htmlString,
    trend: trendTransformed,
    slope: slope,
    criticality_info: criticality_info
  }
}

export default generateSBC
