import './dist/react-ui-tree.css';
import './theme.css';
import './app.css';
// import cx from 'classnames';
import React, { Component } from 'react';
import Tree from './dist/react-ui-tree';
import outline from './tree';
// import packageJSON from '../package.json';
import ContentEditable from 'react-simple-contenteditable';

// console.log(eval(`console.log('runnin'); axios.get('https://api.github.com/repos/vmg/redcarpet/issues?state=closed')
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });`))

// JAIL
// var code = "application.remote.alert('Hello from the plugin!');";
// var code = `const node = 124; application.remote.alert(node * 4);`;
var api = {
  alert: alert
}

var plugin = new jailed.DynamicPlugin(code, api);

// Uncomment to use the sandbox
plugin.whenConnected(
  function() {
      // plugin.remote(code);
  }
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      outline: outline, // outline.children[0] to redirect to a child node
      headNode: outline.module, // not used yet
      lastNode: '22'
    };

    // Binding
    this.updateTree = this.updateTree.bind(this);
    this.onClickNode = this.onClickNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.renderNode = this.renderNode.bind(this);
    this.handleBulletClick = this.handleBulletClick.bind(this);
  }

  handleKeyPress(evt, node, index) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      if (node.children.length) {
        console.log(node)
        node.children.unshift({
          module: 'new node!',
        });
        // this.setState({
        //   outline: node
        // });
      }
    } else {
      const newState = JSON.parse(JSON.stringify(this.state.outline));
      console.log('newState', newState)
      this.setState(newState);
    }
  }

  handleBulletClick(evt, node, index) {
    console.log('push to #', index.id)
    this.setState({
      outline: node
    });
  }

  renderNode(node, index, tree) {
    return (
      <span>
        <span className="bullet" onClick={(evt) => this.handleBulletClick(evt, node, index)} />
        <ContentEditable
          html={node.module}
          className="node"
          tagName="span"
          onChange={(evt, value) => this.handleTextChange(evt, value, index, tree)}
          contentEditable="plaintext-only"
          onClick={this.onClickNode}
          onKeyPress={(evt) => this.handleKeyPress(evt, node, index, tree)}
        />
        <span style={{ color: 'lightgrey' }}> [JavaScript Output: {node.result}]</span>
        <br /><ContentEditable
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

  handleTextChange(evt, value, index, tree) {
    tree.update(index, value)
  }

  onClickNode(evt) {
    this.setState({
      active: event
    });
  }

  render() {
    console.log('this.state', this.state)
    return (
      <div className="app">
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
    );
  }

  handleChange(outlineChange) {
    this.setState({
      outline: outlineChange
    })
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
