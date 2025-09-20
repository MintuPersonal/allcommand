// test-client.js
import { spawn } from "child_process";

const server = spawn("node", ["index.js"], {
  stdio: ["pipe", "pipe", "inherit"],
});

let requestId = 1;

const sendRequest = (method, params) => {
  const request = {
    jsonrpc: "2.0",
    id: requestId++,
    method,
    params,
  };
  server.stdin.write(JSON.stringify(request) + "\n");
};

server.stdout.on("data", (data) => {
  console.log("Response:", data.toString());
});

// Correct MCP request: call the "echo" tool
sendRequest("tools/call", {name: "echo", arguments: { text: "hello world this is my first MCP Server" }});
