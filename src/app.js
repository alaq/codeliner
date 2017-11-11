import './dist/react-ui-tree.css';
import './theme.css';
import './app.css';
// import cx from 'classnames';
import React, { Component } from 'react';
import Tree from './dist/react-ui-tree';
import outline from './tree';
// import packageJSON from '../package.json';
import ContentEditable from 'react-simple-contenteditable';

function Node(text) {
  this.module = text;
  this.nametwice = function () {
    return this.module + ' ' + this.module;
  };
  this.children = []
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      outline: outline, // outline.children[0] to redirect to a child node
      headNode: outline.module, // not used yet
      lastNode: '22',
      input: '',
      functions: [`function helloWorld() { return 'hello world' }`, 'function elloWorld() { return 1+1 }']
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
  }

  handleKeyPress(evt, node, index, tree) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      if (node.children.length && node.collapsed === false) {
        const newNode = new Node('');
        node.children.unshift(newNode);
        this.setState({input: evt.key});
      }
      else {
        const positionInArrOfNewNode = tree.indexes[index.parent].children.indexOf(index.id) + 1;
        tree.indexes[index.parent].node.children.splice(positionInArrOfNewNode, 0, new Node(''))
        this.setState({input: evt.key});

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
        <ContentEditable
          // html={node.result || node.module}
          // html={node.module + ' ' + node.uid}
          html={node.module}
          className={ active ? 'node is-active' : 'node'}
          tagName="span"
          onChange={(evt, value) => this.handleTextChange(evt, value, index, tree, node)}
          contentEditable="plaintext-only"
          onClick={(evt) => this.onClickNode(evt, node)}
          onKeyPress={(evt) => this.handleKeyPress(evt, node, index, tree)}
        />
        <div className="js"> [JavaScript Output: {node.result}]</div>
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

  onClickNode(evt, node) {
    this.setState({
      active: node.uid,
      input: node.uuid
    });
    console.log('active state', this.state.active);
  }

  onHomeClick () {
    this.setState({outline: outline})
  }

  render() {
    console.log('this.state', this.state);
    return (
      <div className="app">
        <h1>{this.state.outline.module}
        <div className="nav-icon">
          <div className="icons" onClick={this.onHomeClick}>🏠</div>
          <div className="icons">⚙️</div>
        </div>
        
        {/* <div className="home">Settings</div> */}
        </h1>
        {/* <div className="home">🏠</div> */}
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
        {/* <div className="inspector">
          <h1>
            Inspector
          </h1>
          <button onClick={this.updateTree}>update tree</button>
          <pre>{JSON.stringify(this.state.tree, null, '  ')}</pre>
        </div> */}
      </div>
    );
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
