import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { IPost } from "../../interfaces/posts.interface";
import OverlayTitle from "./overlay-title";

interface PostOverlayProps {
  post: IPost;
  onClose: () => void;
  onUpvote: () => void;
  onDownvote: () => void;
}

export const PostOverlay = ({
  post,
  onClose,
  onUpvote,
  onDownvote,
}: PostOverlayProps) => {
  const { content } = post;

  // Close on "Esc" key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Close on background click
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClose();
  };

  // Prevent propagation of click events for the inner content
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-gray-300 w-full h-screen flex flex-col items-stretch ml-20 mr-20"
        onClick={handleContentClick}
      >
        <header className="bg-black p-4">
          <button
            className="text-white float-right hover:text-gray-300"
            onClick={onClose}
          >
            Close
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">
          <div className="bg-white m-10 mr-15 ml-15 rounded-md">
            <OverlayTitle
              post={post}
              onUpvote={onUpvote}
              onDownvote={onDownvote}
            />
            <ReactMarkdown
              className="no-tailwind markdown-content pl-10 pr-10 pb-16"
              children={content}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
