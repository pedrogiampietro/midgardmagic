export function Card({ color, size = "normal" }: any) {
  const sizeClass = size === "normal" ? "w-48 h-72" : "w-32 h-48";
  return <div className={`${sizeClass} m-2 ${color}`}></div>;
}
