/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { MONTH_MAPPING } from 'constants/Global'

import * as d3 from 'd3'
import _ from 'lodash'
import {
  formatProblemPerformanceMapData,
  getLast12MonthsIncreasingOrder,
  getLast12MonthsIncreasingOrderFromGivenStartDate
} from 'utils'

const generateBLC = (value: any, serverData: any, updatedAt: string) => {
  if (!serverData || serverData?.length === 0) return
  let slope: string
  const performanceTransformed =
    typeof value === 'number'
      ? Math.sign(value) === -1
        ? `${value}`
        : Math.sign(value) === 1
        ? `+${value}`
        : 0
      : '-'

  if (performanceTransformed === 0 || performanceTransformed) {
    if (performanceTransformed === '-') {
      slope = 'unavailable'
    } else {
      slope =
        typeof performanceTransformed === 'number'
          ? 'neutral'
          : performanceTransformed.slice(0, 1) === '-'
          ? 'positive'
          : 'negative'
    }
  }

  let initialMapData
  if (updatedAt) {
    initialMapData = getLast12MonthsIncreasingOrderFromGivenStartDate(updatedAt)
  } else {
    initialMapData = getLast12MonthsIncreasingOrder()
  }

  const finalData = formatProblemPerformanceMapData(initialMapData, serverData)

  const lineData = _.cloneDeep(finalData)

  const margin = { top: 60, right: 0, bottom: 50, left: 84 }
  const width = 780 - margin.left - margin.right
  const height = 600 - margin.top - margin.bottom

  const container = document.createElement('div')

  const parseDate = (d: any) => {
    return new Date(d.year, d.month - 1)
  }

  lineData.forEach((d) => {
    d.date = parseDate(d)
    d.stateRate = d.stateRate !== undefined ? +d.stateRate : undefined
  })

  const definedBarData = finalData.filter((d: any) => d.cityRate !== 0)

  const allBarDataZero = definedBarData.length === 0

  const definedLineData = finalData.filter(
    (d: any) => d.stateRate !== undefined
  )

  const allLineDataZero =
    definedLineData.filter((item: any) => item.stateRate === 0).length ===
    definedLineData.length

  const x = d3
    .scaleBand()
    .domain(finalData.map((d) => `${MONTH_MAPPING[d.month]}, ${d.year}`))
    .range([0, width])
    .paddingInner(0.4)
    .paddingOuter(0.25)

  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(finalData, (d) => {
        return Math.max(d.cityRate || 0, d.stateRate || 0)
      })
    ])
    .nice()
    .range([height, 0])

  const xAxis = (g: any) =>
    g
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'x-axis')
      .call(d3.axisBottom(x).tickSize(0))
      .call((g: any) => g.select('.domain').remove())

  const yAxis = (g: any) =>
    g
      .attr('class', `y-axis`)
      .call(d3.axisLeft(y).tickSize(0))
      .call((g: any) => g.select('.domain').remove())

  d3.select(container).style('background-color', '#00000033')

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  svg
    .append('g')
    .selectAll('rect')
    .data(finalData)
    .enter()
    .append('rect')
    .attr('class', 'rect-box')
    .attr('x', (d) => x(`${MONTH_MAPPING[d.month]}, ${d.year}`))
    .attr('y', (d) => y(d.cityRate) || 0)
    .attr('height', (d) => height - y(d.cityRate) || 0)
    .attr('width', x.bandwidth())
    .attr('fill', (d) => (d.cityRate === 0 ? 'transparent' : '#000000'))

  svg
    .selectAll('textB')
    .data(finalData)
    .enter()
    .append('text')
    .attr('class', 'label-rect')
    .attr(
      'x',
      (d) => x(`${MONTH_MAPPING[d.month]}, ${d.year}`) + x.bandwidth() / 2
    )
    .attr('y', (d) => y(d.cityRate) - 5 || 0)
    .text((d) => {
      return d?.cityRate || ''
    })
    .style('font-size', '10px')
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')

  const line = d3
    .line()
    .defined((d) => d.stateRate !== undefined)
    .x((d) => {
      return x(`${MONTH_MAPPING[d.month]}, ${d.year}`) + x.bandwidth() / 2
    })
    .y((d) => (allLineDataZero ? height : y(d.stateRate)))

  svg
    .append('path')
    .datum(definedLineData)
    .attr('class', 'line')
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', '#50C878')
    .attr('stroke-width', 2)

  svg
    .selectAll('.dot')
    .data(finalData)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr(
      'cx',
      (d) => x(`${MONTH_MAPPING[d.month]}, ${d.year}`) + x.bandwidth() / 2
    )
    .attr('cy', (d) => (allLineDataZero ? height : y(d.stateRate)))
    .attr('r', (d: any) => {
      return typeof d.stateRate === 'undefined' ? 0 : 5
    })
    .attr('fill', '#50C878')

  svg
    .selectAll('.circle-label')
    .data(finalData)
    .enter()
    .append('text')
    .attr('class', 'dot-label')
    .style('font-size', '10px')
    .attr(
      'x',
      (d) => x(`${MONTH_MAPPING[d.month]}, ${d.year}`) + x.bandwidth() / 2 - 2.5
    )
    .attr('y', (d) => (allLineDataZero ? height : y(d.stateRate) - 12.5 || 0))
    .text((d) => d.stateRate || 0)
    .attr('fill', (d) =>
      d.stateRate !== undefined && d.stateRate !== null ? '#50C878' : '#FFFFFF'
    )

  svg
    .append('g')
    .call(xAxis)
    .selectAll('.x-axis .tick > text')
    .attr('dy', '20px')
    .html('')
    .append('tspan')
    .attr('class', 'x_axis_label')
    .style('fill', 'black')
    .text((d: any) => {
      const [month] = d.split(', ')
      return `${month}`
    })

  svg
    .selectAll('.x-axis .tick > text')
    .append('tspan')
    .attr('class', 'x_axis_label')
    .attr('x', 0)
    .attr('dy', '1.2em')
    .attr('fill', 'black')
    .text((d: any) => {
      const [, year] = d.split(', ')
      return `${year}`
    })

  svg
    .append('text')
    .attr('class', 'y_axis_label')
    .style('transform', 'rotate(-90deg)')
    .attr('fill', 'black')
    .style('font-family', 'Poppins')
    .style('font-size', '12px')
    .attr('y', 0 - margin.left + 12)
    .attr('x', 0 - height / 2)
    .attr('dy', '1em')
    .text('Número de ocorrências')

  svg
    .append('g')
    .call(yAxis)
    .selectAll('.y-axis .tick > text')
    .attr(
      'transform',
      allLineDataZero && allBarDataZero ? `translate(0, ${height / 2})` : ''
    )

  // Extract the HTML string of the container
  const htmlString = container.innerHTML

  // Remove the container from the DOM
  container.remove()

  return {
    html: htmlString,
    performance: value,
    slope: slope
  }
}

export default generateBLC
