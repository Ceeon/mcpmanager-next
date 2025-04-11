import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并Tailwind类名工具，处理类名冲突
 * @param  {...any} inputs 类名列表
 * @returns {string} 合并后的类名
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * 验证JSON字符串
 * @param {string} jsonString 要验证的JSON字符串
 * @returns {Object} 验证结果，包含isValid和message
 */
export function validateJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return { isValid: true, message: '验证通过' };
  } catch (error) {
    return { isValid: false, message: error.message };
  }
}

/**
 * 格式化JSON字符串
 * @param {string} jsonString 要格式化的JSON字符串
 * @returns {string} 格式化后的JSON字符串
 */
export function formatJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    return jsonString;
  }
} 