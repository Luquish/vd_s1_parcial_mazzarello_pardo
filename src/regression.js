function plotRegression(yearsData, divId) {
  Promise.all([...Object.values(yearsData)]).then((objs) => {
    
    var data = objs.reduce((acc, cur) => {
      return acc.concat(cur);
    }, [])

    // Plot scatter plot of ocurrences per month
    // Also plot regression line

    // count ocurrences of data["periodo"]
    
    var periodos = {}

    data.forEach((row) => {
      var month = row["periodo"] % 100;
      var year = Math.floor(row["periodo"] / 100);

      var date = new Date(year, month, 0)

      if (periodos[date] == undefined) {
        periodos[date] = 1
      } else {
        periodos[date] += 1
      }
    })

    // add missing months to periodos with 0 ocurrences

    // Date range

    var minDate = new Date(Math.min(...Object.keys(periodos)))
    var maxDate = new Date(Math.max(...Object.keys(periodos)))

    
    var date = new Date(minDate)

    while (date < maxDate) {
        if (periodos[date] == undefined) {
            periodos[date] = 0
        }
        date.setMonth(date.getMonth() + 1)
    }
    
    //console.log(periodos)

    var periodosArray = Object.keys(periodos).map((key) => {
        return {
            x: new Date(key),
            y: periodos[key]
        }
    })

    //sort by date

    periodosArray.sort((a, b) => {
        return a.x - b.x
    })

    console.log(periodosArray)
    
    // calculate regression line

    var reg = regression.linear(periodosArray.map((p) => {
        return [periodosArray.indexOf(p), p.y]
    }))

    var reg_func = (x) => {
        return reg.equation[0] * x + reg.equation[1]
    }

    // match regression line to dates

    reg.points = reg.points.map((p) => {
        return [periodosArray[p[0]].x, p[1]]
    })
    
    // proyect regression line to future 36 months

    var lastDate = periodosArray[periodosArray.length - 1].x

    var date = new Date(lastDate)
    date.setMonth(date.getMonth() + 21)

    var first_and_last = [[periodosArray[0].x, reg_func(0)], [date, reg_func(periodosArray.length + 24)]]

    let chart = addTooltips(Plot.plot({
        grid: true,
        marks : [
            Plot.dot(periodosArray, {
                x: d => d.x,
                y: d => d.y,
                stroke: "black",
                fill: "black",
                r: 2,
                title: d => `${d.y} denuncias - ${d.x.toLocaleDateString()}`,
            }),
            Plot.line(first_and_last, {
                x: d => d[0],
                y: d => d[1],
                stroke: "red",
                strokeWidth: 2,
                title: d => `${reg.equation[0].toFixed(2)}x + ${reg.equation[1].toFixed(2)}`,
            })
        ],
        x: {
            label: "Fecha",
            nice: true
        },
        y: {
            label: "Denuncias",
            nice: true
        }
    }));

    d3.select(divId).append(() => chart)

  });
}
