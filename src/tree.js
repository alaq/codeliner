module.exports = {
  module: 'Home',
  uid: '0',
  children: [
    {
      module: 'Stackathon Dev Journal',
      collapsed: false,
      note: 'A record of progress, or lack of, day by day',
      uid: '1',
      result: 'Stackathon Dev Journal',
      parents: () => 'here will be the parents',
      children: [
        {
          module: 'Wednesday',
          leaf: true,
          uid: '2',
          children: [
            {
              module: 'Started late afternoon',
              leaf: true,
              children: []
            },

          ]
        },
        {
          module: 'Thursday',
          leaf: true,
          uid: '3',
          children: []
        },
        {
          module: 'Friday',
          leaf: true,
          uid: '4',
          children: []
        },
        {
          module: 'Saturday',
          leaf: true,
          uid: '5',
          children: []
        },
        {
          module: 'Sunday',
          leaf: true,
          uid: '6',
          children: []
        },
        {
          module: 'Monday: presentation 🎉',
          leaf: true,
          uid: '7',
          children: []
        },
      ]
    },
    {
      module: 'Project',
      uid: '8',
      children: [
        {
          module: 'Backlog',
          leaf: true,
          uid: '9',
          result: '',
          children: []
        },
        {
          module: 'Maybe/Later',
          uid: '9',
          leaf: true,
          children: []
        },
        {
          module: 'Done',
          leaf: true,
          uid: '10',
          children: []
        }
      ]
    },
    {
      module: 'Ideas',
      collapsed: true,
      uid: '11',
      children: [
        {
          module: 'node.js',
          leaf: true,
          uid: '12',
          children: []
        },
        {
          module: 'react-ui-tree.js',
          leaf: true,
          uid: '13',
          children: []
        },
        {
          module: 'react-ui-tree.less',
          leaf: true,
          uid: '14',
          children: []
        },
        {
          module: 'tree.js',
          leaf: true,
          uid: '15',
          children: []
        }
      ]
    },
    {
      module: 'Other',
      leaf: true,
      uid: '16',
      children: [
        {
          module: 'https://github.com/stasm/innerself',
          leaf: true,
          uid: '17',
          children: []
        },
        {
          module: 'LICENSE',
          leaf: true,
          uid: '18',
          children: []
        },
        {
          module: 'Makefile',
          leaf: true,
          uid: '19',
          children: []
        },
        {
          module: 'package.json',
          leaf: true,
          uid: '20',
          children: []
        },
        {
          module: 'node.children.length',
          leaf: true,
          uid: '21',
          children: []
        },
        {
          module: 'new Date()',
          leaf: true,
          uid: '22',
          result: 'Fri Nov 10 2017 11:39:44 GMT-0500 (EST)',
          note: 'Here is a matching note to go with it.',
          children: []
        }
      ]
    },
  ]
};
