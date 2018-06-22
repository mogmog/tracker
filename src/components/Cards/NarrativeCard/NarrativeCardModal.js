import React, {Component} from 'react';
import {Tabs, Row, Col, Modal} from 'antd';
import FacebookProvider, {EmbeddedPost} from 'react-facebook';

const TabPane = Tabs.TabPane;

import {MiniArea} from 'components/Charts';
import BigTrend from "../../BigTrend/index";
import CustomMentionEditor from "../EditorCard/EditorWithMentions";

class NarrativeCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <Col span={8}>
          <MiniArea line height={120} data={data.trend}/>
        </Col>

        <Col span={8}>
          <BigTrend reverseColor flag={'up'} children={<span>56%</span>}/>
        </Col>

        <Col span={8}>

        </Col>

      </Row>

      <Row gutter={10}>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Facebook" key="1">

            {data.posts.map((post) => <Col {...topColResponsiveProps}>
              <FacebookProvider appId="1568172383396211">
                <EmbeddedPost href={post.url} width={'100px'}/>
              </FacebookProvider>
            </Col>)}
          </TabPane>

          <TabPane tab="Twitter" key="2">
            tbc
          </TabPane>
        </Tabs>

      </Row>

      <Row>
        <Col>
          <CustomMentionEditor actions={() => {
          }}></CustomMentionEditor>
        </Col>
      </Row>


    </Modal>);
  }
}

export default NarrativeCardModal;






