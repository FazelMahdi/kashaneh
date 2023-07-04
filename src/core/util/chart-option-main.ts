export function chartConfig(data, isGroup = false) {
  const defaultColor = '#7CB5EC';
  const types = {
    1: 'bar',
    2: 'pie',
    3: 'line',
    4: 'doughnut',
    5: 'horizontalBar',
  };

  const option = checkOption(types[data.ChartType], data);
  const config = {
    id: data.Id,
    title: data.ChartTitle || null,
    rawData: data.Values,
    showOutlet: false,
    type: types[data.ChartType],
    gradiant: true,
    data: {
      labels: data.Values.map((val) => {
        return val.Title;
      }),
      datasets: [...Array(data.SeriesCount)].map((_, i) => ({
        label: data[`S${i + 1}Title`] || '',
        data: data.Values.map((val) => {
          return val[`Val${i + 1}`];
        }),
        afterData: data.Values.map((val) => {
          return val[`ExtraVal${i + 1}`] ?? null;
        }),
        seriesCount: data.SeriesCount > 1,
        afterDataLabel: data.ExtraTitle,
        backgroundColor: data.Values[0][`Color${i + 1}`]
          ? types[data.ChartType] !== 'line'
            ? data.Values.map((val) => val[`Color${i + 1}`] ?? defaultColor)
            : data.Values[0][`Color${i + 1}`] ?? defaultColor
          : null,
        borderColor: data.Values.map((val) => val[`Color${i + 1}`] ?? defaultColor),
        borderWidth: data.borderWidth ?? 1,
        pointBackgroundColor: data.PointColor || null,
        clip: false,
        cubicInterpolationMode: data.Values.length < 50 ? 'default' : 'monotone',
        lineTension: data.Values.length < 50 ? 0.4 : 0,
        stack: isGroup ? [] : data.SeriesCount > 1,
        fill: data.fill ?? true,
      })),
    },
    stacked: isGroup ? false : data.Stacking === 1,
  };
  Object.assign(config, option);
  return config;
}

export function checkOption(type, data) {
  switch (type) {
    case 'bar':
      return {
        legend: { display: data.SeriesCount > 1, position: 'top' },
        tooltipFormat: `{point.y}`,
        xAxis: false,
        barValueSpacing: 20,
        yAxis: true,
        yAxesLabel: data.YTitle,
        xAxesLabel: data.XTitle,
      };
    case 'pie':
      return {
        legend: { display: true, position: 'bottom' },
        options: {
          layout: {
            padding: { left: 10, right: 10, top: 20, bottom: 50 },
          },
          tooltips: { enabled: true },
        },
        xAxis: false,
        yAxis: false,
      };
    case 'line':
      return {
        legend: { display: data.SeriesCount === 2, position: 'top' },
        // legend: { display: false },
        tooltipFormat: `{point.y} ${data.YTitle}`,
        lineTension: 0,
        options: {
          layout: { padding: { left: 40, right: 40, top: 50, bottom: 50 } },
          elements: {
            point: {
              radius: data.PointSize ? data.PointSize : 1.5,
            },
          },
        },
        xAxesLabel: data.XTitle,
        yAxesLabel: data.YTitle,
        xAxis: data.xAxis ?? false,
        yAxis: data.yAxis ?? true,
        // plugins: {
        //   filler: {
        //     propagate: false,
        //   },
        // },
      };
    case 'doughnut':
      return {
        legend: { display: false },
        tooltipFormat: `{point.y} ${data.YTitle}`,
        xAxis: false,
        yAxis: false,
      };
    case 'horizontalBar':
      return {
        legend: { display: data.SeriesCount > 1, position: 'right' },
        tooltipFormat: data.PointFormat || `{point.y}`,
        barValueSpacing: 20,
        xAxis: true,
        yAxis: true,
        yAxesLabel: '',
        xAxesLabel: '',
        options: {
          legend: {
            display: true,
            position: 'right',
            padding: 'right',
            labels: { padding: 20, fontFamily: 'iranyekan', boxHeight: 1, usePointStyle: true },
          },
          layout: { padding: { left: 40, right: 40, top: 50, bottom: 50 } },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: false,
                  labelString: data.XTitle,
                  fontFamily: 'iranyekan',
                },
                ticks: {
                  fontFamily: 'iranyekan',
                  callback(value, index, values) {
                    return Math.abs(+value)
                  },
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                },
                scaleLabel: {
                  fontFamily: 'iranyekan',
                },
                stacked: false,
                ticks: {
                  display: true,
                  fontFamily: 'iranyekan',
                  beginAtZero: false,
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem) => {
                let val = tooltipItem.yLabel;
                const lbl = tooltipItem.xLabel;
                val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                return `{point.x} \t|\t ${data.YTitle}\t{point.y} `
                  .replace('{point.name}', lbl)
                  .replace('{point.y}', val)
                  .replace('{point.x}', Math.abs(+lbl))
                  .replace('{point.y:.1f}', val);
              },
            },
            bodyFontFamily: 'iranyekan',
          },
        },
      };
    default:
      break;
  }
}
