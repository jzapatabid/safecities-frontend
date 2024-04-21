// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as d3 from 'd3'

const generateTreemap = (problemName: any, value: any, serverData: any) => {
  const transformedserverData = serverData.map((item: any) => {
    if (item.percentage && typeof item.percentage === 'number') {
      item.percentage = item.percentage.toString().replace('.', ',')
    }
    return item
  })

  // Create a container element
  const container = document.createElement('div')

  let slope: string
  const frequencyTransformed =
    typeof value === 'number'
      ? Math.sign(value) === -1
        ? `${value}`
        : Math.sign(value) === 1
        ? `+${value}`
        : 0
      : '-'

  if (frequencyTransformed === 0 || frequencyTransformed) {
    if (frequencyTransformed === '-') {
      slope = 'unavailable'
    } else {
      slope =
        typeof frequencyTransformed === 'number'
          ? 'neutral'
          : frequencyTransformed.slice(0, 1) === '-'
          ? 'positive'
          : 'negative'
    }
  }

  d3.select(container).style('background-color', '#00000033')

  //graphic code
  const width = 760
  const height = 550

  // Create a treemap layout
  const treemap = d3.treemap().size([width, height]).padding(0)

  // Append an SVG element to the container
  const svg = d3
    .select(container)
    .style('margin-left', '12px')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  svg
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'none')
    .style('stroke', 'black')
    .style('stroke-width', '2px')

  // Create a root node for the hierarchy
  const root = d3
    .hierarchy({ name: 'Root', children: transformedserverData })
    .sum((d) => d.value)

  // Calculate the layout
  treemap(root)

  // Create groups for each data node
  const nodes = svg
    .selectAll('g')
    .data(root.leaves())
    .enter()
    .append('g')
    .attr('transform', (d) => `translate(${d.x0},${d.y0})`)

  // Create rectangles for each data node
  nodes
    .append('foreignObject')
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)
    .append('xhtml:div')
    .style('background', (d) =>
      d.data.name === problemName ? 'black' : '#00000033'
    )
    .style('border', '0.5px solid #00000033')
    .style('height', '100%')
    .style('width', '100%')
    // .style('box-sizing', 'border-box')
    .style('color', (d) => (d.data.name === problemName ? 'white' : 'black'))
    .attr('class', 'rectDiv')
    .append('div')
    .style('background', 'transparent')
    .attr('class', 'content')
    .html((d) => {
      const firstPart =
        d.data.name.slice(0, 1).toUpperCase() + d.data.name.slice(1)
      const secondPart = d.data.percentage
      return `<div style="padding: 8px;"><p style="font-family: Poppins; font-weight: 700; font-size: 12px; padding: 0px; margin: 0px;">${firstPart}</p><p style="font-family: Poppins; font-weight: 700;  font-size: 12px; font-size: 12px; padding: 0px; margin: 0px; margin-top: 5px;">${secondPart}%</p></div>`
    })

  const allContentNodes = d3.select(container).selectAll('.content').nodes()

  d3.select(container)
    .selectAll('.content')
    .style('display', (d, idx) => {
      const { height } = allContentNodes[idx].getBoundingClientRect()

      const { height: parentHeight } =
        allContentNodes[idx].parentNode.getBoundingClientRect()
      if (height > parentHeight) {
        return 'none'
      } else {
        return 'block'
      }
    })

  // Extract the HTML string of the container
  const htmlString = container.innerHTML

  // Remove the container from the DOM
  container.remove()

  return { html: htmlString, relativeFrequency: value, slope: slope }
}

export default generateTreemap
