(function (echarts) {
    function load(callback) {
        function dateFormat(date) {
            return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        }

        function interpolation(data) {
            let intp = [];
            for (let i = 0; i < data.length; ++i) {
                let strs = [];
                let vals = [];
                let datai = data[i];
                for (let j = 0; j < datai.length; ++j) {
                    switch (typeof datai[j]) {
                        case "string":
                            strs.push(datai[j]);
                            break;
                        case "number":
                            vals.push(datai[j]);
                            break;
                    }
                }
                while (strs.length < 2) {
                    strs.push(undefined);
                }
                while (vals.length < 2) {
                    vals.push(vals[vals.length - 1]);
                }
                data[i] = [new Date(strs[0]), strs[1], vals[0], vals[1]];
            }
            for (let i = 0; i < data.length - 1; ++i) {
                let next = data[i + 1][0].getTime();
                let cur = data[i][0].getTime();
                for (let k = cur; k < next; k += 86400 * 1000) {
                    intp.push([dateFormat(new Date(k)), (k === cur ? data[i][1] : undefined), data[i][2], data[i][3]]);
                }
            }
            let last = data.length - 1;
            intp.push([dateFormat(data[last][0]), data[last][1], data[last][2], data[last][3]]);
            //init progress
            let progress = parseFloat(((80 - data[last][2]) / 15 * 100).toFixed(1));
            setTimeout(function () {
                $('#progress')
                    .attr('aria-valuenow', progress)
                    .css('width', progress + '%')
                    .text(progress + '%');
            }, 0);
            return intp;
        }

        $.ajax({
            url: 'data.json?_=' + Math.random(),
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                callback(interpolation(data));
            }
        })
    }

    function initCandleStick(data) {
        function splitData(rawData) {
            let markPoints = [];
            let categoryData = [];
            let values = [];
            let days = []
            for (let i = 0; i < rawData.length; i++) {
                let dateText = rawData[i][0];
                days.push(new Date(dateText));
                categoryData.push(dateText);
                let open = rawData[i][2];
                let close = rawData[i][3];
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
                let msg = rawData[i][1];
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
            let values_fixed = [];
            for (let i = 0; i < values.length; ++i) {
                values_fixed.push([
                    values[i][0].toFixed(1),
                    values[i][1].toFixed(1),
                    values[i][2].toFixed(1),
                    values[i][3].toFixed(1)
                ]);
            }
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
                let current = data0.days[i].getTime();
                let left = current - margin;
                let right = current + margin;
                let cnt = 1;
                let sum = daily(i);
                for (let j = i - 1; j >= 0; --j) {
                    if (data0.days[j].getTime() > left) {
                        sum += daily(j);
                        ++cnt;
                    } else {
                        break;
                    }
                }
                for (let j = i + 1; j < len; ++j) {
                    if (data0.days[j].getTime() < right) {
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
                data: ["MA5", "MA10"]
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
                    name: 'K',
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
                    name: 'Avg',
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
                if (i === 0) {
                    diff = 0;
                } else {
                    diff = Math.min(rawData[i][2], rawData[i][3]) - Math.min(rawData[i - 1][2], rawData[i - 1][3]);
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
                        return d.value[0] + '<br/><span class="tip-arrow glyphicon glyphicon-arrow-' + (d.value[1] > 0 ? 'up' : 'down') + '" aria-hidden="true"></span> ' + Math.abs(d.value[1]) + 'kg';
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
