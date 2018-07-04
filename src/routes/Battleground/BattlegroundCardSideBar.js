import React, {Component} from 'react';
import {connect} from 'dva';

import Transition from 'react-motion-ui-pack';
import {Motion, spring} from 'react-motion';


import {Row, Col, Card, Button} from 'antd';

import styles from './BattlegroundCardSideBar.less';
import HDSidebar from "../../components/Sidebar/HDSidebar";

export default class extends Component {

  render() {

    //music has the
    const { right, children } = this.props;

    return (

        <HDSidebar open={true} right={right} width={100}>

          <Row>
            <Col>

              <Transition
                component="ul"
                className={styles.sidebar}
                enter={{
                  translateY: spring(0, {stiffness: 200, damping: 15})
                }}
                leave={{
                  translateY: 100
                }}
              >

                {children}

              </Transition>
            </Col>
          </Row>

        </HDSidebar>

    );
  }
}
