module.exports = {
  text: 'Home',
  uid: '0',
  children: [
    {
      text: 'Stackathon Dev Journal',
      collapsed: false,
      note: 'A record of progress, or lack of, day by day',
      uid: '1',
      result: 'Stackathon Dev Journal',
      parents: () => 'here will be the parents',
      children: [
        {
          text: 'Wednesday',
          leaf: true,
          uid: '2',
          children: [
            {
              text: 'Started late afternoon',
              leaf: true,
              children: []
            },

          ]
        },
        {
          text: 'Thursday',
          leaf: true,
          uid: '3',
          children: []
        },
        {
          text: 'Friday',
          leaf: true,
          uid: '4',
          children: []
        },
        {
          text: 'Saturday',
          leaf: true,
          uid: '5',
          children: []
        },
        {
          text: 'Sunday',
          leaf: true,
          uid: '6',
          children: []
        },
        {
          text: 'Monday: presentation 🎉',
          leaf: true,
          uid: '7',
          children: []
        },
      ]
    },
    {
      text: 'Project',
      uid: '8',
      children: [
        {
          text: 'Backlog',
          leaf: true,
          uid: '9',
          result: '',
          children: []
        },
        {
          text: 'Maybe/Later',
          uid: '9',
          leaf: true,
          children: []
        },
        {
          text: 'Done',
          leaf: true,
          uid: '10',
          children: []
        }
      ]
    },
    {
      text: 'Ideas',
      collapsed: true,
      uid: '11',
      children: [
        {
          text: 'node.js',
          leaf: true,
          uid: '12',
          children: []
        },
        {
          text: 'react-ui-tree.js',
          leaf: true,
          uid: '13',
          children: []
        },
        {
          text: 'react-ui-tree.less',
          leaf: true,
          uid: '14',
          children: []
        },
        {
          text: 'tree.js',
          leaf: true,
          uid: '15',
          children: []
        }
      ]
    },
    {
      text: 'Other',
      leaf: true,
      uid: '16',
      children: [
        {
          text: 'https://github.com/stasm/innerself',
          leaf: true,
          uid: '17',
          children: []
        },
        {
          text: 'LICENSE',
          leaf: true,
          uid: '18',
          children: []
        },
        {
          text: 'Makefile',
          leaf: true,
          uid: '19',
          children: []
        },
        {
          text: 'package.json',
          leaf: true,
          uid: '20',
          children: []
        },
        {
          text: 'node.children.length',
          leaf: true,
          uid: '21',
          children: []
        },
        {
          text: 'new Date()',
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
