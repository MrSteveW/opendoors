export default function CancelButton({ setShowSidebar }) {
  return <button onClick={() => setShowSidebar(false)}>Cancel</button>;
}
