import './dist/react-ui-tree.css';
import './theme.css';
import './app.css';
import React, { Component } from 'react';
import Tree from './dist/react-ui-tree';
import outline from './tree';
import ContentEditable from 'react-simple-contenteditable';
import AceEditor from 'react-ace';
var FontAwesome = require('react-fontawesome');

import 'brace/mode/javascript';
import 'brace/theme/github';

// import packageJSON from '../package.json';
import cx from 'classnames';

function Node(text) {
  this.text = text;
  this.nametwice = function () {
    return this.text + ' ' + this.text;
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
      headNode: outline.text, // not used yet
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
      <span>
        <span className="bullet" onClick={(evt) => this.handleBulletClick(evt, node, index)} />
        {node.children.length ?
        <FontAwesome className="bullet" name='dot-circle-o' /> :
        <FontAwesome className="bullet" name='circle' />
        
      }
        {/* <AceEditor
              mode="javascript"
              theme="github"
              className={cx('node', {
                'is-active': node === this.state.active
              })}
              // onChange={(evt, value) => this.handleTextChange(evt, value, index, tree, node)}
              name={node.uid}
              fontSize={14}
              editorProps={{ $blockScrolling: false }}
              maxLines={1}
              value={node.text}
              onKeyPress={(evt) => this.handleKeyPress(evt, node, index, tree)}
              showGutter={false}
              onClick={this.onClickNode.bind(null, node)}
        /> */}
        {/* <span contentEditable={true}
          className={cx('node', {
          'is-active': node === this.state.active
          })}
          onClick={this.onClickNode.bind(null, node)}
          onChange={(evt, value) => this.handleTextChange(evt, value, index, tree, node)}
          onKeyPress={(evt) => this.handleKeyPress(evt, node, index, tree)}
          onInput={this.handleTextChange}
        >
        {node.text}
        </span> */}

        <div className="output">
          {node.result || node.text}
        </div>

        <ContentEditable
          // html={node.result || node.text}
          html={node.text}
          className={cx('editable' ,'node', {
            'is-active': node === this.state.active
          })}
          tagName="div"
          onChange={(evt, value) => this.handleTextChange(evt, value, index, tree, node)}
          contentEditable="plaintext-only"
          onClick={this.onClickNode.bind(null, node)}
          onKeyPress={(evt) => this.handleKeyPress(evt, node, index, tree)}
        />
        <div className="js">{node.result !== '' ? 'result: ' + node.result : ''}</div>
        <br />
        <ContentEditable
          html={node.note}
          className="note"
          tagName="span"
          /* onChange={ this.handleChange } */
          contentEditable="plaintext-only"
          onClick={this.onClickNode}
        />
      </span>
        <div className="note"></div>
        </span>
    );
  }

  handleTextChange(evt, value, index, tree, node) {
    tree.update(index, value, tree, node, this.jankySetState, this.state.functions);
  }

  onClickNode(node) {
    this.setState({
      active: node
    });
  }

  onHomeClick() {
    this.setState({ outline: outline, showFunctions: false })
  }

  toggleFunctions() {
    this.setState({ showFunctions: !this.state.showFunctions })
  }

  render() {
    console.log('this.state', this.state);
    return (
      <div className="app">
        <div className="nav-icon">
          <FontAwesome className="icons" size="2x" name='home' onClick={this.onHomeClick} />
          <FontAwesome className="icons" size="2x" name='sliders' onClick={this.toggleFunctions} />
          <FontAwesome className="icons" size="2x" name='archive' />
        </div>
        { !this.state.showFunctions ? (
          <div>
            <h1>{this.state.outline.text}</h1>
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
              width={800}
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
      text: 'New node',
      note: 'With a note 🗒️'
    });
    this.setState({
      outline: outlineUpdate
    });
  }
}

export default App;
