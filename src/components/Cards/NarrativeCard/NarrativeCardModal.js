import React, {Component} from 'react';
import {Tabs, Row, Col, Modal, List, Carousel, Divider, Card } from 'antd';
import FacebookProvider, {EmbeddedPost} from 'react-facebook';

const TabPane = Tabs.TabPane;

import {MiniArea} from 'components/Charts';
import BigTrend from "../../BigTrend/index";
import CustomMentionEditor from "../EditorCard/EditorWithMentions";
import InfluencerItem from "../../Influencers/InfluencerItem";

import NarrativeTrend from '../../Narratives/NarrativeTrend';

import styles from './NarrativeCardModal.less';
import PostItem from "../../Posts/PostItem";

class NarrativeCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  jump() {
   console.log(this.carousel.goTo(1));
  }

  render() {

    const topColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 8
    };

    const {data, modalvisible, onCancel} = this.props;

    return (<Modal title={data.title} visible={modalvisible} width={'70%'} onCancel={onCancel} footer={[]} >

      <Row>
        <Col span={17}>

          <Row>
            <Col span={8}>
              <MiniArea line height={120} data={data.trend}/>
            </Col>

            <Col span={16}>

              <Row>
                <Col span={8}>
                  <NarrativeTrend type={data['socialmedia']['posts']['type']} absolute={data['socialmedia']['posts']['absolute']} delta={data['socialmedia']['posts']['delta']} percent={data['socialmedia']['posts']['percent']} />
                </Col>

                <Col span={8}>
                  <NarrativeTrend type={data['socialmedia']['engagement']['type']} absolute={data['socialmedia']['engagement']['absolute']} delta={data['socialmedia']['engagement']['delta']} percent={data['socialmedia']['engagement']['percent']} />
                </Col>

                <Col span={8}>
                  <NarrativeTrend type={data['socialmedia']['reach']['type']} absolute={data['socialmedia']['reach']['absolute']} delta={data['socialmedia']['reach']['delta']} percent={data['socialmedia']['reach']['percent']} />
                </Col>

              </Row>

            </Col>



          </Row>

          <Divider/>

          <Row gutter={10}>


            <div className={styles["card-container"]}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Facebook" key="1">

                  <div className={styles.narrativecarousel}>
                    <Carousel ref={(carousel) => this.carousel = carousel}>
                      {data.posts.map((post) =>
                        <div><FacebookProvider appId="1568172383396211">
                          <EmbeddedPost href={post.url} />
                        </FacebookProvider>
                        </div>
                     )}
                    </Carousel>
                  </div>



                </TabPane>

                <TabPane tab="Twitter" key="2">
                  tbc
                </TabPane>
              </Tabs>
            </div>

          </Row>

          <Row>
            <Col>

              <div style={{ background: '#ECECEC', padding: '20px' }}>

                <Row>
                  <Col span={8}>
                    <Card title="Analysis" bordered={false} >.
                      <a onClick={this.jump.bind(this)}>as we can see</a> facebook has 1B users blah blah blah.

                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                    </Card>
                  </Col>


                  <Col span={8}>
                    <Card title="Analysis" bordered={false} >.
                      <a onClick={this.jump.bind(this)}>as we can see</a> facebook has 1B users blah blah blah.

                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                    </Card>
                  </Col>


                  <Col span={8}>
                    <Card title="Analysis" bordered={false} >.
                      <a onClick={this.jump.bind(this)}>as we can see</a> facebook has 1B users blah blah blah.

                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                    </Card>
                  </Col>

                </Row>


              </div>



              <CustomMentionEditor actions={() => {
              }}></CustomMentionEditor>
            </Col>
          </Row>


        </Col>

        <Col span={6} push={1}>

          Influencers
          <List
            itemLayout="horizontal"
            dataSource={data.influencers}
            renderItem={item => (
              <InfluencerItem item={item} onClick={(e) => {
                this.setState({item, visible: true})
              }}/>
            )}
          />

          Posts
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={[1,2,3,4,5,6,54,34,4,4,4,4,4,4,4,4,4]}
            renderItem={item => (
              <PostItem item={item} />
            )}
          />

        </Col>
      </Row>

    </Modal>);
  }
}

export default NarrativeCardModal;






