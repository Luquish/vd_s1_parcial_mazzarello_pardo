// set the dimensions and margins of the graph
var margin = {
    top: 100,
    bottom: 100, 
    right: 0, 
    left: 0
};

var width = 600;//- margin.left - margin.right;
var height = 460 - margin.top - margin.bottom;
var innerRadius = 90;

function plotCircular(dataPromise, divId) {


    var parent_div = d3.select(divId)
    
    width = parent_div.node().getBoundingClientRect().width;

    var outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

    dataPromise.then((data) => {

        // append the svg object
        var svg = d3.select(divId)
            .append("svg")
            .attr("id", "chart_circ_svg")
            // .attr("width", width + margin.left + margin.right)
            .attr("width", "2000px")
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

        // define count object that holds count for each barrio
        console.log({data});

        // var count = {};

        // // count how much each barrio occurs in list and store in count
        // data.forEach(function(d) {
        //     var barrio = d.domicilio_barrio;
        //     if(count[barrio] === undefined) {
        //         count[barrio] = 1;
        //     } else {
        //         count[barrio] += 1;
        //     }
        // });

        // // now store the count in each data member
        // data.forEach(function(d) {
        //     var barrio = d.domicilio_barrio;
        //     d.count = count[barrio];
        // });

        // // sort data by count

        // data.sort(function(a, b) {
        //     return b.count - a.count;
        // });


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
            .attr("type", "circ")
            .attr("barrio", function(d) { return d.domicilio_barrio; })
            .attr("count", function(d) { return d.count; })
            .attr("fill", "#FF8D3A")
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
                .attr("transform", function(d) { return "rotate(" + ((x(d.domicilio_barrio) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d.count)+10) + ",0)"; })
            .append("text")
                .text(function(d){return(d.domicilio_barrio)})
                .attr("transform", function(d) { return (x(d.domicilio_barrio) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
                .style("font-size", "11px")
                .attr("alignment-baseline", "middle")

        // Add the path <path xmlns="http://www.w3.org/2000/svg" id="Trazado_31967" data-name="Trazado 31967" d="M171.865,73.933,138.577,9.619A17.413,17.413,0,0,0,123,0h-.017A17.413,17.413,0,0,0,107.4,9.619L83.966,54.889a23.332,23.332,0,0,0-11.822-10.28A22.386,22.386,0,0,0,69.312,6.571,45.474,45.474,0,0,0,48.074,1.354H13.031A13.016,13.016,0,0,0,0,14.375V79.594A13.017,13.017,0,0,0,13.031,92.613h37.9A52.161,52.161,0,0,0,71.5,88.4l2.4-1.163c.136-.065.265-.133.395-.2A13.013,13.013,0,0,0,97.311,85.7a6.928,6.928,0,0,1,6.042-4.2h39.27a6.93,6.93,0,0,1,6.043,4.2,13.023,13.023,0,0,0,24.883-5.366,12.8,12.8,0,0,0-1.685-6.406" transform="translate(0 0)" fill="#fed306"/>
        // and rescale it to the desired size

        var count_sum =  d3.sum(data, function(d) { return d.count; });

        svg.append("path")
            .attr("d", "M171.865,73.933,138.577,9.619A17.413,17.413,0,0,0,123,0h-.017A17.413,17.413,0,0,0,107.4,9.619L83.966,54.889a23.332,23.332,0,0,0-11.822-10.28A22.386,22.386,0,0,0,69.312,6.571,45.474,45.474,0,0,0,48.074,1.354H13.031A13.016,13.016,0,0,0,0,14.375V79.594A13.017,13.017,0,0,0,13.031,92.613h37.9A52.161,52.161,0,0,0,71.5,88.4l2.4-1.163c.136-.065.265-.133.395-.2A13.013,13.013,0,0,0,97.311,85.7a6.928,6.928,0,0,1,6.042-4.2h39.27a6.93,6.93,0,0,1,6.043,4.2,13.023,13.023,0,0,0,24.883-5.366,12.8,12.8,0,0,0-1.685-6.406")
            .attr("fill", "#FF8D3A")
            .attr("transform", "scale(0.8) translate(-80, -45)")
            .attr("barrio", "CABA")
            .attr("count", count_sum)
            .attr("type", "circ")

            

        // add tooltip with the function addTooltips

        function addCircTooltips() {

            // add tooltip div
            
            parent_div
                .append("div")
                .attr("id", "tooltip")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("display", "none")
                .style("visibility", "hidden")
                .style("background", "#FF8D3A")
                .style("color", "white")
                .style("padding", "8px")
                .style("border-radius", "6px")
                .style("border", "2px")
                .style("border-style", "solid")
                .style("border-color", "white")
                .style("font", "12px sans-serif")
                .style("text-align", "center")
            
            d3.selectAll("path")
                .on("mouseover", function(d) {

                    if (this.getAttribute("type") == "circ") {
                        

                        var xpos = this.getBoundingClientRect().x;
                        var ypos = this.getBoundingClientRect().y;
                        
                        // get attrs from this path

                        var barrio = this.getAttribute("barrio");
                        var count = this.getAttribute("count");


                        d3.select(this)
                            .style("fill", "#FFA500")
                            .style("cursor", "pointer")
                            .style("opacity", 0.8);
                        d3.select("#tooltip")
                            .style("left", (xpos) + "px")
                            .style("top", (ypos - 50) + "px")
                            .style("display", "inline-block")
                            .style("visibility", "visible")
                            .html((barrio) + "<br>" + (count));
                    }

                })
                .on("mouseout", function(d) {
                    if (this.getAttribute("type") == "circ") {
                        d3.select(this)
                            .style("fill", "#FF8D3A")
                            .style("opacity", 1);
                        d3.select("#tooltip")
                            .style("display", "none");
                    }
                });
        }

        addCircTooltips();
        
    });
}
