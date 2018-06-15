import React, {Component} from 'react';

import { List, Avatar } from 'antd';

import { ChartCard } from '../../Charts/index';
import InfluencerListItem from "../../Influencers/InfluencerListItem";


class InfluencerListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;

    const data2 = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },

      {
        title: 'Ant Design Title 5',
      },

      {
        title: 'Ant Design Title 6',
      },

      {
        title: 'Ant Design Title 7',
      },

      {
        title: 'Ant Design Title 8',
      },

    ];



    return (<ChartCard
      bordered={true}
      title={'Influencers'}
      footer={[]}
    >

      <List
        itemLayout="horizontal"
        dataSource={data2}
        renderItem={item => (
          <InfluencerListItem item = {item}/>
        )}
      />

    </ChartCard>);
  }
}

InfluencerListCard.defaultProps = {
  data: {title : 'No title defined'}
};

export default InfluencerListCard;
