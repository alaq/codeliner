// import "../lib/react-ui-tree.less";
import "react-ui-tree/dist/react-ui-tree.css"
// import "./theme.less";
import "./theme.css";
import './app.css';
// import cx from 'classnames';
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Tree from 'react-ui-tree';
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
  }

  renderNode (node) {
    return (
      <div>
        {/* <div className="bullet"></div> */}
        <ContentEditable
          html={node.module}
          className="node"
          tagName="span"
          /* onChange={ this.handleChange } */
          contentEditable="plaintext-only"
          onClick={this.onClickNode}
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
    this.setState({
      outline: outlineChange
    })
  }

  updateTree () {
    const outlineUpdate = this.state.outline;
    outlineUpdate.children.push({ module: 'test' });
    this.setState({
      outline: outlineUpdate
    });
  }
}

export default App;
