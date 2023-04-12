function plotLines(yearsData, year, divId) {

    Promise.all([...Object.values(yearsData)]).then((years) => {

        var yearsKeys = Object.keys(yearsData)
        var yearIndex = yearsKeys.indexOf(year.toString())
        // count occurrences of each 'domicilio_barrio' in each years[i]

        var data = [];

        for (var i = 0; i < years.length; i++) {
            var curr_year = years[i]

            var barriosDenuncias = curr_year.reduce((acc, cur) => {
                barrio = cur.domicilio_barrio.toUpperCase()
                if (acc[barrio] == undefined) {
                    acc[barrio] = 1;
                } else {
                    acc[barrio] += 1;
                }
                return acc;
            }, {})

            
            Object.keys(barriosDenuncias).forEach(function (b) {
                data.push({
                    year: Number(yearsKeys[i]),
                    barrio: b,
                    cantidad: barriosDenuncias[b],
                })
            })
        }

        console.log(data)
        
        let chart = addTooltips(Plot.plot({
            marks: [
                Plot.line(data, {
                    x: 'year',
                    y: 'cantidad',
                    stroke: 'barrio',
                    title: 'barrio'
                }),
                Plot.dot(data, {
                    x: 'year',
                    y: 'cantidad',
                    stroke: 'barrio',
                    title: 'barrio',
                    fill: 'barrio',
                    size: 10,
                }),
            ],
            x: {
                label: 'Año',
            },
            y: {
                label: 'Cantidad de denuncias',
            },
            color: {
                type: 'categorical',
                legend: true,
            },
        }),
            {
                stroke: '#f8f14e',
            }
        );

        d3.select(divId).append(() => chart)

    });

}
