import { useState, useRef, useLayoutEffect, useEffect } from "react";
import "./style.less";
import classNames from "classnames";

const handleTransitionEnd = (e: TransitionEvent) => {
  (e.target as HTMLElement).style.transform = ``;
  (e.target as HTMLElement).style.transition = ``;
};

const Flip = () => {
  const ulRef = useRef<HTMLUListElement>(null);
  const targetRef = useRef<HTMLLIElement>(null);
  const positionRef = useRef<{ [key: string]: number }>({});
  const [targetId, setTargetId] = useState<string>("");
  const [list, setList] = useState<
    { id: string; value: string; color: string }[]
  >([
    {
      id: "___1",
      value: "红色",
      color: "#FF0000",
    },
    {
      id: "___2",
      value: "蓝色",
      color: "#0000FF",
    },
    {
      id: "___3",
      value: "绿色",
      color: "#00FF00",
    },
    {
      id: "___4",
      value: "黄色",
      color: "#FFFF00",
    },
    {
      id: "___5",
      value: "紫色",
      color: "#800080",
    },
    {
      id: "___6",
      value: "橙色",
      color: "#FFA500",
    },
  ]);

  const handleDragPrevennt = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent<HTMLUListElement>) => {
    const target = e.target as HTMLLIElement;
    targetRef.current = target as HTMLLIElement;
    // TODO: 拖拽元素的样式
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }
    requestAnimationFrame(() => {
      setTargetId(target.dataset.id as string);
    });
  };

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    setTargetId("");
  };

  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    // target 是拖动进入的那个元素
    if (e.target === ulRef.current || e.target === targetRef.current) {
      return;
    }
    const targetIndex = Array.from(ulRef.current?.children || []).indexOf(
      targetRef.current as HTMLLIElement
    );
    const currentIndex = Array.from(ulRef.current?.children || []).indexOf(
      e.target as HTMLLIElement
    );
    setList((prev) => {
      const newList = [...prev];
      const temp = newList[currentIndex];
      newList[currentIndex] = newList[targetIndex];
      newList[targetIndex] = temp;
      return newList;
    });
  };

  useEffect(() => {
    // 记录每个元素开始的位置
    Array.from(ulRef.current!.children).forEach((item) => {
      const element = item as HTMLElement;
      const id = element.dataset.id as string;
      positionRef.current[id] = element.offsetTop;
    });
  }, [list]);

  useEffect(() => {
    // 记录每个元素开始的位置
    Array.from(ulRef.current!.children).forEach((item) => {
      const element = item as HTMLElement;
      element.addEventListener("transitionend", handleTransitionEnd);
    });
    return () => {
      Array.from(ulRef.current!.children).forEach((item) => {
        const element = item as HTMLElement;
        element.removeEventListener("transitionend", handleTransitionEnd);
      });
    };
  }, []);

  useLayoutEffect(() => {
    Array.from(ulRef.current!.children).forEach((item) => {
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
  }, [list]);

  // 拖拽元素放开后，需要阻止over和enter的默认事件，才能让拖动元素回到原位
  return (
    <div className="flex justify-center">
      <div className="p-0 border border-red-500 ">
        <ul
          ref={ulRef}
          className="flex flex-col gap-2 w-80 m-0"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragPrevennt}
          onDragEnter={handleDragEnter}
          onDrop={handleDragPrevennt}
        >
          {list.map((item) => (
            <li
              data-id={item.id}
              key={item.id}
              draggable
              onDrop={handleDragPrevennt}
              style={{ color: item.color }}
              className={classNames(
                "text-center bg-blue-100 border border-gray-300 leading-10",
                targetId === item.id && ["bg-gray-100!", "text-gray-100!"]
              )}
            >
              {item.value}-{item.id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Flip;
