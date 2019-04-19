import {echarts} from './global'

const upColor = '#ec0000';
const upBorderColor = '#8A0000';
const downColor = '#00da3c';
const downBorderColor = '#008F28';

export class Kline {

  constructor(data) {
    this.data0 = this.splitData(data);
  }

  splitData(rawData) {
    let markPoints = [];
    let categoryData = [];
    let values = [];
    let days = []
    for (let i = 0; i < rawData.length; i++) {
      const [dateText, ts, msg, open, close] = rawData[i];
      days.push(ts);
      categoryData.push(dateText);
      let highest = Math.max(open, close);
      let lowest = Math.min(open, close);
      if (i === 0) {
        values.push([open, close, lowest, highest]);
      } else {
        //close value will be updated
        values.push([open, open, lowest, highest]);
        //do update previous close
        values[i - 1][1] = open;
        values[i - 1][2] = Math.min(values[i - 1][0], values[i - 1][1], values[i - 1][2], values[i - 1][3]);
        values[i - 1][3] = Math.max(values[i - 1][0], values[i - 1][1], values[i - 1][2], values[i - 1][3]);
      }
      if (msg) {
        markPoints.push({
          name: msg,
          coord: [dateText, close],
          value: close,
          itemStyle: {
            normal: {color: 'rgb(41,60,85)'}
          }
        });
      }
    }
    let values_fixed = values.map(item => {
      return item.map(v => v.toFixed(1));
    });
    return {
      categoryData: categoryData,
      values: values,
      values_fixed: values_fixed,
      days: days,
      markPoints: markPoints
    };
  }

  daily(i) {
    return (this.data0.values[i][0] + this.data0.values[i][1]) / 2;
  }

  calculateDaily() {
    let result = [];
    for (let i = 0, len = this.data0.values.length; i < len; i++) {
      result.push(this.daily(i).toFixed(1));
    }
    return result;
  }

  calculateMA(dayCount) {
    let result = [];
    let margin = (dayCount / 2).toFixed(0) * 86400 * 1000;
    for (let i = 0, len = this.data0.values.length; i < len; i++) {
      let current = this.data0.days[i];
      let left = current - margin;
      let right = current + margin;
      let cnt = 1;
      let sum = this.daily(i);
      for (let j = i - 1; j >= 0; --j) {
        if (this.data0.days[j] > left) {
          sum += this.daily(j);
          ++cnt;
        } else {
          break;
        }
      }
      for (let j = i + 1; j < len; ++j) {
        if (this.data0.days[j] < right) {
          sum += this.daily(j);
          ++cnt;
        } else {
          break;
        }
      }
      result.push((sum / cnt).toFixed(1));
    }
    return result;
  }

  init(elem) {
    echarts.init(elem).setOption({
      title: {
        text: '',
        left: 0
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ["Kline", "Daily", "MA5", "MA10"]
      },
      grid: {
        left: '3',
        right: '40',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.data0.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: {onZero: false},
        splitLine: {show: false},
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true
        },
        axisLabel: {
          formatter: '{value}kg',
          rotate: 30
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 50,
          end: 100
        },
        {
          show: true,
          type: 'slider',
          y: '90%',
          start: 50,
          end: 100
        }
      ],
      series: [
        {
          name: 'Kline',
          type: 'candlestick',
          data: this.data0.values_fixed,
          itemStyle: {
            normal: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor
            }
          },
          markPoint: {
            label: {
              normal: {
                formatter: function (param) {
                  return param.name + "\n" + Math.round(param.value);
                }
              }
            },
            data: this.data0.markPoints.concat([
              {
                name: 'Max',
                type: 'max',
                valueDim: 'highest'
              },
              {
                name: 'Min',
                type: 'min',
                valueDim: 'lowest'
              },
              {
                name: 'Avg',
                type: 'average',
                valueDim: 'close'
              }
            ])
          },
          markLine: {
            symbol: ['none', 'none'],
            data: [
              [
                {
                  name: 'from lowest to highest',
                  type: 'min',
                  valueDim: 'lowest',
                  symbol: 'circle',
                  symbolSize: 10,
                  label: {
                    normal: {show: false},
                    emphasis: {show: false}
                  }
                },
                {
                  type: 'max',
                  valueDim: 'highest',
                  symbol: 'circle',
                  symbolSize: 10,
                  label: {
                    normal: {show: false},
                    emphasis: {show: false}
                  }
                }
              ],
              {
                name: 'min line on close',
                type: 'min',
                valueDim: 'close'
              },
              {
                name: 'max line on close',
                type: 'max',
                valueDim: 'close'
              }
            ]
          }
        },
        {
          name: 'Daily',
          type: 'line',
          data: this.calculateDaily(),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {opacity: 0.5}
          }
        },
        {
          name: 'MA5',
          type: 'line',
          data: this.calculateMA(5),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {opacity: 0.5}
          }
        },
        {
          name: 'MA10',
          type: 'line',
          data: this.calculateMA(10),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {opacity: 0.5}
          }
        }
      ]
    });
  }
}

