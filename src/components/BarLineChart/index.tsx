// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useRef } from 'react'

import { MONTH_MAPPING } from 'constants/Global'

import * as d3 from 'd3'
import _ from 'lodash'
import {
  getLast12MonthsIncreasingOrder,
  formatProblemPerformanceMapData,
  getLast12MonthsIncreasingOrderFromGivenStartDate
} from 'utils'

import * as S from './styles'

import chartStyles from './barLineChart.module.css'

import ButtonV2 from 'components/ButtonV2'
import DownloadIcon from 'components/icons/DownloadIcon'
import { FormattedMessage } from 'react-intl'

type BarLineChartSortedProps = {
  static_data: any
  data: any
  problemId: number | string
  updatedAt: string
}

const BarLineChartSorted = ({
  static_data,
  data,
  problemId,
  updatedAt
}: BarLineChartSortedProps) => {
  const rootSvgRef = useRef<SVGSVGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let initialMapData
    if (updatedAt) {
      initialMapData =
        getLast12MonthsIncreasingOrderFromGivenStartDate(updatedAt)
    } else {
      initialMapData = getLast12MonthsIncreasingOrder()
    }
    drawChart(formatProblemPerformanceMapData(initialMapData, data))
    return () => {
      d3.select('#svg-container g').remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const drawChart = (mapData) => {
    if (containerRef.current && rootSvgRef.current) {
      const lineData = _.cloneDeep(mapData)
      const margin = { top: 60, right: 0, bottom: 50, left: 60 }
      const width =
        containerRef.current?.getBoundingClientRect().width -
        margin.left -
        margin.right
      const height = 530 - margin.top - margin.bottom

      const parseDate = (d: any) => {
        return new Date(d.year, d.month - 1)
      }

      lineData.forEach((d) => {
        d.date = parseDate(d)
        d.stateRate = d.stateRate !== undefined ? +d.stateRate : undefined
      })

      const definedBarData = mapData.filter((d: any) => d.cityRate !== 0)

      const allBarDataZero = definedBarData.length === 0

      const definedLineData = mapData.filter(
        (d: any) => d.stateRate !== undefined
      )

      const allLineDataZero =
        definedLineData.filter((item: any) => item.stateRate === 0).length ===
        definedLineData.length

      const x = d3
        .scaleBand()
        .domain(mapData.map((d) => `${MONTH_MAPPING[d.month]}, ${d.year}`))
        .range([0, width])
        .paddingInner(0.4)
        .paddingOuter(0.25)

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(mapData, (d) => {
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
          .attr('class', `${chartStyles.y_axis} y-axis`)
          .call(d3.axisLeft(y).tickSize(0))
          .call((g: any) => g.select('.domain').remove())

      const tooltip = d3.select(tooltipRef.current)

      const svg = d3
        .select(rootSvgRef.current)
        .attr('width', width + margin.left + margin.right) // Responsive SVG width
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      svg
        .append('g')
        .selectAll('rect')
        .data(mapData)
        .enter()
        .append('rect')
        .attr('class', 'rect-box')
        .attr('x', (d) => x(`${MONTH_MAPPING[d.month]}, ${d.year}`))
        .attr('y', (d) => y(d.cityRate) || 0)
        .attr('height', (d) => height - y(d.cityRate) || 0)
        .attr('width', x.bandwidth())
        .attr('fill', (d) => (d.cityRate === 0 ? 'transparent' : '#00ADD2'))
        .on('mouseover', function (event, d) {
          if (d.cityRate) {
            tooltip.style('opacity', 0.9)
            tooltip
              .html(`${d.cityRate}`)
              .style('left', event.clientX + 15 + 'px')
              .style('top', event.clientY - 15 + 'px')
          }
        })
        .on('mousemove', function (event, d) {
          if (d.cityRate) {
            tooltip
              .style('left', event.clientX + 15 + 'px')
              .style('top', event.clientY - 15 + 'px')
          }
        })
        .on('mouseout', (event, d) => {
          if (d.cityRate) {
            tooltip.style('opacity', 0)
          }
        })

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
        .attr('stroke', 'white')
        .attr('stroke-width', 2)

      svg
        .selectAll('.dot')
        .data(mapData)
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
        .attr('fill', 'white')
        .on('mouseover', function (event, d) {
          tooltip.style('opacity', 0.9)
          tooltip
            .html(` ${d.stateRate}`)
            .style('left', event.clientX + 15 + 'px')
            .style('top', event.clientY - 15 + 'px')
        })
        .on('mousemove', function (event) {
          tooltip
            .style('left', event.clientX + 15 + 'px')
            .style('top', event.clientY - 15 + 'px')
        })
        .on('mouseout', () => {
          tooltip.style('opacity', 0)
        })

      svg
        .append('g')
        .call(xAxis)
        .selectAll('.x-axis .tick > text')
        .attr('dy', '20px')
        .html('')
        .append('tspan')
        .attr('class', chartStyles.x_axis_label)
        .text((d: any) => {
          const [month] = d.split(', ')
          return `${month}`
        })

      svg
        .selectAll('.x-axis .tick > text')
        .append('tspan')
        .attr('class', chartStyles.x_axis_label)
        .attr('x', 0)
        .attr('dy', '1.2em')
        .text((d: any) => {
          const [, year] = d.split(', ')
          return `${year}`
        })

      svg
        .append('text')
        .attr('class', chartStyles.y_axis_label)
        .attr('y', 0 - margin.left - 2)
        .attr('x', 0 - height / 2)
        .attr('dy', '1em')
        .text('Taxa de ocorrências')

      svg
        .append('g')
        .call(yAxis)
        .selectAll('.y-axis .tick > text')
        .attr(
          'transform',
          allLineDataZero && allBarDataZero ? `translate(0, ${height / 2})` : ''
        )
    }
  }

  return (
    <S.Wrapper>
      <S.L1Wrapper>
        <S.VisualizationTitle>{static_data.title}</S.VisualizationTitle>
        <ButtonV2
          disabled={!Array.isArray(data) || data.length === 0}
          loading={false}
          text={<FormattedMessage id='button.problem.detail.chart.download'/>}
          variant="outline"
          LeadingIcon={DownloadIcon}
          onClick={() =>
            window.open(
              `${process.env.NEXT_PUBLIC_API_URL}/problems/${problemId}/performance/csv`,
              '_blank'
            )
          }
       />
      </S.L1Wrapper>
      <S.Container ref={containerRef}>
        <S.RootSVG id="svg-container" ref={rootSvgRef}></S.RootSVG>
        <S.Tooltip ref={tooltipRef}/>
      </S.Container>
      <S.L4Wrapper>
        {static_data.legends.map((legend: any, idx: number) => (
          <S.LegendWrapper key={idx}>
            {legend.color ? (
              <S.SquareIcon color={legend.color}/>
            ) : (
              <S.TaxaIcon/>
            )}
            <S.LegendText>{legend.label}</S.LegendText>
          </S.LegendWrapper>
        ))}
      </S.L4Wrapper>
      <S.Footer>{static_data.footer}</S.Footer>
    </S.Wrapper>
  )
}

export default BarLineChartSorted
