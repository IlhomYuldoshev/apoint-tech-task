import React, { useEffect, useState } from "react";

type Props = {
  visibleAlways?: boolean;
};

const SCROLL_TOP_THRESHOLD = 100;
const SCROLL_BOTTOM_THRESHOLD = 100;

export const BottomTopScroller = ({ visibleAlways = true }: Props) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const docHeight = document.documentElement.scrollHeight;

      setShowScrollTop(scrollTop > SCROLL_TOP_THRESHOLD);

      setShowScrollBottom(
        scrollTop + windowHeight < docHeight - SCROLL_BOTTOM_THRESHOLD
      );
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {(showScrollTop || visibleAlways) && (
        <button
          onClick={handleScrollToTop}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mb-2 fixed bottom-14 right-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path d="M12 4l-7 8h4v8h6v-8h4l-7-8z" fill="currentColor" />
          </svg>
        </button>
      )}
      {(showScrollBottom || visibleAlways) && (
        <button
          onClick={handleScrollToBottom}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer fixed bottom-4 right-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path d="M12 20l7-8h-4V4h-6v8H5l7 8z" fill="currentColor" />
          </svg>
        </button>
      )}
    </>
  );
};
