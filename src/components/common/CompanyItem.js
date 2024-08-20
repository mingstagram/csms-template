import React from "react";
import { useDrag, useDrop } from "react-dnd";
import "../../styles/projectStyle.css";

const CompanyItem = ({ company, index, moveCompany }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "COMPANY",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCompany(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "COMPANY",
    item: { type: "COMPANY", id: company.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="Setting_Box1"
      style={{
        justifyContent: "space-between",
        display: "flex",
        opacity: isDragging ? 0.5 : 1,
        padding: "16px",
        margin: "4px",
        backgroundColor: "white",
        cursor: "move",
        height: "50px",
        fontSize: "12px",
      }}
    >
      <span>{company.name}</span>
      <span>{index + 1}</span>
    </div>
  );
};

export default CompanyItem;
