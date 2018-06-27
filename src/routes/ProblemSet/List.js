import React, {PureComponent} from 'react';
import numeral from 'numeral';
import {connect} from 'dva';
import { Row, Col, Form, Card, Select, Icon, Avatar, List, Tooltip, Dropdown, Menu, Table, Button } from 'antd';

import { Link } from 'dva/router';

import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';

import styles from './List.less';

export default class FilterCardList extends PureComponent {

  render() {
    const {problemsetx, loading, form} = this.props;

    const columns = [
      { title: 'Name', dataIndex: 'text', key: 'text' },
      { title: 'Post Volume', dataIndex: 'postvolume', key: 'postvolume' },
      { title: 'Engagement', dataIndex: 'engagement', key: 'engagement' },

      { title: 'Reach', dataIndex: 'reach', key: 'reach' },
      { title: 'Action', dataIndex: '', key: 'x', render: () => <Link to="/dashboard/analysis"> <Button> <Icon type={'eye'}/> View</Button> </Link>  },
    ];


    const problemset = {
      list: [
        {
          id: '1',
          text: 'What is happening in Estonia?',
          postvolume : 12,
          engagement : 14,
          reach : 15,
          subtext: 'ipso lipsum blah blah'
        },
        {
          id: '2',
          postvolume : 1,
          engagement : 1,
          reach : 5,
          text: 'Which Social media platforms do Terrorists use?',
          subtext: 'ipso lipsum blah blah'
        },

        {
          id: '3',
          postvolume : 7,
          engagement : 34,
          reach : 5,
          text: 'How religious are Russian millenials?',
          subtext: 'ipso lipsum blah blah'
        },

        {
          id: '4',
          postvolume : 8,
          engagement : 3,
          reach : 4,
          text: 'How well educated are citizens of Latvia?',
          subtext: 'ipso lipsum blah blah'
        },

      ]
    };


    return (
      <div className={styles.filterCardList}>

        <Card>
        <Table
          pagination={false}
          columns={columns}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.subtext}</p>}
          dataSource={problemset.list}
        />
        </Card>

      </div>
    );
  }
}
