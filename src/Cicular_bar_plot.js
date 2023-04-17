// set the dimensions and margins of the graph
var margin = {top: 100, right: 0, bottom: 0, left: 0},
    width = 460 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

d3.dsv(";","./data/mosquitos_2022.csv").then(function(data) {

    // append the svg object
    var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

    // define count object that holds count for each barrio
    console.log(data);

    var count = {};

    // count how much each barrio occurs in list and store in count
    data.forEach(function(d) {
        var barrio = d.domicilio_barrio;
        if(count[barrio] === undefined) {
            count[barrio] = 1;
        } else {
            count[barrio] += 1;
        }
    });

    // now store the count in each data member
    data.forEach(function(d) {
        var barrio = d.domicilio_barrio;
        d.count = count[barrio];
    });

    // Scales
    var x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing
        .domain(data.map(function(d) { return d.domicilio_barrio; })); // The domain of the X axis is the list of states.
    var y = d3.scaleRadial()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([0, d3.max(data, function(d) { return d.count; })]); // Domain of Y is from 0 to the max count seen in the data

    // Add the bars
    svg.append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("fill", "#69b3a2")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
            .innerRadius(innerRadius)
            .outerRadius(function(d) { return y(d.count); })
            .startAngle(function(d) { return x(d.domicilio_barrio); })
            .endAngle(function(d) { return x(d.domicilio_barrio) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius))

    // Add the labels
    svg.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
            .attr("text-anchor", function(d) { return (x(d.domicilio_barrio) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.domicilio_barrio) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['count'])+10) + ",0)"; })
        .append("text")
            .text(function(d){return(d.domicilio_barrio)})
            .attr("transform", function(d) { return (x(d.domicilio_barrio) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "11px")
            .attr("alignment-baseline", "middle")

        var div = d3.select("#chart")

        // add the svg to the div
        div.append("svg")

});
