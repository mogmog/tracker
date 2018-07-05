import React, {Fragment} from 'react';
import _ from 'lodash';
import {
  Row,
  Col,
  Divider
} from 'antd';

import {Motion, spring} from 'react-motion';

import CardLoader from "../../components/CardLoader/CardLoader";

import CardJSONEditor from "../../components/CardJSONEditor/CardJSONEditor";
import NewCard from "../../components/CardJSONEditor/NewCard";
import DashboardHeader from "../../components/Headers/index";

class ColumnDashboard extends React.PureComponent {

  render() {

    const {cardpositions} = this.props;

    const positions = cardpositions.cardpositions;

    const groupedByPos = _.reduce(positions.list, (obj, position) => {
      obj[position.position] = position
      return obj;
    }, {});

    return (

      <Fragment>

        <div style={{margin: '24px 24px 0px'}}>

          <Row gutter={24}>

            <Col span={6}>
              <CardLoader card={groupedByPos[0].card}/>
            </Col>

            <Col span={6}>
              <CardLoader card={groupedByPos[0].card}/>
            </Col>

            <Col span={6}>
              <CardLoader card={groupedByPos[0].card}/>
            </Col>

            <Col span={6}>
              <CardLoader card={groupedByPos[0].card}/>
            </Col>

          </Row>

        </div>
      </Fragment>
    );
  }

}

export default ColumnDashboard;
