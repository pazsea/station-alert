const myLightThemeColors = {
  background: "#456990",
  onBackground: "#fff",

  surface: "#F2E2DD",
  onSurface: "#000",

  primary: "#6997A5",
  onPrimary: "#fff",

  secondary: "#D1C051",
  onSecondary: "#000",

  error: "#9B2B30",
  onError: "#fff",

  selected: "#006400",
  onSelected: "#fff",

  //VARIANTS

  primaryVariant: "#fff",
  onPrimaryVariant: "#000",

  accent: "#DB3558",
  onAccent: "#fff",

  pending: "#1883D5",
  onPending: "#000",
};

export default {
  themeStatus:"light",
  //GENERAL
  Button: {
    titleStyle: {
      color: myLightThemeColors.onPrimary,
      fontSize: 16,
    },
    buttonStyle: {
      backgroundColor: myLightThemeColors.primary,
      borderRadius: 20,
    },
  },
  Text: {
    style: {
      color: myLightThemeColors.onSurface,
      fontSize: 16,
    },
    h3Style: {
      color: myLightThemeColors.onSurface,
      fontSize: 18,
    },
  },
  Icon: {
    iconStyle: {
      color: myLightThemeColors.onSurface,
    },
  },
  Card: {
    containerStyle: {
      width: "100%",
      borderRadius: 5,
      margin: 0,
      borderColor: "transparent",
      backgroundColor: myLightThemeColors.surface,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    titleStyle: {
      color: myLightThemeColors.onSurface,
      fontSize: 16,
    },
  },
  ListItem: {
    containerStyle: {
      backgroundColor: myLightThemeColors.surface,
    },
    titleStyle: {
      color: myLightThemeColors.onSurface,
    },
  },
  SearchBar: {
    containerStyle: {
      borderRadius: 5,
      padding: 2,
      borderColor: 0,
      borderWidth: 0,
    },
    inputContainerStyle: { backgroundColor: "transparent" },
  },
  Input: {
    inputStyle: {
      color: myLightThemeColors.onSurface,
    },
    leftIconContainerStyle: {
      marginEnd: 10,
      marginStart: 0,
      padding: 0,
    },
  },
  //THE ACTUAL THEME THAT IS CUSTOM AND DARK THEME
  colors: {
    background: myLightThemeColors.background,
    onBackground: myLightThemeColors.onBackground,

    surface: myLightThemeColors.surface,
    onSurface: myLightThemeColors.onSurface,

    primary: myLightThemeColors.primary,
    onPrimary: myLightThemeColors.onPrimary,

    secondary: myLightThemeColors.secondary,
    onSecondary: myLightThemeColors.onSecondary,

    error: myLightThemeColors.error,
    onError: myLightThemeColors.onError,

    selected: myLightThemeColors.selected,
    onSelected: myLightThemeColors.onSelected,

    //VARIANTS

    primaryVariant: myLightThemeColors.primaryVariant,
    onPrimaryVariant: myLightThemeColors.onPrimaryVariant,

    accent: myLightThemeColors.accent,
    onAccent: myLightThemeColors.onAccent,

    pending: myLightThemeColors.pending,
    onPending: myLightThemeColors.onPending,
  },
};
