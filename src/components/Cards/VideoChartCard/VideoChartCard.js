import React, {Component} from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide, Shape, Facet, G2, View } from 'bizcharts';

import { View as Something} from '@antv/data-set';
import sample from './sample.json';
import schema from './schema.json';

import numeral from 'numeral';

import {
  ChartCard,
  Field,
} from 'components/Charts';

class VideoChartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.schema = schema;
    this.sample = sample;
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
        tickInterval: 2
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
      {"date": "2017-08-06", "type": "Client", "version": "2.0", "value": 1111111},
      {"date": "2018-08-20", "type": "Client", "version": "2.1", "value": 1111111},
      {"date": "2018-08-27", "type": "Server", "version": "3.5", "value": 1111111},
      {"date": "2018-09-03", "type": "Client", "version": "2.2", "value": 1111111}
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

      </Chart>
    </ChartCard>);
  }
}

VideoChartCard.defaultProps = {
  data: sample
};

export default VideoChartCard;
