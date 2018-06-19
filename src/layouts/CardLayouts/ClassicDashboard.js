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

    console.log(positions.list);

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
                <CardLoader card={groupedByPos[0].card} />
              </Col>
             <Col {...topColResponsiveProps}>
               <CardJSONEditor card={groupedByPos[1].card} dispatch={this.props.dispatch}>
                <CardLoader card={groupedByPos[1].card} />
               </CardJSONEditor>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col {...secondColResponsiveProps}>
                <CardJSONEditor card={groupedByPos[2].card} dispatch={this.props.dispatch}>
                  <CardLoader card={groupedByPos[2].card} />
                </CardJSONEditor>
              </Col>
              <Col {...secondColResponsiveProps}>
                <CardJSONEditor card={groupedByPos[3].card} dispatch={this.props.dispatch}>
                  <CardLoader card={groupedByPos[3].card} />
                </CardJSONEditor>
              </Col>
              <Col {...secondColResponsiveProps}>
                <CardJSONEditor card={groupedByPos[4].card} dispatch={this.props.dispatch}>
                  <CardLoader card={groupedByPos[4].card} />
                </CardJSONEditor>
              </Col>
              <Col {...secondColResponsiveProps}>
                <CardJSONEditor card={groupedByPos[5].card} dispatch={this.props.dispatch}>
                  <CardLoader card={groupedByPos[5].card} />
                </CardJSONEditor>
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
            {/*right hand side bar */}
          {/*  <CardLoader component={positions[12]} data={data}/>*/}
          </Col>


        </Row>

      </Fragment>
    );
  }

}

export default ClassicDashboard;
