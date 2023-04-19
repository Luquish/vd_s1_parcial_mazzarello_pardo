// d3.dsv(';', './data/mosquitos_2022.csv', d3.autoType).then((data) => {

//     console.log(data);
  
//     var count = {};
  
//     // count how much each canal occurs in list and store in count
//     data.forEach(function(d) {
//       var canal = d.canal;
//       if(count[canal] === undefined) {
//         count[canal] = 1;
//       } else {
//         count[canal] += 1;
//       }
//     });
  
//     // now store the count in each data member
//     data.forEach(function(d) {
//       var canal = d.canal;
//       d.count = count[canal];
//     });
  
//     // sort data by count
//     data.sort(function(a, b) {
//       return b.count - a.count;
//     });
  
//     console.log(count);
  
//     // Guardamos el svg generado en la variable chart
//     let chart = Plot.plot({
//         width: 600,
//         height: 400,
//         grid: true,
//         marks: [
//         Plot.barX(data, Plot.groupY({x: "count"}, {y: "canal", sort: {y: "x", reverse: true}})),
//       ],
//     });

//     d3.select('#chart').html('').append(() => chart);
//   });
  
function plotHorizontal(dataPromise, divId) {
  dataPromise.then((data) => {
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
  
    // Guardamos el svg generado en la variable chart
    let chart = Plot.plot({
      width: 600,
      height: 400,
      grid: true,
      marks: [
        Plot.barX(data, Plot.groupY({x: "count"}, {y: "canal", sort: {y: "x", reverse: true}})),
      ],
      x: {
        label: 'Cantidad de denuncias',
      },
      y: {
        label: 'Canales',
        labelOffset: 100,
      },
    });

    // add id to chart

    chart.id = "chart_horizontal_svg";
    

    d3.select(divId).append(() => chart);

    document.getElementById("chart_horizontal_svg").setAttribute("width", "800");

  });
}
