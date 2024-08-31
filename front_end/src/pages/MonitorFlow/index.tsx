
import { FC, useState } from "react";
import "./style.scss";
import React  from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useNavigate } from "react-router-dom";
import { Card } from "antd";

const MonitorFlow: FC = () => {
  const navigate = useNavigate();
  const [selectedPoint, setSelectedPoint] = useState(null);
  const flow_data = {
    "data": [
      { "flow_id": "0", "ddos": 10, "portscan": 30, "brushport": 20, "nomarl": 40, "time": "2024-08-29 21:00:00" },
      { "flow_id": "1", "ddos": 10, "portscan": 30, "brushport": 20, "nomarl": 40, "time": "2024-08-29 22:00:00" },
      { "flow_id": "2", "ddos": 40, "portscan": 20, "brushport": 10, "nomarl": 30, "time": "2024-08-29 23:00:00" },
      { "flow_id": "3", "ddos": 35, "portscan": 15, "brushport": 30, "nomarl": 20, "time": "2024-08-30 01:00:00" },
      { "flow_id": "4", "ddos": 25, "portscan": 15, "brushport": 20, "nomarl": 40, "time": "2024-08-30 02:00:00" },
      { "flow_id": "5", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 03:00:00" },
      { "flow_id": "6", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 04:00:00" },
      { "flow_id": "7", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 05:00:00" },
      { "flow_id": "8", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 06:00:00" },
      { "flow_id": "9", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 07:00:00" },
      { "flow_id": "10", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 08:00:00" },
      { "flow_id": "11", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 09:00:00" },
      { "flow_id": "12", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 10:00:00" },
      { "flow_id": "13", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 11:00:00" },
      { "flow_id": "14", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 12:00:00" },
      { "flow_id": "15", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 13:00:00" },
      { "flow_id": "16", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 14:00:00" },
      { "flow_id": "17", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 15:00:00" },
      { "flow_id": "18", "ddos": 40, "portscan": 10, "brushport": 35, "nomarl": 15, "time": "2024-08-30 16:00:00" }
    ]
  };
  
  // Hàm chuyển đổi timestamp thành dạng millisec sử dụng Date.UTC để giữ nguyên giờ gốc
  const parseTimestamp = (timestamp: string): number => {
    const [year, month, day, hour, minute, second] = timestamp.split(/[- :]/).map(Number);
    return Date.UTC(year, month - 1, day, hour, minute, second);
  };
  const seriesDataMot: any[] = [
    {
      name: 'DDoS',
      data: flow_data.data.map(item => ({ x: parseTimestamp(item.time), y: item.ddos, flow_id: item.flow_id })),
      color: '#1f77b4',
      marker: {
        symbol: 'circle',
        fillColor: '#1f77b4',
        radius: 4
      }
    },
    {
      name: 'Port Scan',
      data: flow_data.data.map(item => ({ x: parseTimestamp(item.time), y: item.portscan, flow_id: item.flow_id })),
      color: '#ff7f0e',
      marker: {
        symbol: 'circle',
        fillColor: '#ff7f0e',
        radius: 4
      }
    },
    {
      name: 'Brush Port',
      data: flow_data.data.map(item => ({ x: parseTimestamp(item.time), y: item.brushport, flow_id: item.flow_id })),
      color: '#2ca02c',
      marker: {
        symbol: 'circle',
        fillColor: '#2ca02c',
        radius: 4
      }
    },
    {
      name: 'Nomarl',
      data: flow_data.data.map(item => ({ x: parseTimestamp(item.time), y: item.nomarl, flow_id: item.flow_id })),
      color: '#9467bd',
      marker: {
        symbol: 'circle',
        fillColor: '#9467bd',
        radius: 4
      }
    }
  ];
  const seriesDataHai: any[] = [
    {
      name: 'DDoS',
      data: flow_data.data.map(item => ({ x: parseTimestamp(item.time), y: item.ddos, flow_id: item.flow_id })),
      color: '#1f77b4',
      marker: {
        symbol: 'circle',
        fillColor: '#1f77b4',
        radius: 4
      }
    }

  ];
  const options_mot: Highcharts.Options = {
    chart: {
      type: 'line',
      height: 400, // Đặt chiều cao biểu đồ thành 500 pixels (có thể thay đổi giá trị này tùy ý),
      scrollablePlotArea: {
        minWidth: 3000, // Chiều rộng tối thiểu, mỗi điểm chiếm khoảng 100 pixel
      }
    },
    title: {
      text: 'Thuật Toán 1'
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Thời Gian'
      },
      crosshair: {
        color: '#ff0000', // Màu của đường crosshair (đỏ)
        width: 2,          // Độ dày của đường crosshair
        dashStyle: 'ShortDash' // Kiểu đường crosshair (chấm gạch ngắn)
      },
      scrollbar: {
        enabled: true,
        barBackgroundColor: '#888888',
        barBorderRadius: 7,
        barBorderWidth: 0,
        buttonBackgroundColor: '#cccccc',
        buttonBorderWidth: 0,
        rifleColor: '#000000',
        trackBackgroundColor: '#eeeeee',
        trackBorderWidth: 1
      }
      // labels: {
      //   formatter: function () {
      //     const maxPoints = 5;
      //     const totalPoints = this.axis.series[0].data.length;
      
      //     if (totalPoints > maxPoints) {
      //       const interval = Math.ceil(totalPoints / maxPoints);
      //       const xValue = typeof this.value === 'number' ? this.value : Number(this.value);
            
      //       if (this.axis.series[0].data.some(point => point.x === xValue) &&
      //           (this.axis.series[0].data.findIndex(point => point.x === xValue) % interval === 0)) {
      //         return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', xValue);
      //       }
      //       return '';
      //     }
      //     return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', Number(this.value));
      //   }
      // }      
    },
    yAxis: {
      title: {
        text: 'Dự Đoán'
      },
      tickInterval: 20, // Khoảng cách giữa các dấu phân cách trên trục Y
      labels: {
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
          return `${this.value} %`; // Thêm ký hiệu % vào các giá trị của trục Y
        }
      },
      min: 0, // Giá trị nhỏ nhất trên trục Y
      max: 100 // Giá trị lớn nhất trên trục Y
    },
    tooltip: {
      shared: true,
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
         // Kiểm tra và chuyển đổi `this.x` thành số, hoặc sử dụng một giá trị mặc định
        const xValue = typeof this.x === 'number' ? this.x : Date.now(); // Sử dụng Date.now() nếu this.x undefined
        const timeFormatted = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', xValue);
  
        // Lặp qua các điểm và thêm ký hiệu % vào giá trị
        const pointsFormatted = this.points?.map(point => {
          return `${point.series.name}: ${point.y} %`;
        }).join('<br/>');
  
        return `<b>${timeFormatted}</b><br/>${pointsFormatted}`;
      }
    },
    series: seriesDataMot,
    plotOptions: {
      series: {
        point: {
          events: {
            click: function () {
              const point = this as any;  // Ép kiểu this thành any
              alert(`Flow ID: ${point.flow_id}`);
              setSelectedPoint(point);
            }
          }
        }
      }
    }    
  };
  const options_hai: Highcharts.Options = {
    chart: {
      type: 'line',
      height: 400, // Đặt chiều cao biểu đồ thành 500 pixels (có thể thay đổi giá trị này tùy ý),
      scrollablePlotArea: {
        minWidth: 3000, // Chiều rộng tối thiểu, mỗi điểm chiếm khoảng 100 pixel
      }
    },
    title: {
      text: 'Thuật toán 2'
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Thời Gian'
      },
      crosshair: {
        color: '#ff0000', // Màu của đường crosshair (đỏ)
        width: 2,          // Độ dày của đường crosshair
        dashStyle: 'ShortDash' // Kiểu đường crosshair (chấm gạch ngắn)
      },
      scrollbar: {
        enabled: true,
        barBackgroundColor: '#888888',
        barBorderRadius: 7,
        barBorderWidth: 0,
        buttonBackgroundColor: '#cccccc',
        buttonBorderWidth: 0,
        rifleColor: '#000000',
        trackBackgroundColor: '#eeeeee',
        trackBorderWidth: 1
      }
      // labels: {
      //   formatter: function () {
      //     const maxPoints = 5;
      //     const totalPoints = this.axis.series[0].data.length;
      
      //     if (totalPoints > maxPoints) {
      //       const interval = Math.ceil(totalPoints / maxPoints);
      //       const xValue = typeof this.value === 'number' ? this.value : Number(this.value);
            
      //       if (this.axis.series[0].data.some(point => point.x === xValue) &&
      //           (this.axis.series[0].data.findIndex(point => point.x === xValue) % interval === 0)) {
      //         return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', xValue);
      //       }
      //       return '';
      //     }
      //     return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', Number(this.value));
      //   }
      // }      
    },
    yAxis: {
      title: {
        text: 'Dự Đoán'
      },
      tickInterval: 20, // Khoảng cách giữa các dấu phân cách trên trục Y
      labels: {
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
          return `${this.value} %`; // Thêm ký hiệu % vào các giá trị của trục Y
        }
      },
      min: 0, // Giá trị nhỏ nhất trên trục Y
      max: 100 // Giá trị lớn nhất trên trục Y
    },
    tooltip: {
      shared: true,
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
         // Kiểm tra và chuyển đổi `this.x` thành số, hoặc sử dụng một giá trị mặc định
        const xValue = typeof this.x === 'number' ? this.x : Date.now(); // Sử dụng Date.now() nếu this.x undefined
        const timeFormatted = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', xValue);
  
        // Lặp qua các điểm và thêm ký hiệu % vào giá trị
        const pointsFormatted = this.points?.map(point => {
          return `${point.series.name}: ${point.y} %`;
        }).join('<br/>');
  
        return `<b>${timeFormatted}</b><br/>${pointsFormatted}`;
      }
    },
    series: seriesDataHai,
    plotOptions: {
      series: {
        point: {
          events: {
            click: function () {
              const point = this as any;  // Ép kiểu this thành any
              alert(`Flow ID: ${point.flow_id}`);
              setSelectedPoint(point);
            }
          }
        }
      }
    }    
  };
  return (
    <div className ="container" style={{ width: '100%' }} >
  
    <Card className="card-container" size="small">

    <div className="highcharts-container">
    <HighchartsReact
      highcharts={Highcharts}
      options={options_mot}
    />
  </div>
    </Card>

  <Card className="card-container" size="small">
<div className="highcharts-container">
<HighchartsReact
  highcharts={Highcharts}
  options={options_hai}
/>
</div>
</Card>

  </div>
  );
};

export default MonitorFlow;
