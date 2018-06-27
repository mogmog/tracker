import React, {PureComponent} from 'react';
import { Chart, Geom, Axis,  Coord, Label, Legend, Guide, Shape, Facet, G2, Tooltip } from 'bizcharts';
import { View } from "@antv/data-set";

export default class InfluencerBubbleChart extends PureComponent {

  render() {
    const {} = this.props;


    const bubble = [
      { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
      { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
      { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
      { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
      { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
      { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
      { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
      { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
      { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
      { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
      { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
      { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
      { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
      { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
      { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' },
    ];
    const cols = {
      x: {
        alias: 'Relevance',
        tickInterval: 5,
        nice: false,
        max: 96,
        min: 62,
      },
      y: {
        alias: 'Reach',
        tickInterval: 50,
        nice: false,
        max: 165,
        min: 0,
      },
      z: {
        alias: 'Posts',
      },
    };

    return (
      <Chart height={800} data={bubble} padding={[50,50,50,50]} scale={cols} plotBackground={{
        stroke: '#ccc', // 边颜色
        lineWidth: 1, // 边框粗细
      }} forceFit>
        <Axis name="x" label={{ formatter: (val) => {
            return val + '% relavence';
          }}}
              grid={{
                lineStyle: {
                  stroke: '#d9d9d9',
                  lineWidth: 1,
                  lineDash: [2, 2],
                },
              }}
        />
        <Axis name="y" title={{offset: 24}} label={{
          formatter: function(val) {
            if (val > 0) {
              return val + ' gr';
            }
          }
        }} />

        <Tooltip title='country' />
        <Geom type='point' position="x*y" color="#1890ff" style={{ineWidth: 1,stroke: '#1890ff'}} shape='circle' size={['z', [ 10, 40 ]]} tooltip='x*y*z' opacity={0.3} >
          <Label content="name*country" offset={0} textStyle={{
            fill: '#1890FF',
          }}/>
        </Geom>

      </Chart>
    );
  }
}
