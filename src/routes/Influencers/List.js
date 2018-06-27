import React, {PureComponent} from 'react';
import numeral from 'numeral';
import {connect} from 'dva';
import { Tabs, Row, Col, Form, Card, Select, Icon, Avatar, List, Tooltip, Dropdown, Menu, Table, Button } from 'antd';

import { Link } from 'dva/router';

import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';

import styles from './List.less';
import Facebook from "../../components/Content/Facebook/Facebook";
import InfluencerBubbleChart from "../../components/Influencers/Charts/Bubble";
import InfluencerItem from "../../components/Influencers/InfluencerItem";

export default class InfluencerList extends PureComponent {

  render() {
    const {problemsetx, loading, form} = this.props;

    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' , width : 300, render : (text, item) => <InfluencerItem item={item} />  },
      { title: 'Description', dataIndex: 'description', width : 350, key: 'description' , render : (text, item) => <span><Icon type="notification" />NO DESCRIPTION IN JSON</span>},
      { title: 'Posts', dataIndex: 'title', key: 'title' , render : (text, item) => <Facebook />},

    ];



    const influencers = {
      list: [
        {
          "category": "Hybrid Player",
          "country": "Tallinn, Estonia",
          "facebook": true,
          "instagram": false,
          "language": "Russian",
          "name": "Русское Радио",
          "notes": "None",
          "twitter": true
        },
        {
          "category": "Hybrid Player",
          "country": "Tallinn, Estonia",
          "facebook": true,
          "instagram": false,
          "language": "Russian",
          "name": "Baltnews.ee",
          "notes": "Positive sentiments towards Russia.",
          "twitter": false
        },
        {
          "category": "Hybrid Player",
          "country": "Tallinn, Estonia",
          "facebook": true,
          "instagram": true,
          "language": "Russian",
          "name": "МК-Эстония",
          "notes": "Moskovskij Komsomolets Estonia, Russian news site in Estonia. Pro-Russian posts.",
          "twitter": true
        },
        {
          "category": "Online Publication (Media)",
          "country": "Tallinn, Estonia",
          "facebook": true,
          "instagram": true,
          "language": "Russian",
          "name": "Stolitsa.ee",
          "notes": "Stolitsa.ee, website often has pro Russian articles in relation to Baltic states",
          "twitter": true
        },
        {
          "category": "Dedicated Player",
          "country": "Tallinn, Estonia",
          "facebook": true,
          "instagram": true,
          "language": "Russian",
          "name": "Посольство России в Эстонии / Russian Embassy in Estonia",
          "notes": "Russian Embassy in Estonia",
          "twitter": true
        }
      ]
    };

    const height = {height:  '950px'};

    return (
      <div className={styles.filterCardList}>

        <Tabs defaultActiveKey="1" >
          <Tabs.TabPane tab="List" key="1">

            <Card style={height}>
              <Table
                pagination={false}
                columns={columns}
                dataSource={influencers.list}
              />
            </Card>

          </Tabs.TabPane>

          <Tabs.TabPane tab="Graph" key="2">
             <Card style={height}>
               <InfluencerBubbleChart/>
             </Card>
          </Tabs.TabPane>

        </Tabs>



      </div>
    );
  }
}
