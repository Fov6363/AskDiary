import axios from "axios";
import { Template } from "../types";

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface GenerateOptions {
  template: Template;
  answers: Record<string, string>;
  apiKey: string;
}

export class DeepSeekService {
  private static readonly API_BASE_URL = "https://api.deepseek.com/v1";
  private static readonly MODEL = "deepseek-chat";

  /**
   * 生成日报内容
   */
  static async generateDiary({ template, answers, apiKey }: GenerateOptions): Promise<string> {
    if (!apiKey) {
      throw new Error("请先在设置中配置DeepSeek API密钥");
    }

    // 构建问答内容
    const qaContent = template.questions
      .map((question, index) => {
        const answer = answers[question.id] || "未回答";
        return `问题${index + 1}：${question.question}\n回答：${answer}`;
      })
      .join("\n\n");

    // 构建提示词
    const prompt = `你是一个擅长文字润色的助手，请对以下用户填写的日报内容进行轻度润色。保持用户原意，不做夸张修饰，
只进行以下几点：
    1、修改明显的语病；
    2、优化表达逻辑，使语言更通顺自然；
    3、保留用户使用的口语或个人风格；
    4、不加入任何未提及的内容或评价；
    5、保持简洁，避免废话或重复。
    6、去掉问题，将用户的回答串联成一篇日报。

请返回润色后的版本，仅输出润色结果，不添加解释或其他内容。

用户填写的内容如下：

${qaContent}

`;

    try {
      const response = await axios.post<DeepSeekResponse>(
        `${this.API_BASE_URL}/chat/completions`,
        {
          model: this.MODEL,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
          stream: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          timeout: 30000, // 30秒超时
        }
      );

      const content = response.data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("AI返回的内容为空");
      }

      return content.trim();
    } catch (error: any) {
      console.error("DeepSeek API调用失败:", error);

      // 处理不同类型的错误
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.error?.message || "未知错误";

        switch (status) {
          case 401:
            throw new Error("API密钥无效，请检查设置中的密钥是否正确");
          case 429:
            throw new Error("请求过于频繁，请稍后再试");
          case 500:
            throw new Error("DeepSeek服务暂时不可用，请稍后再试");
          default:
            throw new Error(`API请求失败: ${message}`);
        }
      } else if (error.code === "ECONNABORTED") {
        throw new Error("请求超时，请检查网络连接");
      } else if (error.code === "NETWORK_ERROR") {
        throw new Error("网络连接失败，请检查网络设置");
      } else {
        throw new Error(`生成失败: ${error.message}`);
      }
    }
  }

  /**
   * 验证API密钥是否有效
   */
  static async validateApiKey(apiKey: string): Promise<boolean> {
    if (!apiKey) return false;

    try {
      const response = await axios.post(
        `${this.API_BASE_URL}/chat/completions`,
        {
          model: this.MODEL,
          messages: [{ role: "user", content: "测试" }],
          max_tokens: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          timeout: 10000,
        }
      );
      return response.status === 200;
    } catch (error: any) {
      return false;
    }
  }
}

/**
 * API密钥管理
 */
export class ApiKeyManager {
  private static readonly STORAGE_KEY = "askdiary_deepseek_api_key";

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.STORAGE_KEY, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  static removeApiKey(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static hasApiKey(): boolean {
    return !!this.getApiKey();
  }
}
