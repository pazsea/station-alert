const myDarkThemeColors = {
  background: "#303030",
  onBackground: "#fff",

  surface: "#424242",
  onSurface: "#fff",

  primary: "#3e50b4",
  onPrimary: "#fff",

  secondary: "#bb86fc",
  onSecondary: "#000",

  error: "#cf6679",
  onError: "#fff",

  selected: "#006400",
  onSelected: "#fff",

  //VARIANTS

  primaryVariant: "#fff",
  onPrimaryVariant: "#000",

  accent: "#ff3f80",
  onAccent: "#000",

  pending: "#1883D5",
  onPending: "#000",
};

export default {
  themeStatus: "dark",
  //GENERAL
  Button: {
    titleStyle: {
      color: myDarkThemeColors.onPrimary,
      fontSize: 16,
    },
    buttonStyle: {
      backgroundColor: myDarkThemeColors.primary,
      borderRadius: 20,
    },
  },
  Text: {
    style: {
      color: myDarkThemeColors.onSurface,
      fontSize: 16,
    },
    h3Style: {
      color: myDarkThemeColors.onSurface,
      fontSize: 18,
    },
  },
  Icon: {
    iconStyle: {
      color: myDarkThemeColors.onSurface,
    },
  },
  Card: {
    containerStyle: {
      width: "100%",
      borderRadius: 5,
      margin: 0,
      borderColor: "transparent",
      backgroundColor: myDarkThemeColors.surface,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    titleStyle: {
      color: myDarkThemeColors.onSurface,
      fontSize: 16,
    },
  },
  ListItem: {
    containerStyle: {
      backgroundColor: myDarkThemeColors.surface,
    },
    titleStyle: {
      color: myDarkThemeColors.onSurface,
    },
  },
  SearchBar: {
    containerStyle: {
      borderRadius: 5,
      padding: 0,
      borderColor: 0,
      borderWidth: 0,
    },
    inputContainerStyle: { backgroundColor: "transparent" },
  },
  Input: {
    inputStyle: {
      color: myDarkThemeColors.onSurface,
    },
    leftIconContainerStyle: {
      marginEnd: 10,
      marginStart: 0,
      padding: 0,
    },
  },
  //THE ACTUAL THEME THAT IS CUSTOM AND DARK THEME
  colors: {
    background: myDarkThemeColors.background,
    onBackground: myDarkThemeColors.onBackground,

    surface: myDarkThemeColors.surface,
    onSurface: myDarkThemeColors.onSurface,

    primary: myDarkThemeColors.primary,
    onPrimary: myDarkThemeColors.onPrimary,

    secondary: myDarkThemeColors.secondary,
    onSecondary: myDarkThemeColors.onSecondary,

    error: myDarkThemeColors.error,
    onError: myDarkThemeColors.onError,

    selected: myDarkThemeColors.selected,
    onSelected: myDarkThemeColors.onSelected,

    //VARIANTS

    primaryVariant: myDarkThemeColors.primaryVariant,
    onPrimaryVariant: myDarkThemeColors.onPrimaryVariant,

    accent: myDarkThemeColors.accent,
    onAccent: myDarkThemeColors.onAccent,

    pending: myDarkThemeColors.pending,
    onPending: myDarkThemeColors.onPending,
  },
};
