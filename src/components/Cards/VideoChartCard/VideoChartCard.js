import React, {Component} from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide, Shape, Facet, G2 } from 'bizcharts';
import { View } from "@antv/data-set";

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

    return (<ChartCard
      bordered={false}
      title="Something"
      footer={<Field label="Blah" value={`${numeral(12423).format('0,0')}`} />}
      contentHeight={400}
    >
      <Chart height={400} data={data2} scale={cols} forceFit onTooltipChange={(ev)=>{
        var items = ev.items; // tooltip显示的项

        console.log(ev.items);

        items.pop();
        items.pop();
        items.pop();

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
        <Axis name="year" />
        <Axis name="value" label={{
          formatter: val => {
            return (val / 10000).toFixed(1) + 'k';
          }
        }} />
        <Tooltip
          containerTpl='<div class="g2-tooltip"><p class="g2-tooltip-title"></p><table class="g2-tooltip-list"></table></div>'
          itemTpl='<tr class="g2-tooltip-list-item"><td style="color:{color}">{name}</td><td>{value}</td></tr>'
          offset={50}
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
        <Geom type="area" position="year*value" />
        <Geom type="line" position="year*value" size={2} />
      </Chart>
    </ChartCard>);
  }
}

VideoChartCard.defaultProps = {
  data: {}
};

export default VideoChartCard;
