import { DataSheetGrid, textColumn, keyColumn } from "react-datasheet-grid";
import { useState } from "react";
import "react-datasheet-grid/dist/style.css";
import Dropdown from "./components/Dropdown";
import * as d3 from "d3"
// import math from "mathjs";
// import Plotly from 'plotly.js-dist'
import "./App.css";
import { string } from "mathjs";

const App = () => {
	const [data, setData] = useState([{}, {}, {}, {}]);
	const dataFilter = data.filter((value) => Object.keys(value).length !== 0);
	const [labelColumn, setLableColumn] = useState();
	
	const [valueColumn, setValueColumn] = useState();

	const [groupColumn, setGroupColumn] = useState();

	const [selectedOptionKey, setSelectedOptionKey] = useState("pie");
	const [list, setList] = useState([]);
	const exportData = () => {
		console.log("selectedOptionKey", selectedOptionKey);
		console.log("dataFilter", dataFilter);
		console.log("groupColumn", groupColumn);
		console.log("labelColumn", labelColumn);
		console.log("valueColumn", valueColumn);
		
		const parentElement = document.getElementById('data-chart');
		parentElement.innerHTML = '';

		switch (selectedOptionKey){
			case "pie": 
				let pie = {}
				for ( let i = 0 ; i < dataFilter.length; i++ ) {
					pie[String(dataFilter[i][String(labelColumn)])] = dataFilter[i][String(valueColumn)]
				}
				console.log(pie)
				plotPieChart(pie)
				break;
			case "columnchart":
				let chartNew = []
				for ( let i = 0 ; i < dataFilter.length; i++ ) {
					let chartObj = {
						label : String(dataFilter[i][String(labelColumn)]),
						value : Number(dataFilter[i][String(valueColumn)])
					}
					chartNew.push(chartObj)
				}	
				console.log(chartNew)
				plotColumnChart(chartNew)
				break;
			case "heatmap":
				let heatmap = []
				for ( let i = 0 ; i < dataFilter.length; i++ ) {
					let chartObj = {
						group : String(dataFilter[i][String(groupColumn)]),
						variable :String(dataFilter[i][labelColumn]) ,
						value : Number(dataFilter[i][String(valueColumn)])
					}
					heatmap.push(chartObj)
				}
				console.log(heatmap)
				plotHeatmap(heatmap)
				break;
			case "histogram":
				let histogram = []
				for ( let i = 0 ; i < dataFilter.length; i++ ) {
					let chartObj = {
						price : Number(dataFilter[i][String(valueColumn)])
					}
					histogram.push(chartObj)
				}
				console.log(histogram)
				plotHistogram(histogram)
				break;
			case "area":
				let area  = []
				for ( let i = 0 ; i < dataFilter.length; i++ ) {
					let chartObj = {
						date:  d3.timeParse("%Y-%m-%d")(String(dataFilter[i][String(labelColumn)])),
						value : Number(dataFilter[i][String(valueColumn)])
					}
					area.push(chartObj)
				}
				console.log(area)
				plotAreaChart(area)
				break;
			default:
				break
		}	
	};

	const columns = [
		{ ...keyColumn("A", textColumn), title: "A" },
		{ ...keyColumn("B", textColumn), title: "B" },
		{ ...keyColumn("C", textColumn), title: "C" },
		{ ...keyColumn("D", textColumn), title: "D" },
		{ ...keyColumn("E", textColumn), title: "E" },
		{ ...keyColumn("F", textColumn), title: "F" },
		{ ...keyColumn("G", textColumn), title: "G" },
		{ ...keyColumn("H", textColumn), title: "H" },
		{ ...keyColumn("I", textColumn), title: "I" },
		{ ...keyColumn("J", textColumn), title: "J" },
		{ ...keyColumn("K", textColumn), title: "K" },
		{ ...keyColumn("L", textColumn), title: "L" },
		{ ...keyColumn("M", textColumn), title: "M" },
		{ ...keyColumn("N", textColumn), title: "H" },
		{ ...keyColumn("O", textColumn), title: "O" },
		{ ...keyColumn("U", textColumn), title: "U" },
	];

	const listInput = dataFilter.map((item) => Object.keys(item)).flat();

	return (
		<div className="wrapper">
			<div className="sheet">
				<DataSheetGrid
					value={data}
					onChange={(data) => setData(data)}
					columns={columns}
				/>
			</div>
			<div className="flex">
				<div className="dropdown">
					<Dropdown
						listInput={[...new Set(listInput)]}
						data={dataFilter}
						exportData={exportData}
						setLableColumn={setLableColumn}
						setValueColumn={setValueColumn}
						setGroupColumn={setGroupColumn}
						setSelectedOptionKey={setSelectedOptionKey}
						selectedOptionKey={selectedOptionKey}
					/>
				</div>

			<div className="data-chart" id="data-chart"></div>
			</div>
		</div>
	);
};

