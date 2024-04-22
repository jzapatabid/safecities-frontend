/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react'

import * as d3 from 'd3'

import * as S from './styles'

interface DataItem {
  percentage: any
  name: any
  total: any
  xLegend: number
}

// Define a type for the updated data
interface UpdatedDataItem extends DataItem {
  xLegend: any
}

interface BarChartProps {
  data: DataItem[]
  legendColors: string[]
  ///updateDate: any
}

const ConsentrationBarChart: React.FC<BarChartProps> = ({
  data,
  legendColors,
  //updateDate
}) => {
  if (data == null) {
    return <S.errorMessage>data is not available</S.errorMessage> // You can customize the message as needed
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const svgRef = useRef<SVGSVGElement>(null)

  const updatedData: UpdatedDataItem[] = data.map((item, i) => ({
    ...item,
    xLegend: '202' + i
  }))

  // Define the chart dimensions
  const width = 520
  const height = 257
  const barWidth = 40
  const spaceBetweenBars = 50
// eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
   if (!svgRef.current) return

    const svg = d3.select(svgRef.current)

    // Clear previous elements
    svg.selectAll('*').remove();

    


    const margin = { top: 20, right: 20, bottom: 30, left: 60 }

    // Extract the percentage values as numbers
    const areaValues: number[] = updatedData.map((d) =>
      parseFloat(d.percentage || '0')
    )

    // Determine the y-axis domain based on the data
    const yDomainMin: number = Math.min(
      15,
      Math.floor(d3.min(areaValues)! / 5) * 5
    )
    const maxAreaConcentration: number = Math.max(
      ...updatedData.map((d) => parseFloat(d.percentage || '0'))
    );
    
   
    const yDomainMax: number = maxAreaConcentration * 4

    const xScale = d3
      .scaleBand()
      .domain(updatedData.map((d) => d.xLegend))
      .range([
        margin.left,
        margin.left + 1.2 * (barWidth + spaceBetweenBars) * updatedData.length
      ])
      .padding(0.2)
      .paddingOuter(2) // Adjust the paddingOuter value as needed

    const yScale = d3
      .scaleLinear()
      .domain([yDomainMin, yDomainMax])
      .range([height - margin.bottom, margin.top])

    // Create axes
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    // Draw bars
    svg
      .selectAll('.bar')
      .data(updatedData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.xLegend) || 0)
      .attr('y', (d) => yScale(parseFloat(d.percentage || '0')) || 0)
      .attr('width', barWidth)
      .attr('fill', (d, i) => legendColors[i])
      .attr(
        'height',
        (d) =>
          height -
            margin.bottom -
            yScale(parseFloat(d.percentage || '0')) || 0
      )

    // Draw bar values at the top of the bars
    svg
      .selectAll('.bar-value')
      .data(updatedData)
      .enter()
      .append('text')
      .attr('class', 'bar-value')
      .attr('fill', '#ffffff')
      .attr('font-size', '12px')
      .attr(
        'x',
        (d) =>
          (xScale(d.xLegend)?.valueOf() ?? 0) +
          (xScale.bandwidth() - barWidth) / 2 +
          barWidth / 2
      )
      .attr(
        'y',
        (d) => (yScale(parseFloat(d.percentage || '0')) || 0) - 15
      )
      .attr('text-anchor', 'middle')
      .style('font-family', 'Poppins')  
      .style('font-size', '12px')       
      .style('font-weight', '500')
      .text((d) => `${d.percentage}%`)

    // Draw vertical lines
    svg
      .selectAll('.line')
      .data(updatedData)
      .enter()
      .append('line')
      .attr('class', 'line')
      .attr('x1', (d) => (xScale(d.xLegend) ?? 0) + xScale.bandwidth() / 2)
      .attr('y1', (d) => yScale(parseFloat(d.percentage || '0')) || 10)
      .attr('x2', (d) => (xScale(d.xLegend) ?? 0) + xScale.bandwidth() / 2)
      .attr(
        'y2',
        (d) => yScale(parseFloat(d.percentage || '0')) - 10 || 0
      )
      .attr('stroke', '#888888')
      .attr('stroke-width', 1)

      svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', 0 - height / 2)
      .attr('y', margin.left - 53) // Adjust the position as needed
      .attr('dy', '1em')
      .attr('fill', '#fff')
      .style('text-anchor', 'middle')
      .style('font-family', 'Poppins')  
      .style('font-size', '12px')       
      .style('font-weight', '500')       
      .style('fill', '#ffffff')
      .text('Porcentagem de segmentos de rua');

    svg
      .append('g')
      .attr('class', 'xaxis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll('path')
      .style('stroke', '#9abce9')
    // Select and remove the text elements on the x-axis
    svg.selectAll('.xaxis text').remove()

    // Add new label text below the x-axis line

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
      .selectAll('path')
      .style('stroke', '#9abce9')

    // Select text elements on the y-axis and apply styles
    svg.selectAll('.tick text').style('fill', '#888888')

    // Select and style tick lines on the y-axis
    svg.selectAll('.tick line').style('stroke', '#888888')

    // Create legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - margin.right}, ${margin.top})`)
      .attr('text-anchor', 'end')

    // Add legend squares
    legend
      .selectAll('rect')
      .data(updatedData)
      .enter()
      .append('rect')
      .attr('x', -400)
      .attr('y', (d, i) => i * 20 - 20)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', (d, i) => legendColors[i])

    // Add legend text
    legend
      .selectAll('text')
      .data(updatedData)
      .enter()
      .append('text')
      .attr('x', function(d) {
        return (parseInt(d.name, 10) === 100 ? 22 : 17) - 100;
       })
      .attr('y', (d, i) => i * 20 + 12 - 20)
      .style('font-family', 'Poppins')  
      .style('font-size', '12px')       
      .style('font-weight', '500')
      .attr('fill', '#fff')
      .text((d) => d.name)
  }, [legendColors,updatedData])

  return <svg ref={svgRef} width={width} height={height} style={{ overflow: 'visible' }}></svg>
}

export default ConsentrationBarChart
