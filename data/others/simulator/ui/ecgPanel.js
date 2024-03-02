// x-axis of target to update value
xIndex = 0;

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function updateEcg() {}

// Vital monitor update 50 times per second
async function liveEcg() {
  var isDefinedEcg = true;
  while (isDefinedEcg) {
    sleep(20);
  }
}

TYRANO.kag.ftag.master_tag.show_ecg = {
  pm: {
    layer: "0",
    page: "fore",
    width: "450",
    height: "100",
    x: "830",
    y: "10",
  },
  start: function (pm) {
    // init ecg monitor
    var target_layer = TYRANO.kag.layer.getLayer(pm.layer, pm.page);
    var chart = $("<div id='ecg'></div>");
    chart.css("position", "absolute");
    chart.css("left", pm.x + "px");
    chart.css("top", pm.y + "px");
    target_layer.append(chart);
    var layout = {
      plot_bgcolor: "rgba(0, 0, 0, .5)",
      paper_bgcolor: "rgba(0, 0, 0, .5)",
      width: parseInt(pm.width),
      height: parseInt(pm.height),
      margin: { t: 0, r: 0, b: 0, l: 0 },
      xaxis: {
        automargin: false,
        autotick: false,
        dtick: 10,
        showticklabels: false,
        zeroline: false,
      },
      yaxis: {
        automargin: false,
        autotick: false,
        dtick: 1,
        showticklabels: false,
        zeroline: false,
        range: [-8, 8],
      },
    };
    // バイタルモニタは 1 秒あたり 50 フレームを持つアニメーションと解釈する
    // 3秒分表示するため 3 * 50 = 150 個のデータを作成する
    var xValues = [];
    var yValues = [];
    for (var i = 0; i < 150; i++) {
      xValues.push(i.toString());
      yValues.push(null);
    }
    var data = [
      {
        x: xValues,
        y: yValues,
        type: "scatter",
        mode: "lines",
        line: { color: "#78f542", width: 2, shape: "spline" },
      },
    ];
    Plotly.newPlot("ecg", data, layout);
    TYRANO.kag.hbsim.chart.ecg.layout = layout;
    TYRANO.kag.ftag.nextOrder();
  },
};