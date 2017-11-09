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
      outline: outline,
      headNode: null // not used yet
    };

    // Binding
    this.updateTree = this.updateTree.bind(this);
    this.onClickNode = this.onClickNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.renderNode = this.renderNode.bind(this);
  }

  handleKeyPress (evt, node, index) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      if (node.children.length) {
        node.children.unshift({
          module: 'new node!',
        });
        this.setState({
          outline: node
        });
      }
    } else if (true) {
      console.log('key pressed!', evt.key)
      // console.log(evt)
    }
  }

  renderNode (node, index) {
    return (
      <span>
        <span className="bullet"></span>
        <ContentEditable
          html={node.module}
          className="node"
          tagName="span"
          onChange={(evt, value) => this.handleTextChange(evt, value, node) }
          contentEditable="plaintext-only"
          onClick={this.onClickNode}
          onKeyPress={(evt) => this.handleKeyPress(evt, node)}
        />
        <span style={{color: 'lightgrey'}}> [JavaScript Output: {eval(2+2)}]</span>
        <br/><ContentEditable
          html={node.note}
          className="note"
          tagName="span"
          /* onChange={ this.handleChange } */
          contentEditable="plaintext-only"
          onClick={this.onClickNode}
        />
      </span>
    );
  }

  handleTextChange (evt, value, node) {
    const updatedNode = this.state.active;
    updatedNode.module = value;
    // this.setState({active: updatedNode})
  }

  onClickNode (node) {
    this.setState({
      active: node
    });
  }

  render() {
    return (
      <div className="app">
        <h1>Stackathon: Codeliner</h1>
        <span>in Fullstack Academy > Projects</span>
        <div className="tree">
          {<Tree
            paddingLeft={60}
            tree={this.state.outline}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
          />}
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
