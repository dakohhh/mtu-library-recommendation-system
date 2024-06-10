import { NotebookTextIcon } from "lucide-react";

export default function Logo({ size }: { size: number }) {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className="logo-wrapper" style={style}>
      <img className="logo-img" src="/mtu.png" alt="Logo image" />
    </div>
  );
}
