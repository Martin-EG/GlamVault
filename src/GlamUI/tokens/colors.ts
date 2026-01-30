// colors.ts
import { palette } from './colors.palette';

export const colors = {
  brand: {
    primary: palette.pink[500],
    secondary: palette.pink[600],
    primaryAlpha: palette.pink.Alpha25,
  },

  text: {
    primary: palette.gray[900],
    secondary: palette.gray[600],
    muted: palette.gray[400],

    inverse: palette.white,

    danger: palette.red[700],
    success: palette.green[700],
    warning: palette.amber[700],
    info: palette.blue[700],
  },

  border: {
    default: palette.gray[200],
    subtle: palette.gray[100],
    muted: palette.gray[400],

    focus: palette.pink[500],
    danger: palette.red[500],
  },

  background: {
    page: palette.white,
    subtle: palette.gray[100],
    muted: palette.gray[200],

    danger: palette.red[100],
    success: palette.green[100],
    warning: palette.amber[100],
    info: palette.blue[100],
  },

  surface: {
    default: palette.white,
    subtle: palette.gray[300],
    hover: palette.gray[100],
    muted: palette.gray[200],
    elevated: palette.white,
  },

  feedback: {
    errorBg: palette.red[100],
    errorText: palette.red[700],
    successBg: palette.green[100],
    successText: palette.green[700],
    warningBg: palette.amber[100],
    warningText: palette.amber[700],
    infoBg: palette.blue[100],
    infoText: palette.blue[700],
  },
};
