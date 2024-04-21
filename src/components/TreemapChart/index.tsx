// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useRef } from 'react'

import * as d3 from 'd3'

import * as S from './styles'

import chartStyles from './Treemap.module.css'

import ButtonV2 from 'components/ButtonV2'
import DownloadIcon from 'components/icons/DownloadIcon'
import { FormattedMessage } from 'react-intl'

type TreemapChartProps = {
  static_data: any
  data: any
  problemId: string | number
}

export function formatRelativeData(value) {
  const stringValue = value.toString()
  return stringValue.includes('.') ? stringValue.replace('.', ',') : stringValue
}

const TreemapChart = ({ static_data, data, problemId }: TreemapChartProps) => {
  const rootSvgRef = useRef<SVGSVGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const drawChart = (mapData: any) => {
    if (containerRef.current && rootSvgRef.current) {
      const width = containerRef.current?.getBoundingClientRect().width
      const height = containerRef.current?.getBoundingClientRect().height

      const treemap = d3.treemap().size([width, height]).padding(0)

      const svg = d3
        .select('#treemap-svg-container')
        .attr('width', width)
        .attr('height', height)

      svg
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none')
        .style('stroke', 'white')
        .style('stroke-width', '2px')

      const root = d3.hierarchy(mapData).sum((d) => d.value)

      treemap(root)

      const tooltip = d3.select('#treemap-tooltip')

      const nodes = svg
        .selectAll('g')
        .data(root.leaves())
        .enter()
        .append('g')
        .attr('transform', (d) => {
          return `translate(${d.x0},${d.y0})`
        })

      nodes
        .append('foreignObject')
        .attr('width', (d) => d.x1 - d.x0)
        .attr('height', (d) => d.y1 - d.y0)
        .append('xhtml:div')
        .style('background', (d) =>
          d.data.name === mapData.name ? '#68CF54' : '#253245'
        )
        .style('color', (d) =>
          d.data.name === mapData.name ? 'black' : 'white'
        )
        .attr('class', chartStyles.rectDiv)
        .on('mouseover', () => {
          tooltip.transition().style('opacity', 1)
        })
        .on('mousemove', (event, d) => {
          if (event.target.children.length) {
            if (event.target.children[0].style.display === 'none') {
              tooltip
                .html(
                  `<div style="transform: rotate(180deg)"; display: flex; flex-direction: column">
                  <p>${
                    d.data.name.slice(0, 1).toUpperCase() + d.data.name.slice(1)
                  }</p>
                  <p style="margin-top: 10px;">Total: ${d.data.value}</p>
                  <p style="margin-top: 3px;">${formatRelativeData(
                    d.data.percentage
                  )}%</p>
                  </div>`
                )
                .style('left', event.pageX - 160 + 'px')
                .style('top', event.pageY - 20 + 'px')
            } else {
              tooltip
                .html(
                  `<div style="transform: rotate(180deg)"; display: flex; flex-direction: column">
                  <p>${
                    d.data.name.slice(0, 1).toUpperCase() + d.data.name.slice(1)
                  }</p>
                  <p style="margin-top: 10px;">Total: ${d.data.value}</p>
                  <p style="margin-top: 3px;">${formatRelativeData(
                    d.data.percentage
                  )}%</p>
                  </div>`
                )
                .style('left', event.pageX - 160 + 'px')
                .style('top', event.pageY - 20 + 'px')
            }
          }
        })
        .on('mouseout', () => {
          tooltip.transition().style('opacity', 0)
        })
        .append('div')
        .attr('class', 'treemap-content')
        .style('word-break', 'break-word')
        .html((d) => {
          return `<p style="font-weight: 700; font-size: 11px; font-family: Poppins;">${
            d.data.name.slice(0, 1).toUpperCase() + d.data.name.slice(1)
          }</p><p style="font-weight: 700; font-size: 11px; font-family: Poppins; margin-top: 2px;">${formatRelativeData(
            d.data.percentage
          )}%</p>`
        })

      const allContentNodes = d3.selectAll('.treemap-content').nodes()

      d3.selectAll('.treemap-content').style('display', (d, idx) => {
        const { height } = allContentNodes[idx].getBoundingClientRect()

        const { height: parentHeight } =
          allContentNodes[idx].parentNode.getBoundingClientRect()

        if (height > parentHeight) {
          return 'none'
        } else {
          return 'block'
        }
      })
    }
  }

  useEffect(() => {
    drawChart(data)

    return () => {
      d3.select('#treemap-svg-container rect').remove()
      d3.select('#treemap-svg-container g').remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <S.Wrapper>
      <S.L1Wrapper>
        <S.VisualizationTitle>{static_data.title}</S.VisualizationTitle>
        <ButtonV2
          loading={false}
          text={<FormattedMessage id='button.problem.detail.chart.download'/>}
          variant="outline"
          LeadingIcon={DownloadIcon}
          disabled={!Array.isArray(data.children) || data.children.length === 0}
          onClick={() =>
            window.open(
              `${process.env.NEXT_PUBLIC_API_URL}/problems/${problemId}/relative-frequency/csv`,
              '_blank'
            )
          }
       />
      </S.L1Wrapper>
      <S.Container ref={containerRef}>
        {data.children.length !== 0 ? (
          <>
            <S.RootSVG id="treemap-svg-container" ref={rootSvgRef}></S.RootSVG>
            <div id="treemap-tooltip" className={chartStyles.tooltip}></div>
          </>
        ) : (
          <S.EmptyContainer/>
        )}
      </S.Container>
      <S.Footer>{static_data.footer}</S.Footer>
    </S.Wrapper>
  )
}

export default TreemapChart
