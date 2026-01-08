// 全局变量
let mapChart = null;
let lineChart = null;

// 河南省各市的降水量数据（2023年）
const precipitationData = {
    average: [
        {name: '郑州市', value: 650.5},
        {name: '开封市', value: 620.3},
        {name: '洛阳市', value: 580.7},
        {name: '平顶山市', value: 710.2},
        {name: '安阳市', value: 540.8},
        {name: '鹤壁市', value: 530.6},
        {name: '新乡市', value: 590.4},
        {name: '焦作市', value: 610.9},
        {name: '濮阳市', value: 520.3},
        {name: '许昌市', value: 680.1},
        {name: '漯河市', value: 670.5},
        {name: '三门峡市', value: 580.2},
        {name: '南阳市', value: 890.7},
        {name: '商丘市', value: 720.4},
        {name: '信阳市', value: 1120.8},
        {name: '周口市', value: 780.6},
        {name: '驻马店市', value: 950.3},
        {name: '济源市', value: 610.2}
    ],
    min: [
        {name: '郑州市', value: 450.2},
        {name: '开封市', value: 420.8},
        {name: '洛阳市', value: 380.7},
        {name: '平顶山市', value: 510.2},
        {name: '安阳市', value: 340.8},
        {name: '鹤壁市', value: 330.6},
        {name: '新乡市', value: 390.4},
        {name: '焦作市', value: 410.9},
        {name: '濮阳市', value: 320.3},
        {name: '许昌市', value: 480.1},
        {name: '漯河市', value: 470.5},
        {name: '三门峡市', value: 380.2},
        {name: '南阳市', value: 690.7},
        {name: '商丘市', value: 520.4},
        {name: '信阳市', value: 920.8},
        {name: '周口市', value: 580.6},
        {name: '驻马店市', value: 750.3},
        {name: '济源市', value: 410.2}
    ],
    max: [
        {name: '郑州市', value: 850.7},
        {name: '开封市', value: 820.1},
        {name: '洛阳市', value: 780.7},
        {name: '平顶山市', value: 910.2},
        {name: '安阳市', value: 740.8},
        {name: '鹤壁市', value: 730.6},
        {name: '新乡市', value: 790.4},
        {name: '焦作市', value: 810.9},
        {name: '濮阳市', value: 720.3},
        {name: '许昌市', value: 880.1},
        {name: '漯河市', value: 870.5},
        {name: '三门峡市', value: 780.2},
        {name: '南阳市', value: 1090.7},
        {name: '商丘市', value: 920.4},
        {name: '信阳市', value: 1320.8},
        {name: '周口市', value: 980.6},
        {name: '驻马店市', value: 1150.3},
        {name: '济源市', value: 810.2}
    ]
};

// 河南省降水日数时间序列数据（1961-2023）
const rainfallData = {
    years: [1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    precipitation: [110, 105, 120, 115, 108, 98, 112, 118, 122, 116, 119, 107, 113, 121, 125, 109, 114, 117, 123, 111, 106, 124, 118, 115, 119, 107, 113, 121, 116, 109, 114, 122, 118, 111, 125, 108, 119, 127, 115, 112, 121, 109, 117, 123, 114, 118, 125, 111, 119, 122, 116, 108, 121, 115, 118, 124, 112, 119, 126, 114, 121, 118, 125],
    lightRain: [60, 58, 65, 62, 59, 55, 61, 64, 67, 63, 65, 58, 62, 66, 68, 59, 63, 64, 67, 60, 58, 68, 64, 62, 65, 58, 62, 66, 63, 59, 63, 67, 64, 60, 68, 59, 65, 69, 62, 61, 66, 59, 64, 67, 63, 64, 68, 60, 65, 67, 63, 59, 66, 62, 64, 68, 61, 65, 69, 63, 66, 64, 68],
    moderateRain: [30, 28, 35, 32, 29, 25, 31, 34, 37, 33, 35, 28, 32, 36, 38, 29, 33, 34, 37, 30, 28, 38, 34, 32, 35, 28, 32, 36, 33, 29, 33, 37, 34, 30, 38, 29, 35, 39, 32, 31, 36, 29, 34, 37, 33, 34, 38, 30, 35, 37, 33, 29, 36, 32, 34, 38, 31, 35, 39, 33, 36, 34, 38],
    heavyRain: [15, 13, 18, 16, 14, 12, 16, 17, 19, 15, 17, 13, 16, 18, 20, 14, 16, 17, 19, 15, 13, 19, 17, 16, 17, 13, 16, 18, 15, 14, 16, 19, 17, 15, 20, 14, 17, 21, 16, 15, 18, 14, 17, 19, 16, 17, 20, 15, 17, 19, 16, 14, 18, 16, 17, 20, 15, 17, 21, 16, 18, 17, 20],
    storm: [5, 6, 7, 5, 6, 6, 7, 8, 9, 5, 6, 8, 7, 6, 9, 7, 8, 9, 10, 6, 7, 9, 8, 5, 7, 8, 6, 9, 5, 7, 8, 9, 7, 6, 10, 6, 8, 11, 5, 5, 9, 7, 8, 10, 6, 8, 11, 6, 7, 9, 5, 6, 9, 5, 8, 10, 5, 8, 12, 6, 9, 7, 11]
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化图表...');
    
    // 初始化ECharts实例
    initCharts();
    
    // 绘制初始地图
    drawMap('average');
    
    // 绘制折线图
    drawLineChart('precipitation');
    
    // 添加按钮事件监听
    setupEventListeners();
    
    // 响应窗口大小变化
    window.addEventListener('resize', function() {
        if (mapChart) mapChart.resize();
        if (lineChart) lineChart.resize();
    });
});

