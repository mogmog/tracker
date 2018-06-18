import React, {Fragment} from 'react';

import {
  Row,
  Col,
  Divider
} from 'antd';

import CardLoader from "../../components/CardLoader/CardLoader";
import shortid from "shortid";
import WorldMapCard from "../../components/Cards/WorldMapCard/WorldMapCard";

class ScrollingNarrartive extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      country: null,
    };
  }

  dosomething(param) {
    this.setState({country : param.name });
    this.forceUpdate();
  }

  render() {

    const positions = this.props.cardpositions.cardpositions, data = [];

    const topColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 6,
      style: {marginBottom: 48},
    };

    return (

      <Fragment>

        <Row>

          <Col span={15}>

            <CardLoader component={positions[2]} data={data} actions={this.dosomething.bind(this)}/>
          </Col>

          <Col span={8} push={1}>

            <Row>
              <Col>
                <WorldMapCard country={this.state.country}/>
                {/* <CardLoader component={positions[4]} data={data} country={this.state.country}/>*/}
              </Col>
            </Row>

            <Row>
              <Col>
                <CardLoader component={positions[3]} data={data} />
              </Col>
            </Row>

            <Divider/>




          </Col>

        </Row>

      </Fragment>
    );
  }

}

export default ScrollingNarrartive;
