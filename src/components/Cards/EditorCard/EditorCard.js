import React, {Component} from 'react';
import {Button} from 'antd';
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from "megadraft";
import 'megadraft/dist/css/megadraft.css';

import {
  Card
} from 'antd';

class CardSaver extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  save() {
    console.log(this.props.data);
  }

  render() {

    return ( <div> <Button onClick={this.save.bind(this)}>I SAVE THINGS</Button>
      {this.props.children}
    </div>);
  }
}

class EditorCard extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null)};
  }

  onChange = (editorState) => {

    const content = editorStateToJSON(editorState);
    this.setState({editorState, content});

  }

  render() {

    const {data }= this.props;
    const { content }= this.state;
console.log(content);
    return (<Card> <CardSaver data={ content }>
        <MegadraftEditor editorState={this.state.editorState} onChange={this.onChange}/>
    </CardSaver></Card>);
  }
}

EditorCard.defaultProps = {
  data: {}
};

export default EditorCard;
