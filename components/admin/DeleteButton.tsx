"use client";
import { X } from "lucide-react";

interface DeleteProps {
  handleDelete: (id: number) => void | Promise<void>;
  id: number;
}

export default function DeleteButton({ id, handleDelete }: DeleteProps) {
  return (
    <button
      onClick={() => {
        handleDelete(id);
      }}
    >
      <X color="red" size={30} strokeWidth={3} />
    </button>
  );
}
