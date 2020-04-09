export const mixinText = (props) => `
  color: ${props.theme.colors.primaryText};
  font-size: ${props.theme.font.primarySize};
`;

export const mixinBackground = (props) => `
  background-color: ${props.theme.colors.primary};
`;

export const mixinSecondaryHeadline = (props) => `
  color: ${
    props.theme.light
      ? props.theme.colors.primaryText
      : props.theme.colors.secondaryText
  };
  font-size: ${props.theme.font.primaryHeadline};
`;
