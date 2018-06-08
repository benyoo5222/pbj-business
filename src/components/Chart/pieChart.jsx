import React, {Component} from 'react';
var Chart = require("react-chartjs").Pie;

const pop_legend_1 = { background: "#F7464A" }
const pop_legend_2 = { background: "#46BFBD" }
const pop_legend_3 = { background: "#FB66F9" }
const pop_legend_4 = { background: "#FDB45C" }
const pop_legend_5 = { background: "#336BFF" }
const pop_legend_6 = { background: "#796BFF" }
const pop_legend_7 = { background: "#776B11" }
const pop_legend_8 = { background: "#996B11" }

const service_legend_1 = { background: "#F37736" }
const service_legend_2 = { background: "#4F3E8F" }
const service_legend_3 = { background: "#61FF4B" }
const service_legend_4 = { background: "#FFE500" }
const service_legend_5 = { background: "#D0838A" }
const service_legend_6 = { background: "#428BCA" }
const service_legend_7 = { background: "#FF9696" }

const pop_services = {

}

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceData: [
        { value: 100, color: "#F7464A", highlight: "#FF5A5E", label: "Men's Haircut" },
        { value: 50, color: "#46BFBD", highlight: "#5AD3D1", label: "Women's Haircut" },
        { value: 50, color: "#FB66F9", highlight: "#FF96FD", label: "Kids's Haircut" },
        { value: 50, color: "#FDB45C", highlight: "#FFC870", label: "Hair Colouring"},
        { value: 10, color: "#336BFF", highlight: "#668FFB", label: "Hair Extensions"},
        { value: 10, color: "#796BFF", highlight: "#668FFB", label: "Hair Highlights"},
        { value: 5, color: "#776B11", highlight: "#448FFB", label: "Scalp Treatments"},
        { value: 25, color: "#996B11", highlight: "#998FFB", label: "Laser Hair Removal"}
      ],
      dayData: [
        { value: 45, color: "#F37736", highlight: "#F37736", label: "Sunday" },
        { value: 25, color: "#4F3E8F", highlight: "#FF5A5E", label: "Monday" },
        { value: 20, color: "#61FF4B", highlight: "#FF5A5E", label: "Tuesday" },
        { value: 20, color: "#FFE500", highlight: "#FF5A5E", label: "Wednesday" },
        { value: 18, color: "#D0838A", highlight: "#FF5A5E", label: "Thursday" },
        { value: 30, color: "#428BCA", highlight: "#FF5A5E", label: "Friday" },
        { value: 50, color: "#FF9696", highlight: "#FF5A5E", label: "Saturday" },
      ],
      chartOptions: {
        animationSteps :100,
        animationEasing : "easeInOutBack",
      }
    }
  }

  render() {
    return (
      <div>
        <h2>Popular Services</h2>
        <Chart style={pop_services} data={this.state.serviceData} options={this.state.chartOptions}/>
        <div>
          <span style={pop_legend_1}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Men's Haircut <br />
          <span style={pop_legend_2}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Women's Haircut <br />
          <span style={pop_legend_3}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Kids's Haircut <br />
          <span style={pop_legend_4}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Hair Colouring <br />
          <span style={pop_legend_5}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Hair Extensions <br />
          <span style={pop_legend_6}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Hair Highlights <br />
          <span style={pop_legend_7}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Scalp Treatments <br />
          <span style={pop_legend_8}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Laser Hair Removal <br />
        </div>

        <h2>Services Per Day</h2>
        <Chart data={this.state.dayData} options={this.state.chartOptions}/>
        <div>
          <span style={service_legend_1}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Sunday <br />
          <span style={service_legend_2}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Monday <br />
          <span style={service_legend_3}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Tuesday <br />
          <span style={service_legend_4}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Wednesday <br />
          <span style={service_legend_5}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Thursday <br />
          <span style={service_legend_6}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Friday <br />
          <span style={service_legend_7}>&nbsp;&nbsp;&nbsp;&nbsp;</span> - Saturday <br />
        </div>
      </div>
    );
  }
}

export default PieChart;