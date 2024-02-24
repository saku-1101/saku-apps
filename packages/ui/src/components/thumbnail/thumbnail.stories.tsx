import { Meta, StoryObj } from "@storybook/react";
import { Thumbnail } from "./thumbnail";

const meta = {
  title: "Thumbnail",
  component: Thumbnail,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="w-full max-w-[800px] h-full flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

const TAGS = ["tag1", "tag2"] as const;

const tagWithId = TAGS?.map((tag) => {
  const id = Math.random().toString(32).substring(2);
  return {
    id: id,
    name: tag,
  };
});

const renderTags = tagWithId.map((tag) => (
  <span key={tag.id} className="tag mr-3">
    {tag.name}
  </span>
));

export const Default: Story = {
  args: {
    title: "title",
    date: new Date().toISOString().split("T")[0] ?? "",
    beginColor: "from-[#FEAC5E]",
    middleColor: "via-[#C779D0]",
    endColor: "to-[#4BC0C8]",
    tags: renderTags,
  },
};
