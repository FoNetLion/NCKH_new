import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, LineElement, ChartData, PointElement, LinearScale, CategoryScale, ChartDataset, BarElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Space, Typography } from 'antd';
import './style.scss'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import  { FC } from "react";
import {useStaticService,useStaticProtocol,useStaticattack } from "../../../../../utils/request/index";
type Props = {
    id?:string;
  }
type m = {
      "SSH"?: number;
      "Unknown"?: number;
      "FTP (Control)"?: number;
      "HTTP"?: number;
      "FTP (Data)"?: number;
      "HTTPS"?: number;
      
}
type attack = {
    "Bruce Force"?: number;
    "PortScan"?: number;
    "DoS slowloris"?: number;
    "Unknown attack"?: number;
    "BENIGN"?:number;
}
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement)
//function AgentMnDashboardChart() {
const AgentMnDashboardChart: FC<Props> = ({ id }) => {
    // ========thong ke du lieu cua tung ip theo cai id ta truyen vao
  console.log(id)
  //=============== data goi API
  const [dataservice,setDataservice] = useState<m>({});
  const {data,mutate} =  useStaticService(); 

  const {data:datapie} =  useStaticProtocol();
  const [datatancong,setDatatancong] = useState<attack>({});
  const {data:datapactack} =  useStaticattack();
  //================
    useEffect(() => {
        if(data && datapactack){
            setDataservice(data)
            setDatatancong(datapactack)
        }
    },[])
    const dataPieChart = {
        labels: ['Quang Huy', 'Dang Duong', 'Hoang Dat'],
        datasets: [
            {
                data: [3, 6, 9],
                backgroundColor: ['rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 205, 86, 0.6)',]
            }
        ],

    }
    const dataLineChart: any = {
        labels: ['0.00-3.00', '3.00-6.00', '6.00-9.00', '9.00-12.00', '12.00-15.00', '15.00-18.00', '18.00-21.00', '21.00-24.00'],
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
    const customepie = {
        chart: {
            type: 'pie',
            backgroundColor: 'white' // Màu nền cho biểu đồ
        },
        title: {
            text: 'Thống kê Protocol'
           
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
                ['TCP', datapie?.TCP],
                ['UDP', datapie?.UDP]
            ]
        }]
    };
    
    const customepieactack = {
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
                ['Port Scan',datatancong?.PortScan], // ataservice?.['FTP (Control)'],
                ['Unknown attack', datatancong?.['Unknown attack']],
                ['DoS', datatancong['DoS slowloris']],
                ['Bruce Force', datatancong['Bruce Force']],
                ['BENIGN', datatancong.BENIGN]
            ]
        }]
    };
    const mockDataService = [
        {
            name: 'FTP (Control)',
            data: dataservice?.['FTP (Control)'],
        },
        {
            name: 'FTP (Data)',
            data: dataservice?.['FTP (Data)'],
        },
        {
            name: 'HTTPS',
            data: dataservice?.HTTPS,
        },
        {
            name: 'SSH',
            data: dataservice?.SSH,
        },
        {
            name: 'HTTP',
            data: dataservice?.HTTP,
        },
        {
            name: 'Khác',
            data: dataservice?.Unknown,
        }
    ]
    const listServices = {
        labels: mockDataService.map(item => item.name),
        datasets: [
            {
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: ['rgba(75,192,192,0.4)', 'rgba(255,99,132,0.4)', 'rgba(255,205,86,0.4)', 'rgba(54,162,235,0.4)', 'rgba(153,102,255,0.4)'],
                borderWidth: 1,
                hoverBackgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(255,205,86,0.6)', 'rgba(54,162,235,0.6)', 'rgba(153,102,255,0.6)'],
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: mockDataService.map(item => item.data),
            },
        ],
    };
    const optionsBar: any = {
        scales: {
            x:{
                title:{
                  display: true,
                  font: {
                    size: 16 // Đặt kích thước font chữ ở đây
                }
                }
              },
            y: {
                title:{
                    display: true,
                    font: {
                        size: 16 // Đặt kích thước font chữ ở đây
                    }
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
    const chartAreaBackground = {
        id : 'tomau',
        beforeDatasetsDraw(chart:any,args:any, plugins:any){
          const {ctx, chartArea:{top, bottom, left,right, width, height}} = chart;
          ctx.save();
          ctx.fillStyle = 'white';
          ctx.fillRect(left,top,width,height);
        }
      }
    return (
        // <Space className='chart-wrapper'>
        //     <div className='chart-item'>
        //     <Typography className='chart-title'>Thống Kê Service</Typography>
        //     <Bar data={listServices} options={optionsBar} plugins={[chartAreaBackground]} />
        //     <div className='chart-container'>
        //     <HighchartsReact highcharts={Highcharts} options={customepie} />
        //     </div>
        //     <div className='chart-container'>
        //     <HighchartsReact highcharts={Highcharts} options={customepieactack} /> 
        //     </div>  
        //     </div>
        // </Space>

        <Space className='chart-wrapper'>
            <div className='chart-item'>
            <Typography className='chart-title'>Thống Kê Service</Typography>
             <Bar data={listServices} options={optionsBar} plugins={[chartAreaBackground]} />
            </div>
            <div className='chart-item'>
            <HighchartsReact highcharts={Highcharts} options={customepie} />
            </div>
            <div className='chart-item'>
             <HighchartsReact highcharts={Highcharts} options={customepieactack} /> 
            </div>
        </Space>

    );
}

export default AgentMnDashboardChart