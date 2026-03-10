import { Meta, StoryObj } from '@storybook/angular';
import { TagComponent } from '../app/components/tag/tag.component';

const meta: Meta<TagComponent> = {
  title: 'Components/Tag',
  component: TagComponent,
  tags: ['autodocs'],
  decorators: [
    (story) => {
      const style = document.createElement('style');
      style.innerHTML = `
        .tag {
          display: inline-block;
          padding: 0.3rem 0.6rem;
          background-color: #2f648f;
          color: white;
          font-size: 0.75rem;
          border-radius: 12px;
          margin: 0.2rem;
          white-space: nowrap;
        }
        .tag:hover {
          filter: brightness(50%);
        }
      `;
      document.head.appendChild(style);
      return story();
    },
  ],
  //args:
};

export default meta;

type Story = StoryObj<TagComponent>;
// Story 1: Tag is visible (passes a string)
export const WithTagName: Story = {
  args: {
    tagName: 'Action', // A sample string; the span will show
  },
};

// Story 2: Tag is hidden (null)
export const NoTagNameNull: Story = {
  args: {
    tagName: null, // Span will not show
  },
};

// Story 3: Tag is hidden (undefined)
export const NoTagNameUndefined: Story = {
  args: {
    tagName: undefined, // Span will not show
  },
};
