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

class ClassicDashboard extends React.PureComponent {

  render() {

    const {card, cardpositions} = this.props;

    const positions = cardpositions.cardpositions;
    const questioncards = card.questioncards;

    const groupedByPos = _.reduce(positions.list, (obj, position) => {
      obj[position.position] = position
      return obj;
    }, {});

    const topColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 12,
      style: {marginBottom: 48},
    };

    const secondColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 6,
      style: {marginBottom: 48},
    };

    //dfrt
    return (

      <Fragment>

        <Row>

          <Col span={18}>

            <Row gutter={24}>
              <Col span={8}>
                {groupedByPos[0] !== undefined ? (
                  <CardJSONEditor card={groupedByPos[0].card} position={0} dispatch={this.props.dispatch}>
                    <CardLoader card={groupedByPos[0].card}/>
                  </CardJSONEditor>) : (<NewCard position={0} {...this.props} />)}
              </Col>

              <Col span={8}>
                {groupedByPos[1] !== undefined ? (
                  <CardJSONEditor card={groupedByPos[1].card} position={1} dispatch={this.props.dispatch}>
                    <CardLoader card={groupedByPos[1].card}/>
                  </CardJSONEditor>) : (<NewCard position={1} {...this.props} />)}
              </Col>

              <Col span={8}>
                {groupedByPos[2] !== undefined ? (
                  <CardJSONEditor card={groupedByPos[2].card} position={2} dispatch={this.props.dispatch}>
                    <CardLoader card={groupedByPos[2].card}/>
                  </CardJSONEditor>) : (<NewCard position={2} {...this.props} />)}
              </Col>

            </Row>

            <Row gutter={24}>
              <Col {...secondColResponsiveProps}>
                {groupedByPos[3] !== undefined ? (
                  <CardJSONEditor card={groupedByPos[3].card} position={3} dispatch={this.props.dispatch}>
                    <CardLoader card={groupedByPos[3].card}/>
                  </CardJSONEditor>) : (<NewCard position={3} {...this.props} />)}
              </Col>
              <Col {...secondColResponsiveProps}>
                {groupedByPos[4] !== undefined ? (
                  <CardJSONEditor card={groupedByPos[4].card} position={4} dispatch={this.props.dispatch}>
                    <CardLoader card={groupedByPos[4].card}/>
                  </CardJSONEditor>) : (<NewCard position={4} {...this.props} />)}
              </Col>
              <Col {...secondColResponsiveProps}>
                {groupedByPos[5] !== undefined ? (
                  <CardJSONEditor card={groupedByPos[5].card} position={5} dispatch={this.props.dispatch}>
                    <CardLoader card={groupedByPos[5].card}/>
                  </CardJSONEditor>) : (<NewCard position={5} {...this.props} />)}
              </Col>
              <Col {...secondColResponsiveProps}>
                {groupedByPos[6] !== undefined ? (
                  <CardJSONEditor card={groupedByPos[6].card} position={6} dispatch={this.props.dispatch}>
                    <CardLoader card={groupedByPos[6].card}/>
                  </CardJSONEditor>) : (<NewCard position={6} {...this.props} />)}
              </Col>
            </Row>

            {/*wider cards*/}
            {/*  <CardLoader component={positions[10]} data={data}/>

            <Divider/>
            <CardLoader component={positions[11]} data={data}/>
            <Divider/>
            <CardLoader component={positions[13]} data={data}/>*/}

          </Col>

          <Col span={5} push={1}>
            {/*influencer sidebar*/}
            {groupedByPos[12] !== undefined ? (
              <CardJSONEditor card={groupedByPos[12].card} position={12} dispatch={this.props.dispatch}>
                <CardLoader card={groupedByPos[12].card}/>
              </CardJSONEditor>) : (<NewCard position={12} {...this.props} />)}
          </Col>

        </Row>

        <Row>
          {/*bottom bar*/}
          {groupedByPos[13] !== undefined ? (
            <CardJSONEditor card={groupedByPos[13].card} position={13} dispatch={this.props.dispatch}>
              <CardLoader card={groupedByPos[13].card}/>
            </CardJSONEditor>) : (<NewCard position={13} {...this.props} />)}
        </Row>

      </Fragment>
    );
  }

}

export default ClassicDashboard;
