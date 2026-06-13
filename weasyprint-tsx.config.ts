import { Config } from "./packages/build/src/config";

export default {
  io: {
    output: "ReadMe.pdf",
  },

  // io: {
  //   output: "TestUI.pdf",
  //   input: "testUI/index.tsx",
  // },
  // dev: {
  //   watch: ["packages/ui/", "testUI"],
  // },
} satisfies Config;
