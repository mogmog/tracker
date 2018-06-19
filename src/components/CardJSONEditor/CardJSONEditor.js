import React, {Component} from 'react';
import {Row, Col, Card, Tooltip, Button, Modal, Tabs, Icon, Avatar} from 'antd';

const { Meta } = Card;

import {render} from "react-dom";
import CardLoader from "../../components/CardLoader/CardLoader";
const TabPane = Tabs.TabPane;

var CodeMirror = require('react-codemirror');

require('codemirror/lib/codemirror.css');


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

class CardJSONEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { visible : false, data : (this.props.data), datajson : this.props.data };
  }

  updateCode(newCode) {

    this.setState({
      data: newCode,
      datajson : JSON.parse(newCode)
    });

  }

  showEdit() {
    this.setState({'visible': !this.state.visible});
  }

  render() {

    const { formData, activeKey, visible, data } = this.state;

    const options = {lineNumbers: true, mode : 'json' };

    const modal = (<Modal bodyStyle={{height : '50vh'}} visible={visible} footer={[]} width={'90vw'} onCancel={this.showEdit.bind(this)}>

      <Row >

        <Col span={10} >

          <Tabs defaultActiveKey="1">
            <TabPane tab="Data"   key="1">  <CodeMirror value={JSON.stringify(data, null, '\t')} onChange={this.updateCode.bind(this)} options={options} /></TabPane>
            <TabPane tab="Schema" key="2">  <CodeMirror value={JSON.stringify(schema)} onChange={this.updateCode.bind(this)} options={options} /></TabPane>
          </Tabs>

        </Col>

        <Col span={12} push={2}>
          {/**/}
          <CardLoader component={this.props.component} data={(this.state.datajson)}/>
        </Col>

      </Row>

    </Modal>);

    const buttonwrapper = (<div><Card bodyStyle={{padding : 0, margin : 0}}
      actions={[<Icon type="setting" onClick={this.showEdit.bind(this)} />, <Icon type="edit" />, <Icon type="ellipsis" />]}
    >
      {this.props.children}

    </Card> {modal} </div>);

    return (buttonwrapper);
  }
}

export default CardJSONEditor;
