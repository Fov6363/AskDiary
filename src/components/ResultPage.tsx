import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Template } from "../types";
import { DeepSeekService, ApiKeyManager } from "../services/deepseek";

interface ResultPageState {
  template: Template;
  answers: Record<string, string>;
}

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultPageState;

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [showOriginal, setShowOriginal] = useState(false);
  const [error, setError] = useState("");

  // 如果没有数据，返回首页
  if (!state?.template || !state?.answers) {
    navigate("/");
    return null;
  }

  const { template, answers } = state;

  // 生成简单的日报格式（降级方案）
  const generateSimpleDiary = () => {
    const content = template.questions
      .map((question, index) => {
        const answer = answers[question.id] || "暂无内容";
        return `## ${question.question}\n\n${answer}\n`;
      })
      .join("\n");

    return `# ${template.name}\n\n*生成时间：${new Date().toLocaleString("zh-CN")}*\n\n${content}`;
  };

  // AI生成日报
  const handleGenerate = async () => {
    setIsGenerating(true);
    setError("");

    try {
      const apiKey = ApiKeyManager.getApiKey();

      if (!apiKey) {
        setError("请先在设置中配置DeepSeek API密钥");
        // 生成简单格式作为降级方案
        const simpleContent = generateSimpleDiary();
        setGeneratedContent(simpleContent);
        return;
      }

      // 调用DeepSeek API生成内容
      const aiContent = await DeepSeekService.generateDiary({
        template,
        answers,
        apiKey,
      });

      setGeneratedContent(aiContent);
    } catch (error: any) {
      console.error("生成失败:", error);
      setError(error.message || "生成失败，请稍后重试");

      // 如果API失败，使用简单格式作为降级方案
      const simpleContent = generateSimpleDiary();
      setGeneratedContent(simpleContent);
    } finally {
      setIsGenerating(false);
    }
  };

  // 复制到剪贴板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      alert("已复制到剪贴板！");
    } catch (error) {
      console.error("复制失败:", error);
      // 降级方案：选择文本
      const textArea = document.createElement("textarea");
      textArea.value = generatedContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("已复制到剪贴板！");
    }
  };

  // 下载为Markdown文件
  const downloadMarkdown = () => {
    const blob = new Blob([generatedContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${template.name}_${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const hasApiKey = ApiKeyManager.hasApiKey();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/template/${template.id}`)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">日报生成</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{template.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate("/settings")} className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>设置</span>
              </button>
              <button onClick={() => navigate("/")} className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                返回首页
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!generatedContent ? (
          /* 生成前的状态 */
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">准备生成日报</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">您已完成了所有问题的回答，AI将根据您的回答生成一份精美的日报总结</p>

              {/* API密钥状态提示 */}
              {!hasApiKey && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6 max-w-md mx-auto">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">
                      <p className="font-medium">未配置API密钥</p>
                      <p>
                        将使用简单格式生成，
                        <button onClick={() => navigate("/settings")} className="underline hover:no-underline">
                          点击配置AI功能
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 回答预览 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">您的回答预览：</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {template.questions.map((question, index) => (
                    <div key={question.id} className="text-sm">
                      <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {index + 1}. {question.question}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-300 dark:border-gray-600">{answers[question.id] || "暂无内容"}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  isGenerating ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{hasApiKey ? "AI正在生成中..." : "正在生成中..."}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{hasApiKey ? "开始AI生成" : "开始生成日报"}</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* 生成后的结果 */
          <div className="space-y-6">
            {/* 操作按钮 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-gray-900 dark:text-white">{hasApiKey ? "AI日报生成完成" : "日报生成完成"}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowOriginal(!showOriginal)}
                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {showOriginal ? "隐藏" : "查看"}原始回答
                  </button>
                  <button onClick={handleGenerate} className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800">
                    重新生成
                  </button>
                  <button onClick={copyToClipboard} className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800">
                    复制
                  </button>
                  <button
                    onClick={downloadMarkdown}
                    className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-800"
                  >
                    下载
                  </button>
                </div>
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-red-700 dark:text-red-300">
                    <p className="font-medium">生成过程中遇到问题</p>
                    <p>{error}</p>
                    {error.includes("API密钥") && (
                      <p className="mt-1">
                        <button onClick={() => navigate("/settings")} className="underline hover:no-underline">
                          前往设置配置
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 原始回答（可折叠） */}
            {showOriginal && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">原始回答</h3>
                <div className="space-y-4">
                  {template.questions.map((question, index) => (
                    <div key={question.id} className="border-l-4 border-gray-200 dark:border-gray-600 pl-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {index + 1}. {question.question}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{answers[question.id] || "暂无内容"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 生成的日报内容 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">生成的日报</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{hasApiKey ? "AI已根据您的回答生成了以下内容" : "根据您的回答生成了以下内容"}，您可以进一步编辑</p>
              </div>
              <div className="p-6">
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">{generatedContent}</pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
