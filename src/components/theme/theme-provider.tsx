import { ThemeProvider as BaseThemeProvider } from "next-themes"

type ThemePovider = {
    children: React.ReactNode
}
const ThemeProvider = ({children} :ThemePovider ) => {
    return <BaseThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</BaseThemeProvider>
}

export {ThemeProvider}