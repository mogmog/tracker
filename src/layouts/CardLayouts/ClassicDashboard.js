import React, { Fragment } from 'react';
import _ from 'lodash';
import {
  Row,
  Col,
  Divider
} from 'antd';

import CardLoader from "../../components/CardLoader/CardLoader";

import CardJSONEditor from "../../components/CardJSONEditor/CardJSONEditor";

class ClassicDashboard extends React.PureComponent {

  render() {

    const {card, cardpositions } = this.props;

    const positions     = cardpositions.cardpositions;
    const questioncards = card.questioncards;

    const groupedByPos = _.reduce(positions.list , function(obj, position) {
      obj[position.position] = position
      return obj;
    }, {});

    //console.log(groupedByPos);


    const data = {};

    const topColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 12,
      style: { marginBottom: 48 },
    };

    const secondColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 48 },
    };

    return (

      <Fragment>

        <Row>

          <Col span={18}>

            <Row gutter={24}>

              <Col {...topColResponsiveProps}>
                <CardLoader component={groupedByPos[0].card.component} data={groupedByPos[0].card.data}/>
              </Col>
             <Col {...topColResponsiveProps}>
               <CardJSONEditor component={groupedByPos[1].card.component} data={groupedByPos[1].card.data}>
                <CardLoader component={groupedByPos[1].card.component} data={groupedByPos[1].card.data}/>
               </CardJSONEditor>
              </Col>
            </Row>

            {/*second row of small cards*/}
            {/*<Row gutter={24}>
              <Col {...secondColResponsiveProps}>
                <CardLoader component={positions[6]} data={data}/>
              </Col>
              <Col {...secondColResponsiveProps}>
                <CardLoader component={positions[7]} data={data}/>
              </Col>
              <Col {...secondColResponsiveProps}>
                <CardLoader component={positions[8]} data={data}/>
              </Col>
              <Col {...secondColResponsiveProps}>
                <CardLoader component={positions[9]} data={data}/>
              </Col>
            </Row>*/}

            {/*wider cards*/}
          {/*  <CardLoader component={positions[10]} data={data}/>

            <Divider/>
            <CardLoader component={positions[11]} data={data}/>
            <Divider/>
            <CardLoader component={positions[13]} data={data}/>*/}

          </Col>

          <Col span={5} push={1}>
            {/*right hand side bar */}
          {/*  <CardLoader component={positions[12]} data={data}/>*/}
          </Col>


        </Row>

      </Fragment>
    );
  }

}

export default ClassicDashboard;
