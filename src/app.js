import './dist/react-ui-tree.css';
import './theme.css';
import './app.css';
// import cx from 'classnames';
import React, { Component } from 'react';
import Tree from './dist/react-ui-tree';
import outline from './tree';
// import packageJSON from '../package.json';
import ContentEditable from 'react-simple-contenteditable';

// JAIL
// const jailed = require('../jailed/jailed.js');

// var code = "application.remote.alert('Hello from the plugin!');";
// var api = {
//     alert: alert
// }

// var plugin = new jailed.DynamicPlugin(code, api);

// plugin.whenConnected(
//   function() {
//       plugin.remote.run(code);
//   }
// );


// // URL.createObjectURL
// window.URL = window.URL || window.webkitURL;

// // "Server response", used in all examples
// var response = "self.onmessage=function(e){postMessage('Worker: '+e.data);}";

// var blob;
// blob = new Blob([response], {type: 'application/javascript'});
// var worker = new Worker(URL.createObjectURL(blob));

// // Test, used in all examples:
// worker.onmessage = function(e) {
//     console.log('Response: ' + e.data);
// };
// worker.postMessage('1+1');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      outline: outline,
      headNode: outline.node, // not used yet
      lastNode: '22'
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
        console.log(node)
        node.children.unshift({
          module: 'new node!',
        });
        // this.setState({
        //   outline: node
        // });
      }
    } else {
      console.log('to run', node.module.toString());
      // node.result = eval(node.module.toString());
    }
  }

  renderNode (node, index, tree) {
    return (
      <span>
        <span className="bullet" />
        <ContentEditable
          html={node.module}
          className="node"
          tagName="span"
          onChange={(evt, value) => this.handleTextChange(evt, value, index, tree) }
          contentEditable="plaintext-only"
          onClick={this.onClickNode}
          onKeyPress={(evt) => this.handleKeyPress(evt, node, index, tree)}
        />
        <span style={{color: 'lightgrey'}}> [JavaScript Output: { node.result }]</span>
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

  handleTextChange (evt, value, index, tree) {
    // const updatedNode = this.state.active;
    // updatedNode.module = value;
    // this.setState({active: updatedNode})
    tree.update(index, value)
  }

  onClickNode (node) {
    this.setState({
      active: node
    });
  }

  render() {
    console.log('outline', outline)
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
