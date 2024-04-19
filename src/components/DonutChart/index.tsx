// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useRef } from 'react'

import * as d3 from 'd3'

import * as S from './styles'
import donutStyles from './styles.module.css'

export const donutColors: { [key: number]: string } = {
  0: '#FEDB5A',
  1: '#E37C4C',
  2: '#8F6ED5',
  3: '#6B7C93',
  4: '#6772E5',
  5: '#3297D3',
  6: '#24B47E'
}

const DonutChart = ({ data }: { data: any }) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (chartRef) {
      d3.select(chartRef.current).select('svg').remove()
      drawChart(data.slice(0, 7))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const drawChart = (data) => {
    const width = chartRef.current?.getBoundingClientRect().width
    const height = 230
    const radius = Math.min(width, height) / 1.5

    // const color = d3.scaleOrdinal(d3.schemeCategory10)
    const colorCustom = (id) => donutColors[id]

    const pie = d3.pie().value((d) => d.total)

    const arc = d3
      .arc()
      .innerRadius(radius * 0.25)
      .outerRadius(radius - 40)

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)

    const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g')

    arcs
      .append('path')
      .attr('d', arc)
      .attr('stroke', 'white')
      .attr('stroke-width', '3px')
      .attr('fill', (d, i) => {
        return `${colorCustom(i)}`
      })
      .attr('class', 'arc')
      .on('mousemove', (event) => {
        tooltip
          .style('left', event.clientX + 20 + 'px')
          .style('top', event.clientY - 10 + 'px')
      })
      .on('mouseover', (event, d) => {
        tooltip.style('opacity', 1)
        tooltip.html(`${d.data.total}`)
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0)
      })

    const tooltip = d3
      .select(chartRef.current)
      .append('div')
      .attr('class', donutStyles.tooltip)
  }
  return <S.Wrapper ref={chartRef}></S.Wrapper>
}

export default DonutChart
