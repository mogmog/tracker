import React, {Component} from 'react';
import {Tabs, Row, Col, List, Carousel, Divider, Card, Icon, Tooltip, Button, Checkbox} from 'antd';

import { Chart, Geom, Axis,  Coord, Label, Legend, Guide, Shape, Facet, G2 } from 'bizcharts';

import { View } from "@antv/data-set";

import FacebookProvider, {EmbeddedPost} from 'react-facebook';

const TabPane = Tabs.TabPane;

import Modal from "../../Modal/Modal";

import {MiniArea, MiniBar, Field} from 'components/Charts';
import BigTrend from "../../BigTrend/index";
import CustomMentionEditor from "../EditorCard/EditorWithMentions";
import InfluencerItem from "../../Influencers/InfluencerItem";

import NarrativeTrend from '../../Narratives/NarrativeTrend';

import styles from './NarrativeCardModal.less';
import PostItem from "../../Posts/PostItem";
import ChartCard from "../../Charts/ChartCard/index";
import Facebook from "../../Content/Facebook/Facebook";
import Twitter from "../../Content/Twitter/Twitter";
import InfluencerDetail from "../../Influencers/InfluencerDetail";

class NarrativeCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {pane: 0, influencerdetaillist: []};
  }

  jump(i) {
      this.socialmediacarousel.goTo(i);
  }

  slideback() {
    this.setState({pane: 0});
  }

  viewInfluencers() {
    this.setState({pane: 1});
  }

  addInfluencer(item) {
    this.setState({influencerdetaillist: this.state.influencerdetaillist.concat([item])});
  }

  render() {

    const topColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 8
    };

    const {data, toggle} = this.props;
    const {pane, influencerdetaillist} = this.state;

    const component1 = <Row>
      <Col span={14}>

        <Row>

          <Col span={8}>

            <NarrativeTrend trend={data.trend}
                            tooltip={data['socialmedia']['posts']['tooltip']}
                            direction={data['socialmedia']['posts']['direction']}
                            type={data['socialmedia']['posts']['type']}
                            absolute={data['socialmedia']['posts']['absolute']}
                            delta={data['socialmedia']['posts']['delta']}
                            percent={data['socialmedia']['posts']['percent']}/>
          </Col>

          <Col span={8}>
            <NarrativeTrend trend={data.trend}
                            tooltip={data['socialmedia']['engagement']['tooltip']}
                            direction={data['socialmedia']['engagement']['direction']}
                            type={data['socialmedia']['engagement']['type']}
                            absolute={data['socialmedia']['engagement']['absolute']}
                            delta={data['socialmedia']['engagement']['delta']}
                            percent={data['socialmedia']['engagement']['percent']}/>
          </Col>

          <Col span={8}>
            <NarrativeTrend trend={data.trend}
                            tooltip={data['socialmedia']['reach']['tooltip']}
                            direction={data['socialmedia']['reach']['direction']}
                            type={data['socialmedia']['reach']['type']}
                            absolute={data['socialmedia']['reach']['absolute']}
                            delta={data['socialmedia']['reach']['delta']}
                            percent={data['socialmedia']['reach']['percent']}/>
          </Col>

        </Row>

        <Row gutter={10}>

          <div className={styles["card-container"]}>
            <div className={styles.narrativecarousel}>
              <Carousel ref={(carousel) => this.socialmediacarousel = carousel} dots={true}>
                {data.posts.map((post, key) =>
                  <div>
                    {post.type === 'facebook' &&
                    <Facebook key={key} name={post.name} content={post.content} date={post.date}/>}
                    {post.type === 'twitter' &&
                    <Twitter key={key} name={post.name} content={post.content} date={post.date}/>}
                  </div>
                )}
              </Carousel>
            </div>
          </div>

        </Row>

        <Row>
          <Col>

            <List
              size="small"
              header={'Posts'}
              itemLayout="horizontal"
              dataSource={data.posts}
              renderItem={(item, i) => (
                <PostItem onClick={(e) => {this.jump(i)}} item={item}/>
              )}
            />

            <List
              header={<span> Influencers {!!influencerdetaillist.length && <Button
                onClick={this.viewInfluencers.bind(this)}>View {influencerdetaillist.length} selected</Button>} </span>}
              itemLayout="horizontal"
              dataSource={data.influencers}
              renderItem={item => (
                <span>

              <InfluencerItem
                item={item}
                extra={<Checkbox onClick={(e) => this.addInfluencer(item)}/>}
                onClick={(e) => {
                  this.setState({item, visible: true})
                }}/>

            </span>
              )}
            />

         {/*   <CustomMentionEditor actions={() => {
            }}></CustomMentionEditor>*/}
          </Col>
        </Row>


      </Col>

      <Col span={9} push={1}>

        <div style={{background: '#ECECEC', padding: '1px'}}>

          <Row>
            <Col span={24}>

              <ChartCard
                bordered={true}
                title={<span><Icon type={'form'}></Icon>Analysis</span>}
              >
                {data.analysis}
              </ChartCard>
            </Col>

          </Row>

        </div>

      </Col>
    </Row>;


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
        alias: 'Daily fat intake', // 定义别名
        tickInterval: 5, // 自定义刻度间距
        nice: false, // 不对最大最小值优化
        max: 96, // 自定义最大值
        min: 62, // 自定义最小是
      },
      y: {
        alias: 'Daily sugar intake',
        tickInterval: 50,
        nice: false,
        max: 165,
        min: 0,
      },
      z: {
        alias: 'Obesity(adults) %',
      },
    };

    const component2 = (<div>
      <Button onClick={this.slideback.bind(this)}>Back to Narrative Summary</Button>

      <Row>
        {influencerdetaillist.length ===1 && <Col span={24}><span><InfluencerDetail item={influencerdetaillist[0]}></InfluencerDetail></span></Col>}
        {influencerdetaillist.length ===2 && <span><Col span={10}><InfluencerDetail item={influencerdetaillist[0]}></InfluencerDetail></Col><Col push={2} span={10}><InfluencerDetail item={influencerdetaillist[1]}></InfluencerDetail></Col></span>}
        {influencerdetaillist.length ===3 && <span><Col span={8}><InfluencerDetail item={influencerdetaillist[0]}></InfluencerDetail></Col><Col span={8}><InfluencerDetail item={influencerdetaillist[1]}></InfluencerDetail></Col><Col span={8}><InfluencerDetail item={influencerdetaillist[2]}></InfluencerDetail></Col></span>}


      </Row>


      <Row>
        <Col>

          <Chart height={300} data={bubble} padding={[20, 0, 80, 80]} scale={cols} plotBackground={{
            stroke: '#ccc', // 边颜色
            lineWidth: 1, // 边框粗细
          }} forceFit>
            <Axis name="x" label={{ formatter: (val) => {
                return val + ' gr'; // 格式化坐标轴显示文本
              }}}
                  grid={{
                    lineStyle: {
                      stroke: '#d9d9d9',
                      lineWidth: 1,
                      lineDash: [2, 2],
                    },
                  }}
            />
            <Axis name="y" title={{offset: 64}} label={{
              formatter: function(val) {
                if (val > 0) {
                  return val + ' gr';
                }
              }
            }} />

            {/*<Tooltip title='country' />*/}
            <Geom type='point' position="x*y" color="#1890ff" style={{ineWidth: 1,stroke: '#1890ff'}} shape='circle' size={['z', [ 10, 40 ]]} tooltip='x*y*z' opacity={0.3} >
              <Label content="name*country" offset={0} textStyle={{
                fill: '#1890FF',
              }}/>
            </Geom>
            <Guide>
              <Guide.Line start={['min',50]}
                    end= {['max', 50]} text={{
                content: 'Safe sugar intake 50g/day',
                position: 'end',
                style: {
                  textAlign: 'end'
                }
              }}
              />
              <Guide.Line start={[65, 'min']}
                    end= {[65, 'max']} text={{
                content: 'Safe fat intake 65g/day',
                position: 'end',
                autoRotate: false,
                style: {
                  textAlign: 'start'
                }
              }}
              />
            </Guide>
          </Chart>

        </Col>
      </Row>

      </div>);

    return (<Modal pane={pane} toggle={toggle} title={data.title} width={'70%'} footer={[]} component1={component1}
                   component2={component2}></Modal>);
  }
}

export default NarrativeCardModal;






