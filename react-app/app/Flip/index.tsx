import { useState, useRef } from "react";

const Flip = () => {
  const ulRef = useRef<HTMLUListElement>(null);
  const targetRef = useRef<HTMLLIElement>(null);
  const [list, setList] = useState<
    { id: number; value: string; color: string }[]
  >([
    {
      id: 1,
      value: "红色",
      color: "#FF0000",
    },
    {
      id: 2,
      value: "蓝色",
      color: "#0000FF",
    },
    {
      id: 3,
      value: "绿色",
      color: "#00FF00",
    },
    {
      id: 4,
      value: "黄色",
      color: "#FFFF00",
    },
    {
      id: 5,
      value: "紫色",
      color: "#800080",
    },
    {
      id: 6,
      value: "橙色",
      color: "#FFA500",
    },
  ]);

  const handleDragPrevennt = (e: React.DragEvent<HTMLElement>) => {
    // e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    targetRef.current = e.target as HTMLLIElement;
    (e.target as HTMLElement).dataTransfer.effectAllowed = "move";
    requestAnimationFrame(() => {
      (e.target as HTMLElement).classList.add("bg-gray-100!", "text-gray-100!");
    });
  };

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    (e.target as HTMLElement).classList.remove("bg-gray-100", "text-gray-100!");
  };

  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
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
    if (targetIndex > currentIndex) {
      console.log("向上移动");
    } else {
      console.log("向下移动");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-0 border border-red-500 ">
        <ul
          ref={ulRef}
          className="flex flex-col gap-2 w-40 m-0"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragPrevennt}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragPrevennt}
          onDrop={handleDragPrevennt}
        >
          {list.map((item, index) => (
            <li
              key={item.id}
              draggable
              style={{ color: item.color }}
              className={`text-center bg-blue-100 border border-gray-300 leading-10`}
            >
              {item.value}-{index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Flip;
