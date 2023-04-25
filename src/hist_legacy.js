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

        //find common keys between both objects

        // var commonKeys = barrios_2022.map(function (item) {
        //     return item.barrio;
        // }).filter(function (value, index, self) {
        //     return self.indexOf(value) === index;
        // }).filter(function (value) {
        //     return bes_2022.map(function (item) {
        //         return item.barrio;
        //     }).indexOf(value) >= 0;
        // });

        // console.log({commonKeys})

        // var newData = []

        // data

        // sort data by sum of denuncias and dengue

        data.sort(function (a, b) {
            return b.cantidad - a.cantidad;
        });

        let chart = addTooltips(Plot.plot({
            marks: [
                Plot.barX(data, 
                    {
                        y: 'barrio',
                        x: d => d.cantidad * (d.tipo === "denuncia" ? -1 : d.tipo === "dengue" ? 1 : 0),
                        fill: 'barrio',
                        title: d => `${d.barrio} \n ${d.cantidad}` + (d.tipo === "denuncia" ? " denuncias de criaderos" : d.tipo === "dengue" ? " casos de dengue" : ""),
                    }
                ),
                Plot.ruleY([0])
            ],
            x: {
                label: 'Cantidad de denuncias (negativo) y casos de dengue (positivo)',
            },
            y: {
                label: 'Barrio',
                labelOffset: 150,
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
