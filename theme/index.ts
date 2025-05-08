import { createTheme } from "@aws-amplify/ui-react";
import { colors } from "./colors";

export const theme = createTheme({
  name: "story-theme",
  primaryColor: "indigo",
  tokens: {
    colors: { ...colors },
  },
});
