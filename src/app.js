// import "../lib/react-ui-tree.less";
// import "./theme.less";
// import './app.less';
// import cx from 'classnames';
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Tree from 'react-ui-tree';
import outline from './tree';
import packageJSON from '../package.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      outline: outline
    };
  }

  renderNode (node) {
    return (
      <span
        /* className={cx('node', {
          'is-active': node === this.state.active
        })}
        onClick={this.onClickNode.bind(null, node)}
      */
      >
        {node.module}
      </span>
    );
  }

  onClickNode (node) {
    this.setState({
      active: node
    });
  }

  render() {
    return (
      <div className="app">
        <h1>jhskjdfh</h1>
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
          <button onClick={this.updateTree}>update tree</button>
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
