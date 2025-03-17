import { useEffect, useLayoutEffect, useRef } from "react";

const handleTransitionEnd = (e: TransitionEvent) => {
  (e.target as HTMLElement).style.transform = ``;
  (e.target as HTMLElement).style.transition = ``;
};

const useFlip = (
  domContainerRef: React.RefObject<HTMLElement>,
  effectDataList?: unknown[]
) => {
  const positionRef = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    if (domContainerRef.current && domContainerRef.current.children.length) {
      Array.from(domContainerRef.current.children).forEach((item) => {
        const element = item as HTMLElement;
        element.addEventListener("transitionend", handleTransitionEnd);
      });
    }
    return () => {
      Array.from(domContainerRef.current!.children).forEach((item) => {
        const element = item as HTMLElement;
        element.removeEventListener("transitionend", handleTransitionEnd);
      });
    };
  }, [domContainerRef]);

  useEffect(
    () => {
      // 记录每个元素开始的位置
      Array.from(domContainerRef.current!.children).forEach((item) => {
        const element = item as HTMLElement;
        const id = element.dataset.id as string;
        positionRef.current[id] = element.offsetTop;
      });
    },
    effectDataList ? [...effectDataList, domContainerRef] : undefined
  );

  useLayoutEffect(
    () => {
      Array.from(domContainerRef.current!.children).forEach((item) => {
        const element = item as HTMLElement;
        const id = element.dataset.id as string;
        const endTop = element.offsetTop;
        const startTop = positionRef.current[id];
        if (startTop === undefined || startTop === endTop) return;
        const distance = startTop - endTop;
        element.style.transform = `translateY(${distance}px)`;
        requestAnimationFrame(() => {
          element.style.transition = "transform 0.3s ease-in-out";
          element.style.transform = `translateY(0)`;
        });
      });
    },
    effectDataList ? [...effectDataList, domContainerRef] : undefined
  );
};

export default useFlip;
