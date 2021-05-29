/* 
1. The D3 library focuses on a data-driven approach. 
When you have a set of data, you can apply D3 methods to display it on the page. Data comes in many formats, but this challenge uses a simple array of numbers.

select() method selects one element from the document. 
It takes an argument for the name of the element you want and returns an HTML node for the first element in the document that matches the name. */
const anchor = d3.select("a") 

// a is anchor tag used in HTML , we can use div or paragraph tag as well

/* -> 		append() function :  append() method takes an argument for the element you 
		want to add to the document. It appends an HTML node to a selected item, and returns a handle to that node.
	->  	text() method either sets the text of the selected node, or gets the current text. 
		To set the value, you pass a string as an argument inside the parentheses of the method. 
		
		D3 allows you to chain several methods together with periods to perform a number of actions in a row.
*/

/* d3.select("ul")
  .append("li")
  .text("Very important item")
  .append("li")
  .text("Very important item2");
  
  
/* 
	selectAll() : method to select a group of elements. It returns an array of HTML nodes for all the items in the document that match the input string.
*/

/* d3.select("ul")
  .selectAll("li")
  .text("list item");
  
/*
The first step is to make D3 aware of the data. The data() method is used on a selection of DOM elements to attach the data to those elements. The data set is passed as an argument to the method.

A common workflow pattern is to create a new element in the document for each piece of data in the set. D3 has the enter() method for this purpose.

When enter() is combined with the data() method, it looks at the selected elements from the page and compares them to the number of data items in the set. If there are fewer elements than data items, it creates the missing elements.
 */
 
 // Example : selects a ul element and creates a new list item based on the number of entries in the array

// const dataSet = ["a", "b", "c"]
// d3.select("ul")               // selecting  ul element on the page
//    .selectAll("li")			  // select all the list items, its empty right now
//    .data(dataSet)			  // data method reviews the dataset and run the code as (size of array) or one for each item in array
//    .enter()					  // so enter will see how many times li are there in the page
// 		.append("li")	 	  // hence will append the li 3 times with new item as values
// 		.text("new Item");
		
// ex 2: D3 text() method can take a string or a callback function as an argument like : .text( (d) => d)) where d is the single data element int he dataSet
const data = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    
/*    d3.select("body")
      .selectAll("h2")
      .data(data)
      .enter()
        .append("h3")
        .text((d) => d + " Rupees")
		
// inline styling using d3 : style method :  method takes a comma-separated key-value pair as an argument.

//		.style("color","red");
//	doing call back in the style function based on data
	/*.style("color", (d) => d < 20 ? "red" : "green");

// style() method is not limited to setting the color - it can be used with other CSS properties as well.


/* ----------------------------------------------------------------------------------------------------------------------
  adding classes ugin D3
  :a lot of inline styles on HTML aer not easy to manage, so we use css class. 
  D3 has the attr() method to add any HTML attribute to an element, including a class name.
  The attr() method works the same way that style() does. It takes comma-separated values, and can use a callback function.
*/

d3.select("body")
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .attr("class", "bar")


/* we are getting bars, so lets adjust the lenght dynamically 
previous we covered how to display data from an array and how to add CSS classes. 
You can combine these lessons to create a simple bar chart. There are two steps to this:
  1. Create a div for each data point in the array
  2. Give each div a dynamic height, using a callback function in the style() method that sets height equal to the data value 
  like -> .style("cssProperty", (d) => d)   : change the cssProperty
*/
  .style("height", (d) => (d*5 + "px"))
    .style("background-color", (d) => d < 20 ? "red" : "green");




/* Learn About SVG : Scalable Vector Graphics
  Here "scalable" means that, if you zoom in or out on an object, 
  it would not appear pixelated. It scales with the display system, whether it's on a small mobile screen or a large TV monitor.
  SVG is used to make common geometric shapes. Since D3 maps data into a visual representation,
  it uses SVG to create the shapes for the visualization. SVG shapes for a web page must go within an HTML svg tag.


  Why SVG is more better than CSS is CSS can be scalable when styles use relative units (such as vh, vw, or percentages), 
  but using SVG is more flexible to build data visualizations.
*/

/* example : created an svg element with a given width and height, 
which was visible because it had a background-color applied to it in the style tag. The code made space for the given width and height.
*/
const w = 500;
const h = 120;

const svg = d3.select("body")
    .append("div")
    .append("svg")
    .style("width", w)
    .style("height", h)


