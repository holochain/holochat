import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { specs, describe, it } from 'storybook-addon-specifications'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import IdeaCard from './idea-card'
import expect from 'expect'

configure({ adapter: new Adapter() })

storiesOf('Idea Card', module)
  .add('Display an idea', () => {
    const idea = {
      title: 'Poll Integration',
      productOwner: 'joatu-jamie',
      avatar: 'j-avatar.png',
      date: 'January 25, 2018 - Lead Time 6 weeks',
      description: 'To make it easier to gauge community support for an idea being able to attach a Poll to an idea would be cool.',
      up: 9,
      down: 0
    }
    specs(() => describe('Idea', function () {
      it('Clicking the Thumbs Up increases the votes shown in the Thumbs Up badge', () => {
        const wrapper = mount(<IdeaCard idea={idea} />)
        wrapper.find('#thumbsUp').simulate('click')
        expect(wrapper.find('#thumbsUpBadge').value).toEqual(1)
      })
      it('Clicking the Thumbs Down increases the votes shown in the Thumbs Down badge', () => {
        const wrapper = mount(<IdeaCard idea={idea} />)
        wrapper.find('#thumbsDown').simulate('click')
        expect(wrapper.find('#thumbsDownBadge').value).toEqual(1)
      })
    }))

    return getIdeaCard(idea)
  })
function getIdeaCard (idea) {
  return (
    <IdeaCard idea={idea} />
  )
}
