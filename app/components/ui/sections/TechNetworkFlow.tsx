"use client";
import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Background,
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* Center node size: 100x100, industry node size: 52x52 (label adds ~20 below)
   Layout: center at (200,200), industries in a hex ring ~180px out */
const CX = 200;
const CY = 210;
const R = 170;

const industries = [
  { id: "ai",       label: "AI",       color: "#818cf8", angle: -90  },
  { id: "web3",     label: "Web3",     color: "#38bdf8", angle: -30  },
  { id: "gaming",   label: "Gaming",   color: "#34d399", angle: 30   },
  { id: "fintech",  label: "Fintech",  color: "#22d3ee", angle: 90   },
  { id: "edtech",   label: "EdTech",   color: "#fbbf24", angle: 150  },
  { id: "hardware", label: "Hardware", color: "#a78bfa", angle: -150 },
].map((n) => ({
  ...n,
  x: Math.round(CX + R * Math.cos((n.angle * Math.PI) / 180)) - 26,
  y: Math.round(CY + R * Math.sin((n.angle * Math.PI) / 180)) - 26,
}));

/* ── Custom node: FONIO LABS center hub ── */
function CenterNode(_props: NodeProps) {
  return (
    <div style={{ width: 100, height: 100, position: "relative" }}>
      {/* Single centered handle */}
      <Handle
        type="source"
        position={Position.Top}
        className="!opacity-0 !border-0"
        style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
      />

      <div className="absolute inset-0 animate-pulse" style={{ borderRadius: 16, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)" }} />
      <div className="absolute" style={{ top: 15, left: 15, width: 70, height: 70, borderRadius: 12, background: "rgba(99,102,241,0.25)", border: "1.5px solid rgba(99,102,241,0.6)" }} />
      <div className="absolute flex flex-col items-center justify-center" style={{ top: 25, left: 25, width: 50, height: 50, borderRadius: 10, background: "#6366f1", boxShadow: "0 0 30px rgba(99,102,241,0.5)" }}>
        <span className="font-mono font-bold text-white leading-none" style={{ fontSize: 7 }}>FONIO</span>
        <span className="font-mono font-bold text-white leading-none" style={{ fontSize: 7 }}>LABS</span>
      </div>
    </div>
  );
}

/* ── Custom node: industry cube ── */
function IndustryNode({ data }: NodeProps) {
  const color = data.color as string;
  const label = data.label as string;
  return (
    <div style={{ width: 52, height: 74, position: "relative" }}>
      {/* Single centered handle (on the cube, not the label) */}
      <Handle
        type="target"
        position={Position.Top}
        className="!opacity-0 !border-0"
        style={{ left: "50%", top: 26, transform: "translate(-50%,-50%)" }}
      />

      <div style={{ width: 52, height: 52, borderRadius: 10, background: `${color}18`, border: `1.5px solid ${color}55` }} />
      <div className="absolute" style={{ top: 15, left: 15, width: 22, height: 22, borderRadius: 5, background: color, opacity: 0.85, boxShadow: `0 0 16px ${color}88` }} />
      <span className="absolute font-mono font-semibold" style={{ bottom: 0, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "rgba(255,255,255,0.55)", whiteSpace: "nowrap" }}>
        {label}
      </span>
    </div>
  );
}

const nodeTypes = { center: CenterNode, industry: IndustryNode };

export default function TechNetworkFlow() {
  const initialNodes: Node[] = useMemo(() => [
    { id: "center", type: "center", position: { x: CX - 50, y: CY - 50 }, data: {} },
    ...industries.map((ind) => ({
      id: ind.id,
      type: "industry" as const,
      position: { x: ind.x, y: ind.y },
      data: { label: ind.label, color: ind.color },
    })),
  ], []);

  const initialEdges: Edge[] = useMemo(() =>
    industries.map((ind) => ({
      id: `center-${ind.id}`,
      source: "center",
      target: ind.id,
      type: "straight",
      animated: true,
      style: { stroke: `${ind.color}40`, strokeWidth: 1.5 },
    })),
  []);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const proOptions = useMemo(() => ({ hideAttribution: true }), []);

  // Constrain where nodes can be dragged (within the layout area)
  const nodeExtent: [[number, number], [number, number]] = [[-20, -20], [440, 460]];

  // Lock the viewport so it never pans or shifts
  const translateExtent: [[number, number], [number, number]] = [[-20, -20], [460, 480]];

  // Only allow node position changes (dragging), block everything else
  const handleNodesChange = useCallback(
    (changes: Parameters<typeof onNodesChange>[0]) => {
      const filtered = changes.filter((c) => c.type === "position");
      if (filtered.length > 0) onNodesChange(filtered);
    },
    [onNodesChange]
  );

  return (
    <div className="w-full max-w-[580px] mx-auto" style={{ height: 580 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        fitView
        fitViewOptions={{ padding: 0.08 }}
        nodeExtent={nodeExtent}
        translateExtent={translateExtent}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={false}
        selectNodesOnDrag={false}
        minZoom={1}
        maxZoom={1}
      >
        <Background color="rgba(99,102,241,0.06)" gap={40} size={1} />
      </ReactFlow>
    </div>
  );
}
