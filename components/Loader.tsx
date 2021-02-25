import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const spinnerSize = 64;
const strokeSize = 3;
const animationDuration = 2.4;

// 🚧 don't touch
const spinnerRadius = (spinnerSize - strokeSize) / 2;
const strokeDash = Math.PI * spinnerRadius * 2;
const strokeDashMin = strokeDash * 0.16;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@global": {
      "@keyframes rotation": {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(720deg)",
        },
      },

      "@keyframes draw": {
        "0%": {
          strokeDashoffset: strokeDash,
        },
        "40%": {
          strokeDashoffset: strokeDashMin,
        },
        "100%": {
          strokeDashoffset: strokeDash,
        },
      },
    },
    spinnerContainer: {
      width: "100%",
      height: "100%",
      flex: 1,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      "& .spinner": {
        width: spinnerSize + "px",
        height: spinnerSize + "px",

        animation: `rotation ${animationDuration / 2}s linear infinite`,
      },

      "& .spinner-stroke": {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        stroke: theme.palette.line?.main,
        fill: "none",

        strokeDasharray: strokeDash,
        strokeDashoffset: strokeDash,
        strokeWidth: strokeSize,
        strokeLinecap: "round",

        animation: `draw ${animationDuration}s ease-in-out infinite`,
      },
    },
    loadingContainer: {},
  })
);

export const Loader: React.FC = ({ ...props }) => (
  <div className={useStyles().spinnerContainer} {...props}>
    <svg className="spinner">
      <circle
        className="spinner-stroke"
        r={spinnerRadius}
        cx={spinnerSize * 0.5}
        cy={spinnerSize * 0.5}
      ></circle>
    </svg>
  </div>
);
