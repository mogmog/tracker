import React, { Fragment } from 'react';

import {
  Row,
  Col
} from 'antd';

import CardLoader from "../../components/CardLoader/CardLoader";

class ClassicDashboard extends React.PureComponent {

  render() {

    console.log(this.props.user.currentUser.layout);

    const positions = this.props.cardpositions.cardpositions, data = [];

    const topColResponsiveProps = {
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

              {/*first row of small cards*/}
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[0]} data={data}/>
              </Col>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[1]} data={data}/>
              </Col>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[2]} data={data}/>
              </Col>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[3]} data={data}/>
              </Col>
            </Row>

            {/*second row of small cards*/}
            <Row gutter={24}>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[6]} data={data}/>
              </Col>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[7]} data={data}/>
              </Col>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[8]} data={data}/>
              </Col>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[9]} data={data}/>
              </Col>
            </Row>

            {/*wider cards*/}
            <CardLoader component={positions[10]} data={data}/>

            <CardLoader component={positions[11]} data={data}/>

          </Col>

          <Col span={5} push={1}>
            {/*right hand side bar */}
            <CardLoader component={positions[12]} data={data}/>
          </Col>


        </Row>

      </Fragment>
    );
  }

}

export default ClassicDashboard;
