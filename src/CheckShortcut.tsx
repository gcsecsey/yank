import {
  isRegistered,
  register,
  unregister,
  unregisterAll,
} from "@tauri-apps/api/globalShortcut";
import { createResource, createSignal } from "solid-js";

function CheckShortcut() {
  const shortcut = "Command+Shift+C";

  const [registered, { refetch: refetchRegistered }] = createResource(async () => await isRegistered(shortcut));

  async function registerShortcut() {
    console.log("registering...");
    return await register(shortcut, (s) => {
      console.log(`Shortcut ${s} triggered`);
    });
  }

  return (
    <div>
      <h1>Shortcut check</h1>
      <div>
        Shortcut {shortcut} is{" "}
        {registered() ? "registered" : "not registered"}
      </div>
      <button type="button" onClick={refetchRegistered}>
        Check
      </button>
      <button
        type="button"
        onClick={async () => {
          console.log("clicked register");
          await registerShortcut();
        }}
      >
        Register
      </button>
      <button type="button" onClick={() => unregister(shortcut)}>
        Unregister
      </button>
      <button type="button" onClick={() => unregisterAll()}>
        Unregister All
      </button>
    </div>
  );
}

export default CheckShortcut;
