import React, {Component} from 'react';
import { Tabs, List, Avatar, Button, Row, Col , Icon, Modal, Menu, Dropdown, Timeline, Divider  } from 'antd';
import FacebookProvider, { EmbeddedPost } from 'react-facebook';

import { MiniArea } from 'components/Charts';
import moment from "moment/moment";
import BigTrend from "../BigTrend/index";

const TabPane = Tabs.TabPane;

class InfluencerListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {visible : false};
  }

  toggleModal() {
  this.setState({ 'visible' : !this.state.visible});
  }

  render() {
    const { item } = this.props;
    const { visible } = this.state;

    const data = [{"x":"2018-06-21","y":1},{"x":"2018-06-22","y":6},{"x":"2018-06-23","y":4},{"x":"2018-06-24","y":8},{"x":"2018-06-25","y":3},{"x":"2018-06-26","y":7},{"x":"2018-06-27","y":2}];

    const thing = [
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
    ];

    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.twitter.com/">Twitter</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.vk.com/">VK</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.ok.com/">OK</a>
        </Menu.Item>
      </Menu>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 8};

    return (

      <div><List.Item>

        <List.Item.Meta
          avatar={<Avatar onClick={this.toggleModal.bind(this)} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<Row> <Col span={10}>{item.title}</Col> <Col span={12} push={4}>  <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
              Social Networks <Icon type="down" />
            </a>
          </Dropdown> </Col> </Row> }
        />
      </List.Item>
        <Modal title={"Vladamir Putin"} visible={visible} width={'60%'} onCancel={this.toggleModal.bind(this)}>

          <Tabs defaultActiveKey="1" >
            <TabPane tab="Tab 1" key="1">

              <Row>

                <Col span={10}>
                  <MiniArea line height={120} data={data} />
                  <BigTrend reverseColor flag={'up'} children={<span>56%</span>}/>
                </Col>

                <Col span={4}>
                </Col>

                <Col span={10}>
                  <MiniArea line height={120} data={data} />
                  <BigTrend reverseColor flag={'down'} children={<span>35%</span>}/>
                  {/*graph*/}
                  {/*trend*/}
                </Col>

              </Row>

              <Divider/>

              <Row gutter={10}>

                <Col {...topColResponsiveProps}>
                  <FacebookProvider appId="1568172383396211">
                    <EmbeddedPost href="https://www.facebook.com/20531316728/posts/10154009990506729/"  />
                  </FacebookProvider>
                </Col>

                <Col {...topColResponsiveProps}>
                  <FacebookProvider appId="1568172383396211">
                    <EmbeddedPost href="https://www.facebook.com/20531316728/posts/10154009990506729/"  />
                  </FacebookProvider>
                </Col>

                <Col {...topColResponsiveProps}>
                  <FacebookProvider appId="1568172383396211">
                    <EmbeddedPost href="https://www.facebook.com/20531316728/posts/10154009990506729/" />
                  </FacebookProvider>
                </Col>

              </Row>


              <Divider/>

              <Row>
                <Col span={24}>

                  <Timeline>
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  </Timeline>

                </Col>
              </Row>


            </TabPane>
            <TabPane tab="Tab 2" key="2">
              <Row>

                <List
                  itemLayout="horizontal"
                  dataSource={thing}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="THING"
                      />
                    </List.Item>
                  )}
                />

              </Row>
            </TabPane>
          </Tabs>






        </Modal>
        </div>);
  }
}

export default InfluencerListItem;


