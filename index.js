$(function () {
    var upColor = '#ec0000';
    var upBorderColor = '#8A0000';
    var downColor = '#00da3c';
    var downBorderColor = '#008F28';
    $.ajax({
        url: 'data.json',
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            var data0 = splitData(interpolation(data));

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
                return intp;
            }
            function splitData(rawData) {
                var categoryData = [];
                var values = [];
                var days = []
                for (var i = 0; i < rawData.length; i++) {
                    var dateText = rawData[i].splice(0, 1)[0];
                    days.push(new Date(dateText));
                    categoryData.push(dateText);
                    var morning = rawData[i][0];
                    var night = rawData[i][1];
                    var max = Math.max(morning, night);
                    var min = Math.min(morning, night);
                    if (i === 0) {
                        values.push([min, max, min, max]);
                    } else {
                        values.push([values[i - 1][1], min, min, max]);
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


            option = {
                title: {
                    text: 'Weight',
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
                    left: '10%',
                    right: '10%',
                    bottom: '15%'
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
                        formatter: '{value} kg'
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
            //
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
    });
})