// components/TypeBadge.tsx
import React from "react";
import { pokemonTypeInfo } from "../lib/pokemonTypeInfo";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const lowerType = type.toLowerCase();
  const { icon: Icon, color } = pokemonTypeInfo[lowerType] || pokemonTypeInfo.unknown;

  return (
    <span
      className="flex items-center gap-1 px-2 py-1 rounded text-white text-sm"
      style={{ backgroundColor: color }}
    >
      <Icon />
      {type}
    </span>
  );
};

export default TypeBadge;
