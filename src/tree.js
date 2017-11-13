module.exports = {
  text: 'Home',
  uid: '0',
  children: [
    {
      text: 'js-flow\'s commit journal',
      collapsed: false,
      note: 'A record of progress, or lack of, day by day',
      uid: '1',
      parents: () => 'here will be the parents',
      children: [
        {
          text: 'Wednesday',
          leaf: true,
          uid: '2',
          children: [
            {
              text: 'initial commit',
              leaf: true,
              children: []
            },
            {
              text: 'feat(UI): basic styling',
              leaf: true,
              children: []
            }
          ]
        },
        {
          text: 'Thursday',
          leaf: true,
          uid: '3',
          children: [
            {
              text: 'feat(code): states update + Javascript evaluated',
              leaf: true,
              children: []
            },
            {
              text: 'feat(navigation): header icons',
              leaf: true,
              children: []
            }
          ]
        },
        {
          text: 'Friday',
          leaf: true,
          uid: '4',
          children: [
            {
              text: 'feat(ace): adding editor for the functions',
              leaf: true,
              children: []
            },
            {
              text: 'feat(eval): add string/code interpolation',
              leaf: true,
              children: []
            },
            {
              text: 'fix(eval): fix interpolation + added evals',
              leaf: true,
              children: []
            }
          ]
        },
        {
          text: 'Saturday',
          leaf: true,
          uid: '5',
          children: [
            {
              text: 'feat(ui tree): bringing in react-ui-tree',
              leaf: true,
              children: []
            },
            {
              text: 'feat(styling): styling closer to end product',
              leaf: true,
              children: []
            },
            {
              text: 'fix(state): states update upon keypress',
              leaf: true,
              children: []
            },
            {
              text: 'feat(title): dynamic title',
              leaf: true,
              children: []
            }
          ]
        },
        {
          text: 'Sunday',
          leaf: true,
          uid: '6',
          children: [
            {
              text: 'fix(layout): css tweaks',
              leaf: true,
              children: []
            },
            {
              text: 'fix(deploy): changing default port',
              leaf: true,
              children: []
            }
          ]
        },
        {
          text: 'Monday: presentation',
          leaf: true,
          uid: '7',
          children: []
        },
      ]
    },
    {
      text: 'Project',
      uid: '8',
      note: 'Kanban style, in a list.',
      children: [
        {
          text: 'Backlog',
          leaf: true,
          uid: '9',
          result: '',
          children: [
            {
              text: 'Make a presentation',
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
          text: 'Maybe/Later',
          uid: '9',
          leaf: true,
          collapsed: true,
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
          text: 'Done',
          leaf: true,
          uid: '10',
          collapsed: true,
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
