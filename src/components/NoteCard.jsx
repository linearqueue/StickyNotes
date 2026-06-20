import { useEffect, useRef } from "react";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
  const position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);

  const texAreaRef = useRef(null);

  function autoGrow(texAreaRef) {
    const { current } = texAreaRef;
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
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
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
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
