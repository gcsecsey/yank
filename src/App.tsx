import { createSignal, createResource } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { readText, writeText } from "@tauri-apps/api/clipboard";
import Shortcut from "./Shortcut";

import "./App.css";

function App() {
  const [clipBoardText, { refetch: refetchClipBoard }] = createResource(
    async () => await readText()
  );

  async function sendToAppleNotes(note: string) {
    await invoke("send_to_apple_notes", { note });
  }

  return (
    <div class="container">
      <h1>Welcome to Tauri!</h1>

      <div class="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={logo} class="logo solid" alt="Solid logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and Solid logos to learn more.</p>

      <div class="row">
        <div>
          Clipboard content (blur to refresh):
          <input
            id="greet-input"
            placeholder="Clipboard content..."
            value={clipBoardText() as string}
            onBlur={() => refetchClipBoard()}
          />
          <button onClick={() => sendToAppleNotes(clipBoardText() as string)}>
            Send to Apple Notes
          </button>
          <Shortcut
            onMessage={(s: string) => console.log(`${s} is triggered`)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
