import {echarts} from './global'

export class Heatmap {
  constructor(data) {
    this.data = this.process(data);
  }

  process(rawData) {
    let data = [];
    for (let i = 0; i < rawData.length; ++i) {
      let diff = 0;
      if (i === rawData.length - 1) {
        diff = 0;
      } else {
        diff = Math.min(rawData[i + 1][3], rawData[i + 1][4]) - Math.min(rawData[i][3], rawData[i][4]);
      }
      diff = diff === 0 ? undefined : diff.toFixed(2);
      let now = new Date(rawData[i][0]).getTime();
      data.push([
        echarts.format.formatTime('yyyy-MM-dd', now),
        diff
      ]);
      if (!this.begin || now < this.begin) {
        this.begin = now;
      }
      if (!this.end || now > this.end) {
        this.end = now;
      }
      if (!this.absDiffMax || Math.abs(diff) > this.absDiffMax) {
        this.absDiffMax = Math.abs(diff);
      }
    }
    return data;
  }

  init(elem) {
    echarts.init(elem).setOption({
      title: {
        top: 30,
        left: 'center',
        text: ''
      },
      tooltip: {},
      visualMap: {
        show: false,
        min: -this.absDiffMax,
        max: 0,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 65,
        textStyle: {
          color: '#000'
        },
        inRange: {
          color: ['#254e77', '#acd5f2']
        },
        outOfRange: {
          color: ['red', 'red']
        }
      },
      calendar: {
        top: 20,
        left: 30,
        right: 30,
        cellSize: 17,
        range: '2019',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#fff',
            width: 2,
            type: 'solid'
          }
        },
        itemStyle: {
          normal: {
            color: '#ededed',
            borderWidth: 2,
            borderColor: '#fff'
          },
        },
        yearLabel: {show: false}
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: this.data,
        tooltip: {
          formatter: function (d) {
            return `${d.value[0]}<br/><span class="tip-arrow glyphicon glyphicon-arrow-${d.value[1] > 0 ? 'up' : 'down'}" aria-hidden="true"></span>${Math.abs(d.value[1])}kg`;
          },
          textStyle: {
            fontWeight: 'bold'
          },
          extraCssText: 'text-align: right;'
        }
      }
    });
  }
}