// 初始化图表
function initCharts() {
    const mapDom = document.getElementById('mapChart');
    const lineDom = document.getElementById('lineChart');
    
    if (!mapDom) {
        console.error('地图容器 #mapChart 未找到！');
        return;
    }
    
    if (!lineDom) {
        console.error('折线图容器 #lineChart 未找到！');
        return;
    }
    
    mapChart = echarts.init(mapDom);
    lineChart = echarts.init(lineDom);
    
    console.log('ECharts实例初始化成功');
}

// 绘制地图
function drawMap(type) {
    const data = precipitationData[type] || precipitationData.average;
    const titleMap = {
        'average': '降水量均值',
        'min': '最小值',
        'max': '最大值'
    };
    const title = titleMap[type] || '降水量均值';
    
    // 河南省各市的经纬度坐标
    const cityCoords = {
        '郑州市': [113.65, 34.76],
        '开封市': [114.31, 34.80],
        '洛阳市': [112.45, 34.62],
        '平顶山市': [113.19, 33.77],
        '安阳市': [114.39, 36.10],
        '鹤壁市': [114.30, 35.75],
        '新乡市': [113.93, 35.30],
        '焦作市': [113.24, 35.22],
        '濮阳市': [115.03, 35.76],
        '许昌市': [113.85, 34.04],
        '漯河市': [114.02, 33.58],
        '三门峡市': [111.20, 34.77],
        '南阳市': [112.53, 32.99],
        '商丘市': [115.66, 34.41],
        '信阳市': [114.09, 32.15],
        '周口市': [114.70, 33.63],
        '驻马店市': [114.02, 33.01],
        '济源市': [112.60, 35.07]
    };
    
    // 将数据转换为散点图格式
    const scatterData = data.map(city => {
        const coords = cityCoords[city.name];
        return {
            name: city.name,
            value: [coords[0], coords[1], city.value]
        };
    });
    
    const option = {
        title: {
            text: `2023年河南省各市${title}`,
            left: 'center',
            textStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#2c3e50'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return `
                <div style="font-size: 14px; font-weight: bold; margin-bottom: 5px; color: #2c3e50;">
                    ${params.name}
                </div>
                <div style="color: #666; font-size: 13px;">
                    ${title}: <span style="color: #e74c3c; font-weight: bold;">${params.value[2]} mm</span>
                </div>
                `;
            },
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#ddd',
            borderWidth: 1,
            padding: [8, 12]
        },
        geo: {
            map: 'china',
            roam: true,
            zoom: 6,
            center: [113.65, 33.88],
            itemStyle: {
                areaColor: '#f0f8ff',
                borderColor: '#b0c4de',
                borderWidth: 1
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#e6f3ff'
                },
                label: {
                    show: false
                }
            }
        },
        series: [{
            name: title,
            type: 'scatter',
            coordinateSystem: 'geo',
            data: scatterData,
            symbolSize: function(val) {
                return Math.max(10, val[2] / 20);
            },
            label: {
                show: true,
                formatter: '{b}',
                position: 'right',
                fontSize: 10
            },
            itemStyle: {
                color: function(params) {
                    const value = params.value[2];
                    if (value < 300) return '#9ecae1';
                    if (value < 500) return '#6baed6';
                    if (value < 700) return '#4292c6';
                    if (value < 900) return '#2171b5';
                    if (value < 1000) return '#08519c';
                    return '#08306b';
                },
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    show: true,
                    fontWeight: 'bold'
                }
            }
        }],
        visualMap: {
            type: 'piecewise',
            pieces: [
                { min: 1000, label: '> 1000 mm', color: '#08306b' },
                { min: 900, max: 1000, label: '900 - 1000 mm', color: '#08519c' },
                { min: 800, max: 900, label: '800 - 900 mm', color: '#2171b5' },
                { min: 700, max: 800, label: '700 - 800 mm', color: '#4292c6' },
                { min: 600, max: 700, label: '600 - 700 mm', color: '#6baed6' },
                { max: 600, label: '< 600 mm', color: '#9ecae1' }
            ],
            left: 'left',
            top: 'bottom',
            textStyle: {
                color: '#333',
                fontSize: 12
            },
            orient: 'horizontal'
        }
    };
    
    mapChart.setOption(option, true);
    console.log(`地图已更新，显示类型: ${title}`);
}

// 绘制折线图
function drawLineChart(type) {
    const dataMap = {
        'precipitation': rainfallData.precipitation,
        'lightRain': rainfallData.lightRain,
        'moderateRain': rainfallData.moderateRain,
        'heavyRain': rainfallData.heavyRain,
        'storm': rainfallData.storm
    };
    
    const titleMap = {
        'precipitation': '降水日',
        'lightRain': '小雨',
        'moderateRain': '中雨',
        'heavyRain': '大雨',
        'storm': '暴雨'
    };
    
    const colorMap = {
        'precipitation': '#3498db',
        'lightRain': '#2ecc71',
        'moderateRain': '#f1c40f',
        'heavyRain': '#e67e22',
        'storm': '#e74c3c'
    };
    
    const data = dataMap[type] || rainfallData.precipitation;
    const title = titleMap[type] || '降水日';
    const color = colorMap[type] || '#3498db';
    
    const option = {
        title: {
            text: `河南省历年${title}数变化趋势 (1961-2023)`,
            left: 'center',
            textStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#2c3e50'
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const year = rainfallData.years[params[0].dataIndex];
                const value = params[0].value;
                return `
                <div style="font-size: 14px; font-weight: bold; margin-bottom: 5px; color: #2c3e50;">
                    ${year}年
                </div>
                <div style="color: #666; font-size: 13px;">
                    ${title}: <span style="color: #e74c3c; font-weight: bold;">${value} 日</span>
                </div>
                `;
            },
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#ddd',
            borderWidth: 1,
            padding: [8, 12]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            backgroundColor: '#fff'
        },
        xAxis: {
            type: 'category',
            data: rainfallData.years,
            name: '年份',
            axisLine: {
                lineStyle: {
                    color: '#7f8c8d'
                }
            },
            axisLabel: {
                interval: 4,
                rotate: 45,
                fontSize: 10,
                color: '#34495e'
            }
        },
        yAxis: {
            type: 'value',
            name: '日数',
            axisLine: {
                lineStyle: {
                    color: '#7f8c8d'
                }
            },
            axisLabel: {
                color: '#34495e',
                fontSize: 11
            },
            splitLine: {
                lineStyle: {
                    color: '#ecf0f1',
                    type: 'solid'
                }
            }
        },
        series: [{
            name: title,
            type: 'line',
            data: data,
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
                width: 3,
                color: color
            },
            itemStyle: {
                color: color,
                borderColor: '#fff',
                borderWidth: 2
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: color + '40' },
                    { offset: 1, color: color + '10' }
                ])
            },
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ],
                label: {
                    color: '#fff',
                    backgroundColor: '#2c3e50',
                    padding: [4, 8],
                    borderRadius: 4,
                    fontSize: 10
                }
            }
        }]
    };
    
    lineChart.setOption(option, true);
    console.log(`折线图已更新，显示类型: ${title}`);
}

// 设置事件监听器
function setupEventListeners() {
    // 地图按钮事件
    const mapButtons = document.querySelectorAll('.map-section .control-btn');
    mapButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // 更新按钮状态
            mapButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 更新地图
            drawMap(type);
        });
    });
    
    // 折线图按钮事件
    const lineButtons = document.querySelectorAll('.line-section .control-btn');
    lineButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // 更新按钮状态
            lineButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 更新折线图
            drawLineChart(type);
        });
    });
    
    console.log('事件监听器设置完成');
}