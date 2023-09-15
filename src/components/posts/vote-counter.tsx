import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { ArrowDownward } from "@mui/icons-material";

export interface VoteCounterProperties {
  counter: number;
  onUpvote: () => void;
  onDownvote: () => void;
  orientation: "horizontal" | "vertical";
}

export const VoteCounter = ({
  counter,
  onUpvote,
  onDownvote,
  orientation,
}: VoteCounterProperties) => {
  const orientationClass =
    orientation === "horizontal"
      ? "flex-row items-center"
      : "flex-col items-center justify-center";

  return (
    <div className={`flex pr-3 pl-3 ${orientationClass}`}>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onUpvote();
        }}
        aria-label="Upvote"
      >
        <ArrowUpwardIcon />
      </IconButton>
      <span className="text-xs font-semibold w-5 flex items-center justify-center">
        {counter}
      </span>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onDownvote();
        }}
        aria-label="Downvote"
      >
        <ArrowDownward />
      </IconButton>
    </div>
  );
};
