function plotBars(bes, year2022, divId) {

    Promise.all([bes, year2022]).then(([data_bes, data_2022]) => {

        var lastYear = data_2022

        var data = []

        var barrios_2022 = [];

        //count occurrences of each 'domicilio_barrio' in last year

        var barriosDenuncias = lastYear.reduce((acc, cur) => {
            barrio = cur.domicilio_barrio.toUpperCase()
            if (acc[barrio] == undefined) {
                acc[barrio] = 1;
            } else {
                acc[barrio] += 1;
            }
            return acc;
        }, {})

        Object.keys(barriosDenuncias).forEach(function (b) {
            barrios_2022.push({
                barrio: b,
                cantidad: barriosDenuncias[b],
            });

            data.push({
                barrio: b,
                cantidad: barriosDenuncias[b],
                tipo: 'denuncia'
            });
        })
        
        console.log({barrios_2022})

        var bes_2022 = [];

        data_bes.forEach(function (b) {
            bes_2022.push({
                barrio: b.BARRIO,
                cantidad: b.TOTAL,
            });

            data.push({
                barrio: b.BARRIO,
                cantidad: b.TOTAL,
                tipo: 'dengue'
            });
        })

        console.log({bes_2022})


        bes_2022.sort(function (a, b) {
            return b.cantidad - a.cantidad;
        });

        let chart = addTooltips(Plot.plot({
            marks: [
                Plot.barX(bes_2022, 
                    {
                        y: 'barrio',
                        x: d => d.cantidad,
                        fill: 'barrio',
                        title: d => `${d.cantidad} casos de dengue`,
                    }
                ),
                Plot.ruleY([0])
            ],
            x: {
                label: 'Cantidad de casos de dengue',
                
            },
            y: {
                label: 'Barrio',
                labelOffset: 150,
                // sort bes_2022 by cantidad
                domain: bes_2022.map(d => d.barrio),
            },
            color: {
                type: 'categorical',
            },
        }),
            {
                stroke: '#f8f14e',
            }
        );

        d3.select(divId).append(() => chart)

    });

}
