use std::process::Command;

#[tauri::command]
pub fn add_to_apple_notes(note: &str) -> String {
    let command = format!(
        "tell application \"Notes\" to tell account \"iCloud\" to make new note at folder \"Notes\" with properties {{name: \"Yank test\", body: \"{}\"}}",
        note
    );
    let output = exec_apple_script(&command);
    match output {
        Ok(value) => println!("{}", value),
        Err(error) => eprintln!("{}", error),
    }
    return format!("Note: {}", note);
}

fn exec_apple_script(command: &str) -> Result<String, String> {
    let output = Command::new("osascript")
        .args(vec!["-e", &command])
        .output()
        .expect("Failed to execute AppleScript");

    if output.status.success() {
        let result = String::from_utf8_lossy(&output.stdout);
        Ok(result.to_string())
    } else {
        let error = String::from_utf8_lossy(&output.stderr);
        Err(format!("Error: {}", error))
    }
}
