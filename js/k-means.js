var Dot_1 = [];
var Dot_2 = [];
var group_1 = [];
var group_2 = [];
var dataTotel = hasntlabel_data.length;
var TempDot = [0, 0];
k_means();

function init() {
	group_1 = [];
    group_2 = [];
    console.log("init")
    for (var i = 0; i < dataTotel; i++) {
        distance(Dot_1, hasntlabel_data[i]) > distance(Dot_2, hasntlabel_data[i]) ? group_2.push(hasntlabel_data[i]) : group_1.push(hasntlabel_data[i]);
    }
}

function random_dot() {
    Dot_1 = [Math.random(), Math.random()];
    Dot_2 = [Math.random(), Math.random()];
}

function k_means() {
    console.log(group_1.length + ',' + group_2.length);
    if (!group_1.length||!group_2.length) {
        random_dot();
        init();
        k_means()
    }  
    data_1_x_sum = 0;
    data_1_y_sum = 0;
    data_2_x_sum = 0;
    data_2_y_sum = 0;
    for (var i = 0; i < group_1.length; i++) {
        data_1_x_sum += group_1[i][0];
        data_1_y_sum += group_1[i][1];
    }
    for (i = 0; i < group_2.length; i++) {
        data_2_x_sum += group_2[i][0];
        data_2_y_sum += group_2[i][1];
    }
    TempDot[0] = Dot_1;
    TempDot[1] = Dot_2;
    Dot_1 = [(data_1_x_sum / group_1.length), (data_1_y_sum / group_1.length)];
    Dot_2 = [(data_2_x_sum / group_2.length), (data_2_y_sum / group_2.length)];
    if (Dot_1[0] == TempDot[0][0] && Dot_1[1] == TempDot[0][1] && Dot_2[0] == TempDot[1][0] && Dot_2[1] == TempDot[1][1] ) {
        return true;
    }
    group_1 = [];
    group_2 = [];
    for (var i = 0; i < dataTotel; i++) {
        distance(Dot_1, hasntlabel_data[i]) > distance(Dot_2, hasntlabel_data[i]) ? group_2.push(hasntlabel_data[i]) : group_1.push(hasntlabel_data[i]);
    }
    k_means()
}

function distance(e, f) {
    return Math.sqrt(Math.pow((f[0]- e[0]), 2) + Math.pow((f[1] - e[1]), 2));
}

$('#container').highcharts({
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: 'Classify sex by K-means'
    },
    subtitle: {
        text: 'Source: Heinz  2003'
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Height (cm)'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Weight (kg)'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: '#FFFFFF',
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} cm, {point.y} kg'
            }
        }
    },
    series: [{
        name: 'Female',
        color: 'rgba(223, 83, 83, .5)',
        data: group_1
    },
    {
        name: 'Male',
        color: 'rgba(119, 152, 191, .5)',
        data: group_2
    }]
});