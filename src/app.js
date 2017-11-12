import './dist/react-ui-tree.css';
import './theme.css';
import './app.css';
import React, { Component } from 'react';
import Tree from './dist/react-ui-tree';
import outline from './tree';
import ContentEditable from 'react-simple-contenteditable';
import AceEditor from 'react-ace';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import { style } from 'react-syntax-highlighter/dist/styles/vs'
// import { style } from '../public/vs'
var FontAwesome = require('react-fontawesome');

import 'brace/mode/javascript';
import 'brace/theme/github';

// import packageJSON from '../package.json';
// import cx from 'classnames';

function Node(text) {
  this.module = text;
  this.nametwice = function () {
    return this.module + ' ' + this.module;
  };
  this.children = []
}

const functions = `function helloWorld() {
  return 'hello world'
}

function elloWorld() {
  return 1+1
}
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      outline: outline,
      headNode: outline.module, // not used yet
      lastNode: '22',
      input: '',
      functions: functions,
      showFunctions: false,
    };

    // Binding
    this.jankySetState = this.setState.bind(this);
    this.updateTree = this.updateTree.bind(this);
    this.onClickNode = this.onClickNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onHomeClick = this.onHomeClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.renderNode = this.renderNode.bind(this);
    this.handleBulletClick = this.handleBulletClick.bind(this);
    this.handleFunctionsChange = this.handleFunctionsChange.bind(this);
    this.toggleFunctions = this.toggleFunctions.bind(this);
  }

  handleKeyPress(evt, node, index, tree) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      if (node.children.length && node.collapsed === false) {
        const newNode = new Node('');
        node.children.unshift(newNode);
        this.setState({ input: evt.key });
      }
      else {
        const positionInArrOfNewNode = tree.indexes[index.parent].children.indexOf(index.id) + 1;
        tree.indexes[index.parent].node.children.splice(positionInArrOfNewNode, 0, new Node(''))
        this.setState({ input: evt.key });
      }
    }
    // else {
    //   const newState = JSON.parse(JSON.stringify(this.state.outline));
    //   console.log('newState', newState);
    //   this.setState(newState);
    // }
  }

  handleBulletClick(evt, node, index) {
    this.setState({
      outline: node
    });
  }

  renderNode(node, index, tree) {
    const active = +this.state.active === +node.uid;
    return (
      <span>
        <span className="bullet" onClick={(evt) => this.handleBulletClick(evt, node, index)} />
        {/* <AceEditor
              mode="javascript"
              theme="github"
              className={active ? 'node is-active' : 'node'}
              onChange={(evt, value) => this.handleTextChange(evt, value, index, tree, node)}
              name={node.uid}
              fontSize={14}
              editorProps={{ $blockScrolling: false }}
              maxLines={1}
              value={node.module}
              onKeyPress={(evt) => this.handleKeyPress(evt, node, index, tree)}
              showGutter={false}
        /> */}
        <ContentEditable
          html={node.result || node.module}
          // html={node.module + ' ' + node.uid}
          html={node.module}
          className={active ? 'node is-active' : 'node'}
          tagName="span"
          onChange={(evt, value) => this.handleTextChange(evt, value, index, tree, node)}
          contentEditable="plaintext-only"
          onClick={(evt) => this.onClickNode(evt, node, index, tree)}
          onKeyPress={(evt) => this.handleKeyPress(evt, node, index, tree)}
        />
        <div className="js">{node.result !== '' ? 'result: ' + node.result : ''}</div>
        {/* <SyntaxHighlighter className="js" style={style} language="javascript">{node.result !== '' ? 'result: ' + node.result : ''}</SyntaxHighlighter> */}
        <br />
        <ContentEditable
          html={node.note}
          className="note"
          tagName="span"
          /* onChange={ this.handleChange } */
          contentEditable="plaintext-only"
          onClick={this.onClickNode}
        />
        <div className="note output"></div>
      </span>
    );
  }

  handleTextChange(evt, value, index, tree, node) {
    tree.update(index, value, tree, node, this.jankySetState, this.state.functions);
  }

  onClickNode(evt, node, index, tree) {
    console.log('tree', tree);
    tree.indexes[index.id].node.active = true;
    this.setState({
      active: node.uid,
    });
    console.log('active state', this.state.active);
  }

  onHomeClick() {
    this.setState({ outline: outline })
  }

  toggleFunctions() {
    this.setState({ showFunctions: !this.state.showFunctions })
  }

  render() {
    console.log('this.state', this.state);
    return (
      <div className="app">
        <div className="nav-icon">
          {/* <div className="icons" size="2x" onClick={this.onHomeClick}>🏠</div>
          <div className="icons" size="2x" onClick={this.toggleFunctions}>⚙️</div> */}
          <FontAwesome className="icons" size="2x" name='home' onClick={this.onHomeClick} />
          <FontAwesome className="icons" size="2x" name='sliders' onClick={this.toggleFunctions} />
          <FontAwesome className="icons" size="2x" name='rocket' />
        </div>
        { !this.state.showFunctions ? (
          <div>
            <h1>{this.state.outline.module}</h1>
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
        ) : (
          <div>
          <h1>Edit your global functions</h1>
          <span>They will be available in every node of your outline.</span>
          <div className="tree">
            <AceEditor
              mode="javascript"
              theme="github"
              onChange={this.handleFunctionsChange}
              name="functions"
              fontSize={14}
              editorProps={{ $blockScrolling: false }}
              value={this.state.functions}
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
              width={1000}
            />
          </div>
        </div>
        ) }
      </div>
    );
  }

  handleFunctionsChange(value) {
    this.setState({ functions: value })
  }

  handleChange(outlineChange) {
    this.setState({
      outline: outlineChange
    });
  }

  updateTree() {
    const outlineUpdate = this.state.outline;
    outlineUpdate.children.push({
      module: 'New node',
      note: 'With a note 🗒️'
    });
    this.setState({
      outline: outlineUpdate
    });
  }
}

export default App;
