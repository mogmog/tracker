import React, { PureComponent } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, Icon, Avatar, List, Tooltip, Dropdown, Menu } from 'antd';

import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';

import styles from './List.less';

const { Option } = Select;
const FormItem = Form.Item;

const formatWan = val => {
  const v = val * 1;
  if (!v || isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <em className={styles.wan}>万</em>
      </span>
    );
  }
  return result;
};

/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(({ problemset, loading }) => ({
  problemset,
  loading: loading.models.list,
}))
export default class FilterCardList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'problemset/fetch',
    });
  }

  render() {
    const { problemset, loading, form } = this.props;

    console.log(this.props);

    const { getFieldDecorator } = form;

    const CardInfo = ({ text, subtext }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>{text}</p>
        </div>

        <div className={styles.subtext}>
          <p>{subtext}</p>
        </div>

      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };



    return (
      <div className={styles.filterCardList}>

        <List
          rowKey="id"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          loading={loading}
          dataSource={problemset.list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20, height : '30vh' }}
                actions={[
                  <Tooltip title="Share">
                    <Icon type="share-alt" />
                  </Tooltip>,

                  <Tooltip title="Share">
                    <Icon type="share-alt" />
                  </Tooltip>,

                ]}
              >
                <Card.Meta />
                <div className={styles.cardItemContent}>
                  <CardInfo
                    text={(item.text)}
                    subtext={(item.subtext)}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
