// index.js
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "example-mcp-server",
  version: "1.0.0",
});

server.registerTool(
  "echo",
  {
    title: "Echo Tool",
    description: "Echo back provided text",
    inputSchema: {
      text: z.string().describe("The text to echo"),
    },
  },
  async ({ text }) => {
    const reversed = text.split("").reverse().join("");
    const uppercased = text.toUpperCase();
    return {
      content: [
        { type: "text", text: `You said: ${text}` },
        { type: "text", text: `Original: ${text}` },
        { type: "text", text: `Uppercase: ${uppercased}` },
        { type: "text", text: `Reversed: ${reversed}` },
      ],
    };
  }
);

const transport = new StdioServerTransport();
server.connect(transport);

//console.log("MCP server running via stdio...");
// // index.js
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { z } from "zod";

// // Create MCP server
// const server = new McpServer({
//   name: "example-mcp-server",
//   version: "1.0.0",
// });

// // Register an "echo" tool
// server.registerTool(
//   "echo",
//   {
//     title: "Echo Tool",
//     description: "Echoes back the provided text",
//     inputSchema: {
//       text: z.string().describe("Text to echo back"),
//     },
//   },
//   async ({ text }) => {
//     const reversed = text.split("").reverse().join("");
//     const uppercased = text.toUpperCase();

//     return {
//       content: [
//         { type: "text", text: `Original: ${text}` },
//         { type: "text", text: `Uppercase: ${uppercased}` },
//         { type: "text", text: `Reversed: ${reversed}` },
//       ],
//     };
//   }
// );

// // Start server on stdio
// const transport = new StdioServerTransport();
// server.connect(transport);

// console.log("MCP server running via stdio...");
