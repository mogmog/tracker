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
import ChartCardHeader from "../../Charts/ChartCard/header";
import ContentList from "../../Content/List/ContentList";
import _ from 'lodash';

class NarrativeCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {pane: 0, influencerdetaillist: []};
  }

  jump(i) {
    console.log(this.socialmediacarousel);
      this.socialmediacarousel.slick.slickGoTo(i);
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

  removeInfluencer(item) {
    this.setState({influencerdetaillist: _.remove(this.state.influencerdetaillist, (i) => { return i.name === item.name}) });
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

    const component1 =
      <div>
      <Row>
      <Col span={14}>
            <img style={{'marginLeft' : '20px', width : '90%', 'paddingBottom' : '10px'}} src={require('./../../../assets/narrative_charts.png')}/>
      </Col>

        <Col span={10}>
          <ContentList posts={data.posts}/>
        </Col>

      </Row>

        <Row>
          <Col span={14}>

            <ChartCard
              bordered={false}
              title={<ChartCardHeader thin text={'Analysis'}/>}
            >
              <div> {data.analysis} </div>

            </ChartCard>
          </Col>

          <Col span={10}>

            <List
              header={<span> Influencers {!!influencerdetaillist.length && <Button
                onClick={this.viewInfluencers.bind(this)}>View {influencerdetaillist.length} selected</Button>} </span>}
              itemLayout="horizontal"
              dataSource={data.influencers}
              renderItem={item => (
                <span>

              <InfluencerItem
                item={item}
                extra={<Checkbox onClick={(e) => {if (e.target.checked) {this.addInfluencer(item) } else {this.removeInfluencer(item)}}}/>}
                onClick={(e) => {
                  this.setState({item, visible: true})
                }}/>

            </span>
              )}
            />

          </Col>

        </Row>

      </div>

    const component2 = (<div>
      <Button onClick={this.slideback.bind(this)}>Back to Narrative Summary</Button>

      <Row>
        {influencerdetaillist.length ===1 && <Col span={24}><span><InfluencerDetail item={influencerdetaillist[0]}></InfluencerDetail></span></Col>}
        {influencerdetaillist.length ===2 && <span><Col span={11}><InfluencerDetail item={influencerdetaillist[0]}></InfluencerDetail></Col><Col push={2} span={11}><InfluencerDetail item={influencerdetaillist[1]}></InfluencerDetail></Col></span>}
        {influencerdetaillist.length >=3 && <span> You can currently compare 2 influencers</span>}


      </Row>


      <Row>
        <Col>



        </Col>
      </Row>

      </div>);

    return (<Modal pane={pane} toggle={toggle}  title={<ChartCardHeader colorIndex={data.colorIndex} text={data.title}/>} width={'70%'} footer={[]} component1={component1}
                   component2={component2}></Modal>);
  }
}

export default NarrativeCardModal;






