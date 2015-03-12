window.onload = function () {

    var population = [];
    var income = [];

    $.getJSON("nations_geo.json", function (data) {

        population = data[0].population.map(function (data) {
            return parseInt(data[1] / 1000);
        });

        income = data[0].income.map(function (data) {
            return parseInt(data[1]);
        });

        var r = Raphael("chart");

        function fin() {


            this.flag = r.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
        }

        function fout() {
            this.flag.animate({opacity: 0}, 300, function () {
                this.remove();
            });
        }

        r.circle(70, 20, 10).attr({
            "fill": "#FF0000"
        });

        r.circle(70, 50, 10).attr({
            "fill": "#00FF00"

        });

        r.text(100, 20, "Population").attr({fill: '#ffffff', font: "16px sans-serif",'text-anchor': 'start'});
        r.text(100, 50, "Income").attr({fill: '#ffffff', font: "16px sans-serif",'text-anchor': 'start'});
        r.hbarchart(100, 100, 300, 700, [population, income], {stacked: true, colors:["#FF0000","#00FF00"]}).hover(fin, fout);

    });


}