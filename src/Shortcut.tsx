import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { createSignal } from "solid-js";

function Shortcut({ onMessage }: { onMessage: (s: string) => void }) {
  const [shortcut, setShortcut] = createSignal("Command+Shift+C");

  async function replaceShortcut(newShortcut: string) {
    await unregisterAll();
    await register(newShortcut, onMessage);
    setShortcut(newShortcut);
  }

  return (
    <div>
      Shortcut:
      <input
        type="text"
        value={shortcut()}
        onBlur={(e) => replaceShortcut(e.target.value)}
      />
    </div>
  );
}

export default CheckShortcut;
