"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colors = void 0;
// colors.ts
const colors_palette_1 = require("./colors.palette");
exports.colors = {
    brand: {
        primary: colors_palette_1.palette.pink[500],
        secondary: colors_palette_1.palette.pink[600],
        primaryAlpha: colors_palette_1.palette.pink.Alpha25,
    },
    text: {
        primary: colors_palette_1.palette.gray[900],
        secondary: colors_palette_1.palette.gray[600],
        muted: colors_palette_1.palette.gray[400],
        inverse: colors_palette_1.palette.white,
        danger: colors_palette_1.palette.red[700],
        success: colors_palette_1.palette.green[700],
        warning: colors_palette_1.palette.amber[700],
        info: colors_palette_1.palette.blue[700],
    },
    border: {
        default: colors_palette_1.palette.gray[200],
        subtle: colors_palette_1.palette.gray[100],
        muted: colors_palette_1.palette.gray[400],
        focus: colors_palette_1.palette.pink[500],
        danger: colors_palette_1.palette.red[500],
    },
    background: {
        page: colors_palette_1.palette.white,
        subtle: colors_palette_1.palette.gray[100],
        muted: colors_palette_1.palette.gray[200],
        danger: colors_palette_1.palette.red[100],
        success: colors_palette_1.palette.green[100],
        warning: colors_palette_1.palette.amber[100],
        info: colors_palette_1.palette.blue[100],
    },
    surface: {
        default: colors_palette_1.palette.white,
        subtle: colors_palette_1.palette.gray[300],
        hover: colors_palette_1.palette.gray[100],
        muted: colors_palette_1.palette.gray[200],
        elevated: colors_palette_1.palette.white,
    },
    feedback: {
        errorBg: colors_palette_1.palette.red[100],
        errorText: colors_palette_1.palette.red[700],
        successBg: colors_palette_1.palette.green[100],
        successText: colors_palette_1.palette.green[700],
        warningBg: colors_palette_1.palette.amber[100],
        warningText: colors_palette_1.palette.amber[700],
        infoBg: colors_palette_1.palette.blue[100],
        infoText: colors_palette_1.palette.blue[700],
    },
};
