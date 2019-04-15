(function () {
    function load(callback) {
        function dateFormat(date) {
            return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        }

        function interpolation(data) {
            var intp = [];
            for (var i = 0; i < data.length; ++i) {
                data[i][0] = new Date(data[i][0]);
                if (data[i].length === 2) {
                    data[i].push(data[i][1]);
                }
            }
            for (var i = 0; i < data.length - 1; ++i) {
                var next = data[i + 1][0].getTime();
                var cur = data[i][0].getTime();
                for (var k = cur; k < next; k += 86400 * 1000) {
                    intp.push([dateFormat(new Date(k)), data[i][1], data[i][2]]);
                }
            }
            var last = data.length - 1;
            intp.push([dateFormat(data[last][0]), data[last][1], data[last][2]]);
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
            var categoryData = [];
            var values = [];
            var days = []
            for (var i = 0; i < rawData.length; i++) {
                var dateText = rawData[i][0];
                days.push(new Date(dateText));
                categoryData.push(dateText);
                var open = rawData[i][1];
                var close = rawData[i][2];
                var highest = Math.max(open, close);
                var lowest = Math.min(open, close);
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
            }
            return {
                categoryData: categoryData,
                values: values,
                days: days
            };
        }

        function daily(i) {
            return (data0.values[i][0] + data0.values[i][1]) / 2;
        }

        function calculateDaily() {
            var result = [];
            for (var i = 0, len = data0.values.length; i < len; i++) {
                result.push(daily(i).toFixed(2));
            }
            return result;
        }

        function calculateMA(dayCount) {
            var result = [];
            var margin = (dayCount / 2).toFixed(0) * 86400 * 1000;
            for (var i = 0, len = data0.values.length; i < len; i++) {
                var current = data0.days[i].getTime();
                var left = current - margin;
                var right = current + margin;
                var cnt = 1;
                var sum = daily(i);
                for (var j = i - 1; j >= 0; --j) {
                    if (data0.days[j].getTime() > left) {
                        sum += daily(j);
                        ++cnt;
                    } else {
                        break;
                    }
                }
                for (var j = i + 1; j < len; ++j) {
                    if (data0.days[j].getTime() < right) {
                        sum += daily(j);
                        ++cnt;
                    } else {
                        break;
                    }
                }
                result.push((sum / cnt).toFixed(2));
            }
            return result;
        }

        var upColor = '#ec0000';
        var upBorderColor = '#8A0000';
        var downColor = '#00da3c';
        var downBorderColor = '#008F28';

        var data0 = splitData(data);

        var option = {
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
                data: ['日K', '日均', "MA5", "MA10"]
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
                    name: '日K',
                    type: 'candlestick',
                    data: data0.values,
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
                                    return param != null ? Math.round(param.value) : '';
                                }
                            }
                        },
                        data: [
                            /*
                            {
                                name: 'XX标点',
                                coord: ['2013/5/31', 2300],
                                value: 2300,
                                itemStyle: {
                                    normal: {color: 'rgb(41,60,85)'}
                                }
                            },
                            */
                            {
                                name: 'highest value',
                                type: 'max',
                                valueDim: 'highest'
                            },
                            {
                                name: 'lowest value',
                                type: 'min',
                                valueDim: 'lowest'
                            },
                            {
                                name: 'average value on close',
                                type: 'average',
                                valueDim: 'close'
                            }
                        ],
                        tooltip: {
                            formatter: function (param) {
                                return param.name + '<br>' + (param.data.coord || '');
                            }
                        }
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
                    name: '日均',
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
        var begin;
        var end;
        var absdiffmax;

        function process(rawData) {
            var data = [];
            for (var i = 0; i < rawData.length; ++i) {
                var diff = 0;
                if (i === 0) {
                    diff = 0;
                } else {
                    diff = Math.min(rawData[i][1], rawData[i][2]) - Math.min(rawData[i - 1][1], rawData[i - 1][2]);
                }
                diff = diff === 0 ? undefined : diff.toFixed(2);
                var now = new Date(rawData[i][0]).getTime();
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
                if (!absdiffmax || Math.abs(diff) > absdiffmax) {
                    absdiffmax = Math.abs(diff);
                }
            }
            return data;
        }

        var data = process(rawData);
        var option = {
            title: {
                top: 30,
                left: 'center',
                text: ''
            },
            tooltip: {},
            visualMap: {
                show: false,
                min: -absdiffmax,
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
                        return d.value[0] + '<br/>' + d.value[1] + 'kg';
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
})();
