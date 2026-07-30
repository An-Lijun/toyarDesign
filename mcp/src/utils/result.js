/**
 * 统一构造 MCP 文本返回结果
 * @param {string} text
 * @returns {Object}
 */
export function textResult(text) {
  return { content: [{ type: 'text', text }] }
}
