import { useEffect, useRef, useState } from "react";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const texAreaRef = useRef(null);
  const cardRef = useRef(null);
  const mouseStartPos = useRef({ x: 0, y: 0 });

  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);

  function autoGrow(texAreaRef) {
    const { current } = texAreaRef;

    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
  }

  function mouseMove(e) {
    let mouseMoveDir = {
      x: mouseStartPos.current.x - e.clientX,
      y: mouseStartPos.current.y - e.clientY,
    };

    mouseStartPos.current.x = e.clientX;
    mouseStartPos.current.y = e.clientY;

    setPosition({
      x: cardRef.current.offsetLeft - mouseMoveDir.x,
      y: cardRef.current.offsetTop - mouseMoveDir.y,
    });
  }

  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }

  function mouseDown(e) {
    mouseStartPos.current.x = e.clientX;
    mouseStartPos.current.y = e.clientY;

    console.log(mouseStartPos.current);

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  useEffect(() => {
    autoGrow(texAreaRef);
  }, []);

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      ref={cardRef}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        <Trash />
      </div>

      <div className="card-body">
        <textarea
          style={{ color: colors.colorText }}
          defaultValue={body}
          ref={texAreaRef}
          onInput={() => {
            autoGrow(texAreaRef);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
