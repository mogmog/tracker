import React, {Component} from 'react';
import {Row, Col, Card, Tooltip, Button, Modal, Tabs, Icon, Avatar, Table} from 'antd';

const { Meta } = Card;

import {render} from "react-dom";
import CardLoader from "../../components/CardLoader/CardLoader";
const TabPane = Tabs.TabPane;

var CodeMirror = require('react-codemirror');

require('codemirror/lib/codemirror.css');

class CardJSONEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { editvisible : false, checksvisible : false, card : (this.props.card) };
  }

  async componentDidMount() {
    const schema = await import('./../Cards/' + this.props.card.component + '/schema');
    this.setState({ schema  });
  }

  updateCode(newCode) {

    var card = {...this.state.card};

    /*If user is typing, JSON parsing might fail*/
    try {
      card.data = JSON.parse(newCode);
    } catch (e) {
    }
//
    this.setState({card});
  }

  handleOK() {
    const {dispatch} = this.props;

    //persistquestioncard
    dispatch({
      type: 'card/persistquestioncard',
      payload: this.state.card
    });

    dispatch({
      type: 'cardpositions/fetchcardpositions',
      payload: {'userId' : 2, 'type': 'question', 'id': 1}
    });

    this.setState({editvisible : false});

  }

  showEdit() {
    this.setState({"editvisible": !this.state.editvisible});
  }

  showChecks() {
    this.setState({'checksvisible': !this.state.checksvisible});
  }

  render() {

    const { formData, activeKey, editvisible, checksvisible, card, schema } = this.state;

    const options = {lineNumbers: false, mode : 'json' };

    const editmodal = (<Modal bodyStyle={{height : '50vh'}} visible={editvisible} footer={[
      <Button key="submit" type="primary" onClick={this.handleOK.bind(this)}>
        Save
      </Button>,
    ]} width={'90vw'} onCancel={this.showEdit.bind(this)}>

      <Row >
        <Col span={10} >

          <Tabs defaultActiveKey="1">
            <TabPane tab="Data"   key="1">  <CodeMirror value={JSON.stringify(card.data, null, '\t')} onChange={this.updateCode.bind(this)} options={options} /></TabPane>
            <TabPane tab="Schema" key="2">  <CodeMirror value={JSON.stringify(schema, null, '\t')} onChange={this.updateCode.bind(this)} options={options} /></TabPane>
          </Tabs>

        </Col>

        <Col span={12} push={2}>
          <CardLoader card={ card }/>
        </Col>

      </Row>

    </Modal>);


    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Position',
      dataIndex: 'address',
    }];
    const data2 = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'Analyst',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'Analyst',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Intern',
    }];

// rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        checked : record.key > 2,

        name: record.name,
      }),
    };

    const checkmodal = (<Modal bodyStyle={{height : '40vh'}} visible={checksvisible} footer={[
      <Button key="submit" type="primary" onClick={this.handleOK.bind(this)}>
        Save
      </Button>,
    ]} width={'40vw'} onCancel={this.showChecks.bind(this)}>

      <Table rowSelection={rowSelection} columns={columns} dataSource={data2} pagination={false} />

    </Modal>);

    return (<div><Card bodyStyle={{padding : 0, margin : 0}} actions={[<Icon type="edit" onClick={this.showEdit.bind(this)} />, <Icon type="check-square-o" onClick={this.showChecks.bind(this)}/>, <Icon type="ellipsis" />]} >
      {this.props.children}
    </Card> {editmodal} {checkmodal}</div>);
  }
}

export default CardJSONEditor;
