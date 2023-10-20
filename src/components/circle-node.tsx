import React, { FunctionComponent, memo } from "react";
import { Handle, Position } from "reactflow";

interface CircleNodeProps {
  data: any;
  isConnectable: boolean;
}

const CircleNode: FunctionComponent<CircleNodeProps> = ({
  data,
  isConnectable,
}) => {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        borderColor: "black",
        borderWidth: "1px",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default CircleNode;
