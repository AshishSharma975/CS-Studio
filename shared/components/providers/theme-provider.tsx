"use client"

import * as React from "react"
import { ThemeProvider as NextThemeProvider } from "next-themes"

const emptySubscribe = () => () => {};

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemeProvider>) {
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return mounted ? (
    <NextThemeProvider {...props}>{children}</NextThemeProvider>
  ) : (
    <>{children}</>
  );
}


