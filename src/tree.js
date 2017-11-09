module.exports = {
  module: 'Home',
  isRoot: true,
  children: [
    {
      module: 'Stackathon Dev Journal',
      collapsed: false,
      note: 'A record of progress, or lack of, day by day',
      children: [
        {
          module: 'Wednesday',
          leaf: true,
          children: [
            {
              module: 'Started late afternoon',
              leaf: true
            },

          ]
        },
        {
          module: 'Thursday',
          leaf: true
        },
        {
          module: 'Friday',
          leaf: true
        },
        {
          module: 'Saturday',
          leaf: true
        },
        {
          module: 'Sunday',
          leaf: true
        },
        {
          module: 'Monday: presentation 🎉',
          leaf: true
        },
      ]
    },
    {
      module: 'Project',
      children: [
        {
          module: 'Backlog',
          leaf: true,
          result: ''
        },
        {
          module: 'Maybe/Later',
          leaf: true
        },
        {
          module: 'Done',
          leaf: true
        }
      ]
    },
    {
      module: 'Ideas',
      collapsed: true,
      children: [
        {
          module: 'node.js',
          leaf: true
        },
        {
          module: 'react-ui-tree.js',
          leaf: true
        },
        {
          module: 'react-ui-tree.less',
          leaf: true
        },
        {
          module: 'tree.js',
          leaf: true
        }
      ]
    },
    {
      module: 'Other',
      leaf: true,
      children: [
        {
          module: 'https://github.com/stasm/innerself',
          leaf: true
        },
        {
          module: 'LICENSE',
          leaf: true
        },
        {
          module: 'Makefile',
          leaf: true
        },
        {
          module: 'package.json',
          leaf: true
        },
        {
          module: 'README.md',
          leaf: true
        },
        {
          module: 'webpack.config.js',
          leaf: true
        }
      ]
    },
  ]
};