// pie
function plotPieChart(data) {
    // set the dimensions and margins of the graph
    let width = 500
	let height = 500
    let margin = 40

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  const radius = Math.min(width, height) / 2 - margin

  // append the svg object to the div called 'data-chart'
  const svgPie = d3.select("#data-chart")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);


  // set the color scale
  const color = d3.scaleOrdinal()
  .range(d3.schemeSet2);

  // Compute the position of each group on the pie:
  const pie = d3.pie()
  .value(function(d) {return d[1]})
  const data_ready = pie(Object.entries(data))
  // Now I know that group A goes from 0 degrees to x degrees and so on.

  // shape helper to build arcs:
  const arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svgPie
  .selectAll('mySlices')
  .data(data_ready)
  .join('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data[0])) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

  // Now add the annotation. Use the centroid method to get the best coordinates
  svgPie
  .selectAll('mySlices')
  .data(data_ready)
  .join('text')
  .text(function(d){ return d.data[0]})
  .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
  .style("text-anchor", "middle")
  .style("font-size", 17)
}

// column
function plotColumnChart (data){
        
	// set the dimensions and margins of the graph
	let margin = {top: 30, right: 30, bottom: 70, left: 60}
	let width = 500 - margin.left - margin.right
	let height = 500 - margin.top - margin.bottom

	// append the svg object to the body of the page
	let svg = d3.select("#data-chart")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");

	let maxValue = findMaxValue(data,0,data.length-1)
	console.log(maxValue)
	let hightY = roundUpToMultipleOfFive(maxValue)
	console.warn(hightY)
	let x = d3.scaleBand()
	.range([ 0, width ])
	.domain(data.map(function(d) { return d.label; }))
	.padding(0.2);
	svg.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x))
	.selectAll("text")
	.attr("transform", "translate(-10,0)rotate(-45)")
	.style("text-anchor", "end");

	// Add Y axis
	let y = d3.scaleLinear()
	.domain([0, hightY])
	.range([ height, 0]);
	svg.append("g")
	.call(d3.axisLeft(y));

	// Bars
	svg.selectAll("mybar")
	.data(data)
	.enter()
	.append("rect")
	.attr("x", function(d) { return x(d.label); })
	.attr("y", function(d) { return y(d.value); })
	.attr("width", x.bandwidth())
	.attr("height", function(d) { return height - y(d.value); })
	.attr("fill", "#69b3a2")

}

function findMaxValue(data, start, end) {
    // console.log(data)
    if (start === end) {
        return data[start].value;
    }

    let mid = Math.floor((start + end) / 2);

    let leftMax = findMaxValue(data, start, mid);
    let rightMax = findMaxValue(data, mid + 1, end);

    return Math.max(leftMax, rightMax);
}      

function roundUpToMultipleOfFive(number) {
   // Bước 1: Kiểm tra số chữ số của giá trị số nguyên
  let numDigits = Math.floor(Math.log10(number)) + 1;

  // Bước 2: Xác định mũ của 10 tương ứng
  let power = Math.pow(10, numDigits - 1);

  // Bước 3: Chia giá trị số nguyên cho mũ của 10
  let dividedValue = Math.ceil(number / power);

  // Bước 4: Làm tròn lên kết quả chia được
  let roundedValue = Math.ceil(dividedValue);

  // Bước 5: Nhân kết quả làm tròn lên với mũ của 10
  let finalValue = roundedValue * power;

  return finalValue;
}

// heatmap
function plotHeatmap (data){
// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 30, left: 30},
  width = 800 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#data-chart")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Labels of row and columns
const myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
const myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

// Build X scales and axis:
const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(myGroups)
  .padding(0.01);
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x))

// Build X scales and axis:
const y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)
  .padding(0.01);
svg.append("g")
  .call(d3.axisLeft(y));

// Build color scale
const myColor = d3.scaleLinear()
  .range(["white", "#69b3a2"])
  .domain([1,100])

console.log(data)
  // create a tooltip
  const tooltip = d3.select("#data-chart")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event,d) {
    tooltip.style("opacity", 1)
  }
  const mousemove = function(event,d) {
    tooltip
      .html("The exact value of<br>this cell is: " + d.value)
      .style("left", (event.x)/2 + "px")
      .style("top", (event.y)/2 + "px")
  }
  const mouseleave = function(d) {
    tooltip.style("opacity", 0)
  }

  // add the squares
  svg.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

}

