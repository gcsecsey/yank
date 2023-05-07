mod connectors {
    pub mod apple_notes;
}

use connectors::apple_notes::add_to_apple_notes;

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![add_to_apple_notes])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
