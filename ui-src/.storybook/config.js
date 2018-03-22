import { configure } from '@storybook/react'
const componentStories = require.context('../src/components', true, /story\.js$/)
const listStories = require.context('../src/components/lists', true, /story\.js$/)
function loadStories () {
  componentStories.keys().forEach(componentStories)
  listStories.keys().forEach(listStories)
}

configure(loadStories, module)
