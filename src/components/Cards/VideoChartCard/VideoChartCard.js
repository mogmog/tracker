import React, {Component} from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide, Shape, Facet, G2, View } from 'bizcharts';

import { View as Something} from '@antv/data-set';

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

    const dv = new Something().source(data.socialmedia);

    dv.transform({
      type: 'percent',
      field: 'value',
      dimension: 'country',
      groupBy: [ 'year' ],
      as: 'percent'
    });
    const cols = {
      year: {
        type: 'linear',
        tickInterval: 50
      },
      'percent': {
        formatter: function(value) {
          value = value || 0;
          value = value * 100;
          return parseInt(value);
        },
        alias: 'percent(%)'
      }
    }




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
      title={data.title}
      footer={<Field label="Blah" value={`${numeral(12423).format('0,0')}`} />}
      contentHeight={400}
    >
      <Chart height={400}  scale={cols} forceFit >

        <View data={dv} scale={cols} >

            <Axis name="year" />
            <Axis name="percent" />

            <Tooltip crosshairs={{type:'line'}}/>
            <Geom type="areaStack" position="year*percent" color='country' />
            <Geom type="lineStack" position="year*percent" size={2} color='country' />



        </View>

        <Legend />


        {/*<View data={markData} scale={cols}>

          <Geom type="interval" position="date*value" color={['type', ['#ff7f00', '#093']]} size={3} />
          <Geom type="point" position="date*value" color={['type', ['#ff7f00', '#093']]} shape='circle'  size={10} >
            <Label
              content="version"
              custom={true}
              renderer={formatter}
              offset={0}
            />
          </Geom>
        </View>*/}

        {/*<Tooltip
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
        />*/}

      </Chart>
    </ChartCard>);
  }
}

VideoChartCard.defaultProps = {
  data: {}
};

export default VideoChartCard;
