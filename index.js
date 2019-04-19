"use strict";
(function (echarts) {
    function load(callback) {
        const dateFormat = (date) => {
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        }

        function interpolation(data) {
            let result = [];
            data = data.map((item) => {
                let strs = item.filter(v => typeof v === 'string');
                let vals = item.filter(v => typeof v === 'number');
                while (strs.length < 2) {
                    strs.push(undefined);
                }
                while (vals.length < 2) {
                    vals.push(vals[vals.length - 1]);
                }
                return [new Date(strs[0]).getTime(), strs[1], vals[0], vals[1]];
            })
            let pre = null;
            data.forEach(item => {
                if (pre) {
                    let right = item[0];
                    let left = pre[0];
                    for (let k = left; k < right; k += 86400 * 1000) {
                        result.push([
                            dateFormat(new Date(k)),
                            k,
                            (k === left ? pre[1] : undefined),
                            pre[2],
                            pre[3]
                        ]);
                    }
                }
                pre = item;
            })
            const last = data.length - 1;
            result.push([dateFormat(new Date(data[last][0])), data[last][0], data[last][1], data[last][2], data[last][3]]);
            //init progress
            let progress = parseFloat(((80 - data[last][2]) / 15 * 100).toFixed(1));
            $('#progress-container').fadeIn();
            setTimeout(() => {
                $('#progress')
                    .attr('aria-valuenow', progress)
                    .css('width', progress + '%')
                    .text(progress + '%');
            }, 0);
            return result;
        }

        fetch('data.json?_=' + Math.random()).then(res => res.json()).then(data => {
            callback(interpolation(data));
        });
    }

    function initCandleStick(data) {
        function splitData(rawData) {
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

        function daily(i) {
            return (data0.values[i][0] + data0.values[i][1]) / 2;
        }

        function calculateDaily() {
            let result = [];
            for (let i = 0, len = data0.values.length; i < len; i++) {
                result.push(daily(i).toFixed(1));
            }
            return result;
        }

        function calculateMA(dayCount) {
            let result = [];
            let margin = (dayCount / 2).toFixed(0) * 86400 * 1000;
            for (let i = 0, len = data0.values.length; i < len; i++) {
                let current = data0.days[i];
                let left = current - margin;
                let right = current + margin;
                let cnt = 1;
                let sum = daily(i);
                for (let j = i - 1; j >= 0; --j) {
                    if (data0.days[j] > left) {
                        sum += daily(j);
                        ++cnt;
                    } else {
                        break;
                    }
                }
                for (let j = i + 1; j < len; ++j) {
                    if (data0.days[j] < right) {
                        sum += daily(j);
                        ++cnt;
                    } else {
                        break;
                    }
                }
                result.push((sum / cnt).toFixed(1));
            }
            return result;
        }

        let upColor = '#ec0000';
        let upBorderColor = '#8A0000';
        let downColor = '#00da3c';
        let downBorderColor = '#008F28';

        let data0 = splitData(data);

        let option = {
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
                data: data0.categoryData,
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
                    data: data0.values_fixed,
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
                        data: data0.markPoints.concat([
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
                    data: calculateDaily(),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: calculateMA(5),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: calculateMA(10),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                }

            ]
        };
        echarts.init($("#chart")[0]).setOption(option);
    }

    function initHeatMap(rawData) {
        let begin;
        let end;
        let absDiffMax;

        function process(rawData) {
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
                if (!begin || now < begin) {
                    begin = now;
                }
                if (!end || now > end) {
                    end = now;
                }
                if (!absDiffMax || Math.abs(diff) > absDiffMax) {
                    absDiffMax = Math.abs(diff);
                }
            }
            return data;
        }

        let data = process(rawData);
        let option = {
            title: {
                top: 30,
                left: 'center',
                text: ''
            },
            tooltip: {},
            visualMap: {
                show: false,
                min: -absDiffMax,
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
                data: data,
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
        };
        echarts.init($("#heat-map")[0]).setOption(option);
    }

    function initHitokoto() {
        $.ajax({
            url: 'https://v1.hitokoto.cn/?charset=utf-8&c=b',
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                $('#hitokoto-text').text(data.hitokoto);
                $('#hitokoto-author').text(data.from);
                $('#hitokoto').fadeIn();
            }
        })
    }

    //
    $(function () {
        load(function (data) {
            initCandleStick(data);
            initHeatMap(data);
        })
    })
})(echarts);
