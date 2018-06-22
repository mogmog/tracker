import React, {Component} from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide, Shape, Facet, G2, View } from 'bizcharts';

import numeral from 'numeral';

import {
  ChartCard,
  Field,
} from 'components/Charts';

class VideoChartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;

// Data source

    const { Line } = Guide;

    const data2 = [
      { year: '1991', value: 15468, videos : [1,2,3,4] },
      { year: '1992', value: 16100, videos : [1,2,3,4]},
      { year: '1993', value: 15900, videos : [1,2,3,4] },
      { year: '1994', value: 17409, videos : [1,2,3,4] },
      { year: '1995', value: 17000, videos : [1,2,3,4] },
      { year: '1996', value: 31056, videos : [1,2,3,4] },
      { year: '1997', value: 31982, videos : [1,2,3,4] },
      { year: '1998', value: 32040, videos : [1,2,3,4] },
      { year: '1999', value: 33233, videos : [1,2,3,4] }
    ];
    const cols={
      value: {
        min: 10000
      },
      year: {
        range: [ 0 , 1 ]
      }
    };

    var markData = [
      {"date": "1997-08-06", "type": "Client", "version": "2.0", "value": 1111111},
      {"date": "1998-08-20", "type": "Client", "version": "2.1", "value": 1111111},
      {"date": "1997-08-27", "type": "Server", "version": "3.5", "value": 1111111},
      {"date": "1998-09-03", "type": "Client", "version": "2.2", "value": 1111111}
    ];

    function formatter(text, item) {
      var point = item.point;
      var type = point['type'];
      return '<div style="width: 60px;text-align: center;font-size: 8px;line-height: 1.2;color: #fff;margin-left: -8px;"><span>' + type + '</span><br><span>' + text + '</span></div>';
    }

    function test() {
      alert(1);
    }


    return (<ChartCard
      bordered={false}
      title="Something"
      footer={<Field label="Blah" value={`${numeral(12423).format('0,0')}`} />}
      contentHeight={400}
    >
      <Chart height={400}  scale={cols} forceFit onTooltipChange={(ev)=>{
        var items = ev.items; // tooltip显示的项

        (ev.tooltip._attrs.container.onclick = (e) => {alert(JSON.stringify(ev.items))});

        items.push({
          name: 'Video 1',
          title:  'TEst',
          marker: false,
          color: '',
          value: 12
        });
        items.push({
          name: 'Video 2',
          marker: false,
          title: 'dfdf',
          color: '',
          value: 56
        });
      }}>

        <View data={data2} scale={cols} >

        <Axis name="year" />
        <Axis name="value" label={{
          formatter: val => {
            return (val / 10000).toFixed(1) + 'k';
          }
        }} />

        <Geom type="area" position="year*value" />
        <Geom type="line" position="year*value" size={2} />
        </View>


        <View data={markData} scale={cols}>

          <Geom type="interval" position="date*value" color={['type', ['#ff7f00', '#093']]} size={3} />
          <Geom type="point" position="date*value" color={['type', ['#ff7f00', '#093']]} shape='circle'  size={10} >
            <Label
              content="version"
              custom={true}
              renderer={formatter}
              offset={0}
            />
          </Geom>
        </View>

        <Tooltip
          onTooltipChange={(e) => {alert(1)}}
          enterable ={true}
          containerTpl='<div class="g2-tooltip"><p class="g2-tooltip-title"></p><table class="g2-tooltip-list"></table></div>'
          itemTpl='<tr class="g2-tooltip-list-item"><td style="color:{color}">{name}</td><td>{value}</td></tr>'
          offset={0}
          g2-tooltip={{
            position: 'absolute',
            visibility: 'hidden',
            border : '1px solid #efefef',
            backgroundColor: 'white',
            color: '#000',
            opacity: "0.8",
            padding: '5px 15px'
          }}  g2-tooltip-list={{
          margin: '10px'
        }}
        />

      </Chart>
    </ChartCard>);
  }
}

VideoChartCard.defaultProps = {
  data: {}
};

export default VideoChartCard;
