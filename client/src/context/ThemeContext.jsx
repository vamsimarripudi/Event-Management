import {
  createContext,
  useEffect,
  useState,
} from "react";

export const ThemeContext =
  createContext();

const getSystemTheme = () => {
  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";
};

export const ThemeProviderWrapper = ({
  children,
}) => {

  const [themeMode, setThemeMode] =
    useState(
      localStorage.getItem("theme") ||
        "system"
    );

  const [activeTheme, setActiveTheme] =
    useState(getSystemTheme());

  // detect actual theme
  useEffect(() => {

    if (themeMode === "system") {
      setActiveTheme(getSystemTheme());
    } else {
      setActiveTheme(themeMode);
    }

  }, [themeMode]);

  // listen to system changes
  useEffect(() => {

    const media =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    const handleChange = () => {
      if (themeMode === "system") {
        setActiveTheme(
          media.matches
            ? "dark"
            : "light"
        );
      }
    };

    media.addEventListener(
      "change",
      handleChange
    );

    return () => {
      media.removeEventListener(
        "change",
        handleChange
      );
    };

  }, [themeMode]);

  const changeTheme = (mode) => {

    localStorage.setItem(
      "theme",
      mode
    );

    setThemeMode(mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        activeTheme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
