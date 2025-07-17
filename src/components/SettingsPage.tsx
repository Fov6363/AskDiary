import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiKeyManager, DeepSeekService } from "../services/deepseek";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    status: "success" | "error" | null;
    message: string;
  }>({ status: null, message: "" });
  const [showApiKey, setShowApiKey] = useState(false);

  // 加载现有的API密钥
  useEffect(() => {
    const existingKey = ApiKeyManager.getApiKey();
    if (existingKey) {
      setApiKey(existingKey);
    }
  }, []);

  // 保存API密钥
  const handleSave = async () => {
    if (!apiKey.trim()) {
      setValidationResult({
        status: "error",
        message: "请输入API密钥",
      });
      return;
    }

    setIsValidating(true);
    setValidationResult({ status: null, message: "" });

    try {
      // 验证API密钥
      const isValid = await DeepSeekService.validateApiKey(apiKey.trim());

      if (isValid) {
        ApiKeyManager.saveApiKey(apiKey.trim());
        setValidationResult({
          status: "success",
          message: "API密钥验证成功并已保存",
        });
      } else {
        setValidationResult({
          status: "error",
          message: "API密钥验证失败，请检查密钥是否正确",
        });
      }
    } catch (error) {
      setValidationResult({
        status: "error",
        message: "验证过程中出现错误，请检查网络连接",
      });
    } finally {
      setIsValidating(false);
    }
  };

  // 清除API密钥
  const handleClear = () => {
    setApiKey("");
    ApiKeyManager.removeApiKey();
    setValidationResult({
      status: "success",
      message: "API密钥已清除",
    });
  };

  // 测试API密钥
  const handleTest = async () => {
    if (!apiKey.trim()) {
      setValidationResult({
        status: "error",
        message: "请先输入API密钥",
      });
      return;
    }

    setIsValidating(true);
    setValidationResult({ status: null, message: "" });

    try {
      const isValid = await DeepSeekService.validateApiKey(apiKey.trim());
      setValidationResult({
        status: isValid ? "success" : "error",
        message: isValid ? "API密钥验证通过" : "API密钥验证失败",
      });
    } catch (error) {
      setValidationResult({
        status: "error",
        message: "测试失败，请检查网络连接",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate("/")} className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">设置</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">配置DeepSeek API密钥以启用AI生成功能</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          {/* DeepSeek API 配置 */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">DeepSeek API 配置</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">配置您的DeepSeek API密钥以启用AI日报生成功能</p>
              </div>
            </div>

            {/* API密钥输入 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API密钥</label>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="block w-full pr-20 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showApiKey ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">API密钥将安全地保存在本地浏览器中</p>
              </div>

              {/* 验证结果 */}
              {validationResult.status && (
                <div
                  className={`p-3 rounded-lg flex items-center space-x-2 ${
                    validationResult.status === "success" ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300" : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                  }`}
                >
                  {validationResult.status === "success" ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span className="text-sm">{validationResult.message}</span>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleTest}
                  disabled={isValidating || !apiKey.trim()}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isValidating ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span>{isValidating ? "验证中..." : "测试连接"}</span>
                </button>

                <button
                  onClick={handleSave}
                  disabled={isValidating || !apiKey.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>保存</span>
                </button>

                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span>清除</span>
                </button>
              </div>
            </div>
          </div>

          {/* 使用说明 */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">如何获取DeepSeek API密钥</h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-medium">1</span>
                <p>
                  访问{" "}
                  <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    DeepSeek开放平台
                  </a>{" "}
                  并注册账号
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-medium">2</span>
                <p>在控制台中创建新的API密钥</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-medium">3</span>
                <p>将API密钥复制并粘贴到上面的输入框中</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-medium">4</span>
                <p>点击"测试连接"验证密钥有效性，然后保存</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div className="text-sm text-yellow-700 dark:text-yellow-300">
                  <p className="font-medium">安全提示</p>
                  <p>API密钥仅保存在您的浏览器本地存储中，不会上传到任何服务器。请妥善保管您的API密钥，不要分享给他人。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
