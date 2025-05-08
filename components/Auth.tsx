"use client";
import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "@/amplify_outputs.json";
import { theme } from "@/theme";
import { ThemeStyle } from "@aws-amplify/ui-react/server";
Amplify.configure(config, { ssr: true });

export function Auth({ children }: { children: React.ReactNode }) {
  return (
    <View {...theme.containerProps()} color="font.primary">
      <Authenticator
        services={{
          async validateCustomSignUp(formData) {
            const username = formData["preferred_username"];
            if (username && username.includes(" "))
              return {
                error: "Username cannot contain spaces",
              };
          },
        }}
      >
        {children}
      </Authenticator>
      <ThemeStyle theme={theme} />
    </View>
  );
}
