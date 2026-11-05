"use client"

import * as React from "react"
import { ThemeProvider as NextThemeProvider } from "next-themes"

export function ThemeProvider({ children, ...props }: any) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? (
    <NextThemeProvider {...props}>{children}</NextThemeProvider>
  ) : (
    <>{children}</>
  )
}