/* create a shape to put in the svg area. There are a number of supported shapes in SVG, such as rectangles and circles. 
They are used to display data. For example, a rectangle (<rect>) SVG shape could create a bar in a bar chart.
When you place a shape into the svg area, you can specify where it goes with x and y coordinates. The origin point of (0, 0) is in the upper-left corner.
 Positive values for x push the shape to the right, and positive values for y push the shape down from the origin point.

 To place a shape in the middle of the 500 (width) x 100 (height) svg from last challenge, the x coordinate would be 250 and the y coordinate would be 50.
An SVG rect has four attributes. There are the x and y coordinates for where it is placed in the svg area.
 It also has a height and width to specify the size.
*/
  /*  .append("rect")
    .attr("width", 25)
    .attr("height", 25)
    .attr("x",10)
    .attr("y",20) //comment this after one use


/* using dynamic data to create the rect in the svg */
    
svg.selectAll("rect")
    .data(data)
    .enter()
      .append("rect")
        .attr("width", 25)
        // .attr("height", 100)
      //  .attr("y",0)
//        .attr("x",0) //comment x for next
        

/*
The last challenge created and appended a rectangle to the svg element for each point
 in dataset to represent a bar. Unfortunately, they were all stacked on top of each other.
 WHY?
The placement of a rectangle is handled by the x and y attributes. 
They tell D3 where to start drawing the shape in the svg area. The last challenge set them each to 0, so every bar was placed in the upper-left corner.


For a bar chart, all of the bars should sit on the same vertical level, which means the y value stays the same (at 0) for all bars. 
The x value, however, needs to change as you add new bars. 
Remember that larger x values push items farther to the right. As you go through the array elements in dataset, the x value should increase.
*/
  .attr("x", (d, i) => i*30)
  .attr("height", (d, i) => d*3)

  /*
  To make the bars right-side-up, you need to change the way the y coordinate is calculated. 
  It needs to account for both the height of the bar and the total height of the SVG area. 
  The height of the SVG area is 100. If you have a data point of 0 in the set, you would want the bar to start at the bottom of the SVG area (not the top). To do this, 
  the y coordinate needs a value of 100. If the data point value were 1, you would start with a y coordinate of 100 to set the bar at the bottom. 
  Then you need to account for the height of the bar of 1, so the final y coordinate would be 99.

  y = h - m * d
  h = height value and m is constant and d is data point
  */
  .attr("y", (d) => h - 3*d)
/* adding colour to the bars : In SVG, a rect shape is colored with the fill attribute.
 It supports hex codes, color names, and rgb values, as well as more complex options like gradients and transparency.
*/
  .attr("fill", (d) => d < 20 ? "red" : "green")
  .attr("class", "bar")           // adding hovr effect on the bars
  // ---------- we can end bar graph here
  .append("title")                        // adding Toottip on top of bar
    .text((d) => d);
/* adding labels to the D3 elements 
  1. D3 lets you label a graph element, such as a bar, using the SVG text element. Like the rect element, a text element needs to have x and y attributes, to place it on the SVG canvas. It also needs to access the data to display those values.
  2. D3 gives you a high level of control over how you label your bars.
*/

svg.selectAll("text")
    .data(data)
    .enter()
      .append("text")
      .attr("x", (d, i) => i * 30)
      .attr("y", (d, i) => h - 3 * d - 3)
      .text(d => d)
      .attr("fill", "red")
      .style("font-size", "20px");










/* Scatter Plot 
A scatter plot is another type of visualization. It usually uses circles to map data points, 
which have two values each. These values tie to the x and y axes, and are used to position the circle in the visualization.

SVG has a circle tag to create the circle shape. It works a lot like the rect elements you used for the bar chart.
*/

const circleDataSet = [
  [ 34,    78 ],
  [ 109,   280 ],
  [ 310,   120 ],
  [ 79,    411 ],
  [ 820,   220 ],
  [ 233,   145 ],
  [ 333,   96 ],
  [ 222,   333 ],
  [ 78,    320 ],
  [ 21,    123 ]
];


const w1 = 500;
const h1 = 500;
const padding = 60;

const svg1 = d3.select("body")
  .append("div")
  .append("svg")
  .attr("class", "scatter_plot")
  .attr("width", w1)
  .attr("height", h1);

// svg1.selectAll("circle")
//   .data (circleDataSet)
//   .enter()
//     .append("circle")
//     .attr("cx", (d) => d[0])       // x coordinate for circle
//     .attr("r", 5)
//     .attr("cy", (d) => h1 - d[1]);      // y coordinate for circle