// Area
function plotAreaChart(data) {
		
	// set the dimensions and margins of the graph
	const margin = {top: 10, right: 30, bottom: 30, left: 50},
	width = 460 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	const svg = d3.select("#data-chart")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",`translate(${margin.left},${margin.top})`);


	// Now I can use this dataset:

	// Keep only the 90 first rows
	data = data.filter((d,i) => i<90)

	// Add X axis --> it is a date format
	const x = d3.scaleTime()
	.domain(d3.extent(data, d => d.date))
	.range([ 0, width ]);
	svg.append("g")
	.attr("transform", `translate(0,  ${height+5})`)
	.call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

	// Add Y axis
	const y = d3.scaleLinear()
	.domain( d3.extent(data, d => +d.value))
	.range([ height, 0 ]);
	svg.append("g")
	.attr("transform", "translate(-5,0)")
	.call(d3.axisLeft(y).tickSizeOuter(0));

	// Add the area
	svg.append("path")
	.datum(data)
	.attr("fill", "#69b3a2")
	.attr("fill-opacity", .3)
	.attr("stroke", "none")
	.attr("d", d3.area()
	.x(d => x(d.date))
	.y0( height )
	.y1(d => y(d.value))
	)

	// Add the line
	svg.append("path")
	.datum(data)
	.attr("fill", "none")
	.attr("stroke", "#69b3a2")
	.attr("stroke-width", 4)
	.attr("d", d3.line()
	.x(d => x(d.date))
	.y(d => y(d.value))
	)

	// Add the line
	svg.selectAll("myCircles")
	.data(data)
	.join("circle")
	.attr("fill", "red")
	.attr("stroke", "none")
	.attr("cx", d => x(d.date))
	.attr("cy", d => y(d.value))
	.attr("r", 3)
}

// histogram
function plotHistogram(data) {
	
	// set the dimensions and margins of the graph
	const margin = {top: 10, right: 30, bottom: 30, left: 40},
	width = 600 - margin.left - margin.right,
	height = 550 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	const svg = d3.select("#data-chart")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", `translate(${margin.left},${margin.top})`);

	// get the data
	// X axis: scale and draw:
	const x = d3.scaleLinear()
	.domain([0, d3.max(data, function(d) { return +d.price }) ])    
	.range([0, width]);
	svg.append("g")
	.attr("transform", `translate(0, ${height})`)
	.call(d3.axisBottom(x));

	// set the parameters for the histogram
	const histogram = d3.histogram()
	.value(function(d) { return d.price; })   // I need to give the vector of value
	.domain(x.domain())  // then the domain of the graphic
	.thresholds(x.ticks(70)); // then the numbers of bins

	// And apply this function to data to get the bins
	const bins = histogram(data);

	// Y axis: scale and draw:
	const y = d3.scaleLinear()
	.range([height, 0]);
	y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
	svg.append("g")
	.call(d3.axisLeft(y));

	// append the bar rectangles to the svg element
	svg.selectAll("rect")
	.data(bins)
	.join("rect")
		.attr("x", 1)
		.attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
		.attr("width", function(d) { return x(d.x1) - x(d.x0)-1})
		.attr("height", function(d) { return height - y(d.length); })
		.style("fill", function(d){ if(d.x0<140){return "orange"} else {return "#69b3a2"}})

	// Append a vertical line to highlight the separation
	svg
	.append("line")
	.attr("x1", x(140) )
	.attr("x2", x(140) )
	.attr("y1", y(0))
	.attr("y2", y(1600))
	.attr("stroke", "grey")
	.attr("stroke-dasharray", "4")
	svg
	.append("text")
	.attr("x", x(190))
	.attr("y", y(1400))
	.text("threshold: 140")
	.style("font-size", "15px")

}

// function plotXYChart(data){
// 	data.array.forEach(element => {
// 		try {
// 			const expr = math.compile(element)
	  
// 			// evaluate the expression repeatedly for different values of x
// 			const xValues = math.range(-10, 10, 0.5).toArray()
// 			const yValues = xValues.map(function (x) {
// 			  return expr.evaluate({x: x})
// 			})
	  
// 			// render the plot using plotly
// 			const trace1 = {
// 			  x: xValues,
// 			  y: yValues,
// 			  type: 'scatter'
// 			}
// 			const data = [trace1]
// 			Plotly.newPlot('plot', data)
// 		  }
// 		  catch (err) {
// 			console.error(err)
// 			alert(err)
// 		  }
// 	});

	
// }


export default App;
