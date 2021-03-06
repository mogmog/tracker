import React, {Component} from 'react';

import {List, Avatar, Icon} from 'antd';

import {ChartCard} from '../../Charts/index';
import InfluencerItem from "./../../Influencers/InfluencerItem";
import InfluencerListCardModal from "./InfluencerListCardModal";

import sample from './sample.json';
import schema from './schema.json';
import ChartCardHeader from "../../Charts/ChartCard/header";

class InfluencerListCard extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false};
  }

  toggleModal() {
    this.setState({'visible': !this.state.visible});
  }

  render() {
    const {data} = this.props;

    return (

      <ChartCard bordered={true} title={<ChartCardHeader icon={<Icon type={'user'} />} text={data.title}/>} >

      <List
        itemLayout="horizontal"
        dataSource={data.influencers}
        renderItem={item => (
          <InfluencerItem item={item} onClick={(e) => {
            this.setState({item, visible: true})
          }}/>
        )}
      />

      <InfluencerListCardModal item={this.state.item} visible={this.state.visible} onCancel={this.toggleModal.bind(this)}/>

    </ChartCard>);
  }
}

InfluencerListCard.defaultProps = {
  data: sample
};
export default InfluencerListCard;