//  svg1.selectAll("text")
//   .data(circleDataSet)
//   .enter()
//       .append("text")
//       .text((d) => (d[0] + ", " + d[1] ))
//       .attr("x", (d) => d[0] + 5)
//       .attr("y", (d) => h1 - d[1]);

// d3.min and d3.max function 
d3.select("body")
  .append("p")
    .text(d3.min(data, (d) => d))
  .append("h2")
    .text(d3.max(data, (d) => d));


/* 
The bar and scatter plot charts both plotted data directly onto the SVG canvas. 
However, if the height of a bar or one of the data points were larger than the SVG height or width values, it would go outside the SVG area.

In D3, there are scales to help plot data. scales are functions that tell the program how to map a set of raw data points onto the pixels of the SVG canvas.
Ex: GDP of multiple countries on plot of 100x500

Before plotting it, you set the scale for your entire data set, so that the x and y values fit your canvas width and height.

for linear Scale: we have scaleLinear() method
By default, scales use the identity relationship. This means the input value maps to the output value. However, scales can be much more flexible and interesting.
Range : Say a dataset has values ranging from 50 to 480. This is the input information for a scale, also known as the domain.
Domain: You want to map those points along the x axis on the SVG canvas, between 10 units and 500 units. This is the output information, also known as the range.
*/
const scale = d3.scaleLinear()
scale.domain([50, 480]);
scale.range([10, 500]);

/* 
The example below sets the x-axis scale for scatter plot data. The domain() method passes information to the scale about the raw data values for the plot. The range() method gives it information about the actual space on the web page for the visualization.

In the example, the domain goes from 0 to the maximum in the set. It uses the max() method with a callback function based on the x values in the arrays. The range uses the SVG canvas' width (w), but it includes some padding, too. 
This puts space between the scatter plot dots and the edge of the SVG canvas.


With the scales set up, it's time to map the scatter plot again. The scales are like processing functions that turn the x and y raw data into values that fit and render 
correctly on the SVG canvas. They keep the data within the screen's plotting area.
You set the coordinate attribute values for an SVG shape with the scaling function. This includes x and y attributes for rect or text elements, or cx and cy for circles.
*/
const xScale = d3.scaleLinear()
.domain([0, d3.max(circleDataSet, (d) => d[0])])
.range([padding, w1 - padding]);

const yScale = d3.scaleLinear()
.domain([0, d3.max(circleDataSet, (d) => d[1])])
.range([h1 - padding, padding]);
  

svg1.selectAll("circle")
  .data (circleDataSet)
  .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d[0]))
    .attr("cy", (d) => yScale(d[1]))
    .attr("r", 5); 

 svg1.selectAll("text")
  .data(circleDataSet)
  .enter()
      .append("text")
      .text((d) => (d[0] + ", " + d[1]))
      .attr("x", (d) => xScale(d[0] + 10))
      .attr("y", (d) => yScale(d[1]));


/* after scaling the process is to know the scaling values via axes to see the graph.
to improve the scatter plot is to add an x-axis and a y-axis.

D3 has two methods, axisLeft() and axisBottom(), to render the y-axis and x-axis, respectively. 
Here's an example to create the x-axis based on the xScale in the previous challenges:
    const xAxis = d3.axisBottom(xScale);


STEPS: the next step is to render the axis on the SVG canvas. 
To do so, you can use a general SVG component, the g element. The g stands for group. 
Unlike rect, circle, and text, an axis is just a straight line when it's rendered. Because it is a simple shape, using g works. 
The last step is to apply a transform attribute to position the axis on the SVG canvas in the right place. 
Otherwise, the line would render along the border of SVG canvas and wouldn't be visible. 

SVG supports different types of transforms, but positioning an axis needs translate. 
When it's applied to the g element, it moves the whole group over and down by the given amounts. 
*/
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg1.append("g")
       .attr("transform", "translate(0," + (h1 - padding) + ")")
       .call(xAxis);

       svg1.append("g")
       .attr("transform", "translate(" + (padding) + ",0)")
       .call(yAxis);


/* 
The above code places the x-axis at the bottom of the SVG canvas. Then it's passed as an argument to the call() method. 
The y-axis works in the same way, except the translate argument is in the form (x, 0). 
Because translate is a string in the attr() method above, you can use concatenation to include variable values for its arguments.
*/