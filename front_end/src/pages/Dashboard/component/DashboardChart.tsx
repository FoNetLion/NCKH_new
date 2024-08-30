import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, LineElement, ChartData, PointElement, LinearScale, CategoryScale, ChartDataset, BarElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Space, Typography } from 'antd';
import './style.scss'
import {useStaticService,useStaticProtocol } from "../../../utils/request/index";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement)
function DashboardChart() {

    
const {data,mutate} =  useStaticService(); 

const {data:datapie} =  useStaticProtocol();

    const mockDataService = [
        {
            name: 'FTP (Control)',
            data: data?.DNS,
        },
        {
            name: 'FTP (Data)',
            data: data?.DNS,
        },
        {
            name: 'HTTPS',
            data: data?.HTTPS,
        },
        {
            name: 'SSH',
            data: data?.SSH,
        },
        {
            name: 'HTTP',
            data: data?.HTTP,
        },
        {
            name: 'Khác',
            data: data?.Unknown,
        }
    ]
  

    const optionsBar: any = {
        scales: {
            x:{
                title:{
                  display: true,
                  text : 'Service',
                  color:'red'
                }
              },
            y: {
                title:{
                    display: true,
                    text : 'Total FLow',
                    color:'red'
                  },
                beginAtZero: true,
            }
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    //=================== BAT DAU BIEU DO TRON========
    /*
    const dataPieChart = {
        labels: ['TCP', 'UDP'],
        datasets: [
            {
                data: [datapie?.TCP, datapie?.UDP],
               // data: [100, 50],
               // backgroundColor: ['aqua', 'orange']
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }
        ],

    }
 
      const optionsPie = {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: 'thong ke giao thuc',
        },
      };
     */
    //================ KET THUC BIEU DO TRON==============

    const dataLineChart: any = {
        labels: ['0.00-3.00', '3.00-6.00', '6.00-9.00', '9.00-12.00', '12.00-15.00', '15.00-18.00', '18.00-21.00','21.00-24.00'],
        datasets: [
            {
                label: 'safe',
                data: [20, 6, 9, 12, 5, 18, 50, 30],
                borderColor: '#52c41a',
                backgroundColor: '#52c41a',
                borderWidth: 1,
                fill: true,
                pointBorderColor: 'green',
            },
            {
                label: 'dangerous',
                data: [2, 1, 0, 3, 2, 3, 4, 10],
                borderColor: 'rgba(255, 99, 132, 1)', 
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1,
                fill: true,
                pointBorderColor: 'red',
            }
        ]
    }
    const optionsLine: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        }
    }
    const chartAreaBackground = {
        id : 'tomau',
        beforeDatasetsDraw(chart:any,args:any, plugins:any){
          const {ctx, chartArea:{top, bottom, left,right, width, height}} = chart;
          ctx.save();
          ctx.fillStyle = 'grey';
          ctx.fillRect(left,top,width,height);
        }
      }
      const customepie = {
        chart: {
            type: 'pie',
            backgroundColor: 'white' // Màu nền cho biểu đồ
        },
        title: {
            text: 'Thống kê tấn công'
           
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.percentage:.1f} %',
                    style: {
                        fontSize: '16px' // Đặt kích thước font chữ ở đây
                    }
                }
            }
        },
        series: [{
            name: 'số lượng flow',
            data: [
                ['Normal',645],
                ['DoS',120],
                ['Port Scan',115],
                ['Bruce Force',150],
                ['Unknown attack',140]
            ]
        }]
    };
    const options = {
        chart: {
            type: 'column',
            backgroundColor: 'white' // Màu nền cho biểu đồ
        },
        title: {
            text: 'Thống kê tấn công theo từng máy'
        },
        xAxis: {
            categories: ['192.168.190.10', '192.168.190.11', '192.168.190.12']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'FLow'
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [ {
            name: 'DoS',
            data: [50,40,30]
        }, {
            name: 'Port Scan',
            data: [70,35,10]
        },
        {
            name: 'Bruce Force',
            data: [70,30,45]
        },
        {
            name: 'Unknown attack',
            data: [50,40,50]
        },
        {
            name: 'Normal',
            data: [200,210,235]
        }
    ]
    };

    return (
        <Space className='chart-wrapper'>
            <div className='chart-item'>      

    <div >
        <HighchartsReact highcharts={Highcharts} options={customepie} />
    </div>
    <div className='chart-container'>
        <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
                
            </div>

            {/* <div className='chart-item'>
                <Typography className='chart-title'>Number of access</Typography>
                <Line data={dataLineChart} options={optionsLine} className='chart-content' />
            </div> */}
        </Space>
    );
}

export default DashboardChart