d3.dsv(';', './data/mosquitos_2022.csv', d3.autoType).then((data) => {

    // set the dimensions and margins of the graph
    marginLeft: 100;
    marginRight: 100;
    marginTop: 100;
    marginBottom: 100;
    width: 1000;
    height: 1000;

    console.log(data);
  
    var count = {};
  
    // count how much each canal occurs in list and store in count
    data.forEach(function(d) {
      var canal = d.canal;
      if(count[canal] === undefined) {
        count[canal] = 1;
      } else {
        count[canal] += 1;
      }
    });
  
    // now store the count in each data member
    data.forEach(function(d) {
      var canal = d.canal;
      d.count = count[canal];
    });
  
    // sort data by count
    data.sort(function(a, b) {
      return b.count - a.count;
    });
  
    console.log(count);
  
    // Guardamos el svg generado en la variable chart
    let chart = Plot.plot({
      grid: true,
      marks: [
        Plot.barX(data, Plot.groupY({x: "count"}, {y: "canal", sort: {y: "x", reverse: true}})),
      ],
    });

    
    d3.select('#chart').html('').append(() => chart);
  });
  