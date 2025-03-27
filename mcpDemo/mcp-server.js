import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import fetch from "node-fetch"

const server = new McpServer({
  name: "MCP Server Boilerplate",
  version: "1.0.0",
})

server.tool("add", "Add two numbers", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }],
}))

server.tool("greet", "Give you a greet", {}, async ({}) => ({
  content: [{ type: "text", text: "hello world" }],
}))

server.tool("fetch", "Fetch content from URL", { url: z.string().url() }, async ({ url }) => {
    try {
      const response = await fetch(url)
      const text = await response.text()
      return {
        content: [{ type: "text", text }],
      }
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error fetching URL: ${error.message}` }],
        isError: true
      }
    }
  })

  server.tool(
    "generate-html", 
    "Generate HTML prototype", 
    {
      title: z.string(),
      heading: z.string(),
      content: z.string(),
      backgroundColor: z.string().optional(),
      textColor: z.string().optional()
    }, 
    async ({ title, heading, content, backgroundColor = '#ffffff', textColor = '#000000' }) => {
      const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: ${backgroundColor};
              color: ${textColor};
          }
          .container {
              max-width: 800px;
              margin: 0 auto;
          }
          h1 {
              border-bottom: 2px solid ${textColor};
              padding-bottom: 10px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>${heading}</h1>
          <div class="content">
              ${content}
          </div>
      </div>
  </body>
  </html>`.trim()
  
      return {
        content: [{ type: "text", text: html }],
      }
  })

const transport = new StdioServerTransport()
await server.connect(transport)