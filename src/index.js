
function main() {
  const data = d3.csv("https://ignaciopardo.github.io/vd_s1_tp2_mazzarello_pardo/vd_astronautas/astronautas.csv", d3.autoType);
  console.log(data);
  plotMosquitos(data, "#chart1");
}
