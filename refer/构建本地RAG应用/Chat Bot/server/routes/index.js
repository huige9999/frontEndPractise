const express = require("express");
const router = express.Router();
const fs = require("fs"); // node 中提供的和文件处理相关的模块
const pdfParse = require("pdf-parse");

// 用一个 json 来存储文档的向量
const EMBEDDING_PATH = "./embeddings.json";

/**
 * 该方法用于将一段文本转为向量
 * @param {*} text
 */
async function getEmbedding(text) {
  const res = await fetch("http://localhost:11434/api/embeddings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "nomic-embed-text",
      prompt: text,
    }),
  });
  const result = await res.json();
  return result.embedding;
}

/**
 * 该方法用于生成外部知识库对应的向量
 */
async function generateEmbeddings() {
  const buffer = fs.readFileSync("./bananaphone.pdf");
  const data = await pdfParse(buffer);
  // 切分
  const chunks = data.text
    .split(/\n\s*\n/)
    .map((text, index) => ({
      id: `chunk-${index}`,
      content: text.trim(),
    }))
    .filter((p) => p.content.length > 10);
  // 将其转换为一个高维度的向量
  const withEmbeddings = []; // 该数组用于存储所有文本转换后的向量
  for (const c of chunks) {
    const embedding = await getEmbedding(c.content); // 拿到当前这段文本转换出来的向量
    withEmbeddings.push({
      ...c,
      embedding,
    });
  }
  console.log(withEmbeddings, "withEmbeddings");

  // 转换完成之后，将结果写入到一个文件里面
  fs.writeFileSync(
    EMBEDDING_PATH,
    JSON.stringify(withEmbeddings, null, 2),
    "utf-8"
  );

  return withEmbeddings;
}

/**
 * 加载当前的向量数据库里面的数据
 * 如果是第一次，那么没有向量数据，生成向量数据
 */
async function loadCachedEmbeddings() {
  if (fs.existsSync(EMBEDDING_PATH)) {
    // 说明之前已经生成过了，直接读取已有的 json 文件返回即可
    const raw = fs.readFileSync(EMBEDDING_PATH, "utf-8");
    return JSON.parse(raw);
  }
  // 如果代码来到这里，说明是第一次，需要生成
  return await generateEmbeddings();
}

/**
 * 接收两个向量值，通过余弦相似度来查看两个向量相似度有多高
 * @param {*} vecA
 * @param {*} vecB
 * @returns
 */
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}

/**
 *
 * @param {*} query 用户的问题，还没有做嵌入处理（原始的文本）
 * @param {*} embeddedDocs 向量数据库里面的所有向量（外挂知识的向量）
 * @param {*} topK 前XXX条信息
 */
async function searchByEmbedding(query, embeddedDocs, topK = 3) {
  // 将用户的问题也转换为向量
  const queryEmbedding = await getEmbedding(query);
  // 拿到向量数据库中每一个向量和用户问题向量的一个打分
  const scored = embeddedDocs.map((chunk) => {
    const score = cosineSimilarity(queryEmbedding, chunk.embedding);
    return { ...chunk, score };
  });
  // 先根据分数排序，返回前 topK 个相关的向量
  return scored.sort((a, b) => b.score - a.score).slice(0, topK);
}

router.post("/ask", async function (req, res) {
  // 获取用户输入的问题
  const question = req.body.question || "";

  // 需要加载向量数据库里面的内容
  // 拿到外挂知识的所有向量（正常开发中，是放在向量数据库里面的）
  const embeddedDocs = await loadCachedEmbeddings();

  // 接下来就需要用用户的问题和向量数据库里面的数据做一个比对
  // 然后拿到和用户问题相关的向量
  const relevantDocs = await searchByEmbedding(question, embeddedDocs);

  // 将relevantDocs里面的文本提取出来，作为上下文
  const context = relevantDocs.map((d) => `- ${d.content}`).join("\n");

  // 这是一个提示词模板
  const prompt = `
你是一个中文智能助手，请使用中文回答用户的问题。以下是背景知识和问题内容：

背景知识：
${context}

问题：${question}
`;
  // 请求ollama服务器
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt,
      stream: false,
    }),
  });

  // 拿到响应结果
  const result = await response.json();
  // 返回给前端
  res.json({ answer: result.response });
});

module.exports = router;
