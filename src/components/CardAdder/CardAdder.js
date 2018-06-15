import React, {Component} from 'react';
import {Row, Col, Card, Tooltip, Button, Modal} from 'antd';
import {render} from "react-dom";

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import 'bootstrap/dist/css/bootstrap.css'; //be careful with this

import Form from "react-jsonschema-form";
import DirectionCard from "../Cards/DirectionCard/DirectionCard";
const schema = {
  "type": "object",
  "required" : ["title", "direction", "value"],
  "properties": {
    "title": {
      "type": "string"
    },

    "direction": {
      "type": "string",
      "enum": [
        "Up",
        "Down",
      ]
    },

    "value": {
      "type": "number"
    }

  }};



class CardAdder extends Component {

  shouldComponentUpdate() {
    return true;
  }

  constructor(props) {
    super(props);

    this.state = {activeKey : "1"};
  }


  log(type) {
    this.setState({ formData : type.formData, activeKey : "2"});

  }

  render() {

    const { visible } = this.props;
    const { formData, activeKey } = this.state;

    return (<Modal visible={visible} footer={[]}>

      <Tabs activeKey={activeKey} >

        <TabPane tab="Populate data" key="1">
          <Form schema={schema} onSubmit={this.log.bind(this)}/>
        </TabPane>

        <TabPane tab="Preview" key="2">
          <DirectionCard data={this.state.formData}/>
          <Button>Add</Button>
        </TabPane>
      </Tabs>

    </Modal>);
  }
}

export default CardAdder;
