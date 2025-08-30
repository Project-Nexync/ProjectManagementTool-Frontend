// ProjectColorDot.jsx
// Renders a colored dot for a project, using the color from the project cards grid
export default function ProjectColorDot({ color }) {
  return <span className={`inline-block w-3 h-3 rounded mr-2 align-middle`} style={{ backgroundColor: color }}></span>;
}
