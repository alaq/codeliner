// import "../lib/react-ui-tree.less";
import "./dist/react-ui-tree.css"
// import "./theme.less";
import "./theme.css";
import './app.css';
// import cx from 'classnames';
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Tree from './dist/react-ui-tree';
import outline from './tree';
import packageJSON from '../package.json';
import ContentEditable from 'react-simple-contenteditable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      outline: outline
    };
    this.updateTree = this.updateTree.bind(this);
    this.onClickNode = this.onClickNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.renderNode = this.renderNode.bind(this);
  }

  handleKeyPress (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
    } else if (true) {
      // console.log('key pressed!', evt.key)
      // console.log(evt)
    }
  }

  renderNode (node) {
    return (
      <div>
        <div className="bullet"></div>
        <ContentEditable
          html={node.module}
          className="node"
          tagName="span"
          onChange={ this.handleTextChange }
          contentEditable="plaintext-only"
          onClick={this.onClickNode}
          onKeyPress={this.handleKeyPress}
        />
        <ContentEditable
          html={node.note}
          className="note"
          tagName="span"
          /* onChange={ this.handleChange } */
          contentEditable="plaintext-only"
          onClick={this.onClickNode}
        />
      </div>
    );
  }

  handleTextChange (evt, value) {
    const updatedNode = this.state.active;
    updatedNode.module = value;
    this.setState({active: updatedNode})
  }

  onClickNode (node) {
    this.setState({
      active: node
    });
  }

  render() {
    console.log('outline rendered', outline)
    return (
      <div className="app">
        <h1>Home</h1>
        <div className="tree">
          {<Tree
            paddingLeft={20}
            tree={this.state.outline}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
          />}
        </div>
        <div className="inspector">
          <h1>
            {packageJSON.name} {packageJSON.version}
          </h1>
          <button onClick={this.updateTree}>Add line</button>
          <pre>{JSON.stringify(this.state.outline, null, '  ')}</pre>
        </div>
      </div>
    );
  }

  handleChange (outlineChange) {
    console.log(this.state, outlineChange)
    this.setState({
      outline: outlineChange
    })
  }

  updateTree () {
    const outlineUpdate = this.state.outline;
    outlineUpdate.children.push({
      module: 'test',
      note: ''
    });
    this.setState({
      outline: outlineUpdate
    });
  }
}

export default App;
