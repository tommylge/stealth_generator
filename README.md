# stealth_generator
# Description
This script is designed to generate and serve JavaScript code and fingerprints for browsers. It is capable of running in CLI mode or as an HTTP server. When run in CLI mode, it saves the generated JavaScript code and fingerprints as files. In server mode, it serves the generated JavaScript code and fingerprints as JSON responses to HTTP requests.

## Usage

To install dependencies:

```bash
bun install
```

### CLI Mode
In CLI mode, the script generates injectable_code.js and fingerprint.js files and saves them to a specified output directory.

```bash
bun start --cli --outputDir=<output-directory-path>
```

### Server Mode
In server mode, the script starts an HTTP server that listens for requests and responds with the generated JavaScript code and fingerprints.
```bash
bun start
```

The server will start listening on http://localhost:3000.

## Options
- `cli`: Run the script in CLI mode (default: false).
- `outputDir`: Specify the output directory where the generated files should be saved in CLI mode.

## API Endpoint
When running in server mode, the script exposes an API endpoint that returns the generated JavaScript code and fingerprints as JSON.

- URL: http://localhost:3000
- Method: GET
- Body example:
```json
{
    "browsers": ["chrome"],
    "devices": ["desktop", "mobile"],
    "operatingSystems": ["windows", "macos", "linux", "android", "ios"],
    "httpVersion": "2",
    "mockWebRTC": false
}
```
- Response: JSON object containing `injectable_code` and `fingerprint`.

## Error Handling
The script includes basic error handling, ensuring that the output directory exists before attempting to write files and handling exceptions gracefully.

---
This project was created using `bun init` in bun v1.0.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
