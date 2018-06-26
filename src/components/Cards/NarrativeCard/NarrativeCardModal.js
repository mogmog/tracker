import React, {Component} from 'react';
import {Tabs, Row, Col, List, Carousel, Divider, Card, Icon , Tooltip , Button } from 'antd';

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

class NarrativeCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {

    const topColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 8
    };

    const {data , modalvisible } = this.props;

    const component1 = <Row>
      <Col span={17}>

        <Row>

          <Col span={8}>

            <NarrativeTrend trend={data.trend}
                            tooltip={data['socialmedia']['posts']['tooltip']}
                            direction={data['socialmedia']['posts']['direction']}
                            type={data['socialmedia']['posts']['type']}
                            absolute={data['socialmedia']['posts']['absolute']}
                            delta={data['socialmedia']['posts']['delta']}
                            percent={data['socialmedia']['posts']['percent']} />
          </Col>

          <Col span={8}>
            <NarrativeTrend trend={data.trend}
                            tooltip={data['socialmedia']['engagement']['tooltip']}
                            direction={data['socialmedia']['engagement']['direction']}
                            type={data['socialmedia']['engagement']['type']}
                            absolute={data['socialmedia']['engagement']['absolute']}
                            delta={data['socialmedia']['engagement']['delta']}
                            percent={data['socialmedia']['engagement']['percent']} />
          </Col>

          <Col span={8}>
            <NarrativeTrend trend={data.trend}
                            tooltip={data['socialmedia']['reach']['tooltip']}
                            direction={data['socialmedia']['reach']['direction']}
                            type={data['socialmedia']['reach']['type']}
                            absolute={data['socialmedia']['reach']['absolute']}
                            delta={data['socialmedia']['reach']['delta']}
                            percent={data['socialmedia']['reach']['percent']} />
          </Col>

        </Row>

        <Row gutter={10}>

          <div className={styles["card-container"]}>
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
          </div>

        </Row>

        <Row>
          <Col>

            <div style={{ background: '#ECECEC', padding: '1px' }}>

              <Row>
                <Col span={24}>

                  <ChartCard
                    bordered={true}
                    title={<span><Icon type={'form'}></Icon>Analysis</span>}
                  >
                    <a onClick={(e) => {this.jump(1)}}>as we can see</a> facebook has 1B users blah blah blah.

                    Lorem ipsum dolor sit amet, consectetur <a onClick={(e) => {this.jump(2)}}>dolore</a> elit, sed do eiusmod tempor incididunt ut labore et magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                  </ChartCard>
                </Col>

              </Row>

            </div>

            <CustomMentionEditor actions={() => {
            }}></CustomMentionEditor>
          </Col>
        </Row>


      </Col>

      <Col span={6} push={1}>

        <List
          header={'Influencers'}
          itemLayout="horizontal"
          dataSource={data.influencers}
          renderItem={item => (
            <InfluencerItem item={item} onClick={(e) => {
              this.setState({item, visible: true})
            }}/>
          )}
        />

        <List
          size="small"
          header={'Posts'}
          itemLayout="horizontal"
          dataSource={[1,2,3,4,5,6,54,34,4,4]}
          renderItem={item => (
            <PostItem item={item} />
          )}
        />

      </Col>
    </Row>;

    return (<Modal visible={modalvisible} title={data.title} width={'70%'} footer={[]} component1 = {component1} ></Modal>);
  }
}

export default NarrativeCardModal;






