import type { StoryObj } from "@storybook/react";
import IVSPlayer from "./IVSPlayer";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/IvsPlayer",
  component: IVSPlayer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const IVSPlayerComp: Story = {};
