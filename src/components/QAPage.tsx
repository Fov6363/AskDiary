import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { templates } from "../data/templates";
import { Template, AnswerSession } from "../types";

export default function QAPage() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();

  const [template, setTemplate] = useState<Template | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // 生成localStorage的key
  const getStorageKey = (templateId: string) => `askdiary_session_${templateId}`;

  // 保存答案到localStorage
  const saveSession = useCallback(
    (templateId: string, answers: Record<string, string>) => {
      const session: AnswerSession = {
        templateId,
        answers,
        lastUpdated: new Date(),
        isCompleted: Object.keys(answers).length === template?.questions.length,
      };
      localStorage.setItem(getStorageKey(templateId), JSON.stringify(session));
    },
    [template]
  );

  // 从localStorage恢复会话
  const loadSession = useCallback((templateId: string) => {
    try {
      const sessionData = localStorage.getItem(getStorageKey(templateId));
      if (sessionData) {
        const session: AnswerSession = JSON.parse(sessionData);
        return session;
      }
    } catch (error) {
      console.error("恢复会话失败:", error);
    }
    return null;
  }, []);

  // 初始化模板和会话数据
  useEffect(() => {
    if (!templateId) {
      navigate("/");
      return;
    }

    const foundTemplate = templates.find((t) => t.id === templateId);
    if (!foundTemplate) {
      navigate("/");
      return;
    }

    setTemplate(foundTemplate);

    // 尝试恢复之前的会话
    const session = loadSession(templateId);
    if (session) {
      setAnswers(session.answers);
    }

    setIsLoading(false);
  }, [templateId, navigate, loadSession]);

  // 更新单个问题的答案
  const updateAnswer = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => {
        const newAnswers = { ...prev, [questionId]: value };
        // 防抖保存到localStorage
        if (templateId) {
          setTimeout(() => {
            saveSession(templateId, newAnswers);
          }, 500);
        }
        return newAnswers;
      });
    },
    [templateId, saveSession]
  );

  // 检查是否所有问题都已回答
  const answeredCount = Object.values(answers).filter((answer) => answer.trim()).length;
  const isAllAnswered = template?.questions.every((q) => answers[q.id]?.trim()) || false;
  const progress = template ? (answeredCount / template.questions.length) * 100 : 0;

  // 生成日报
  const generateDiary = () => {
    if (!template || !isAllAnswered) return;
    navigate("/result", { state: { template, answers } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">模板未找到</h1>
          <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate("/")} className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{template.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  总共 {template.questions.length} 个问题 · 已完成 {answeredCount} 个
                </p>
              </div>
            </div>

            {/* 进度条 */}
            <div className="hidden sm:flex items-center space-x-3">
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{Math.round(progress)}%</span>
              <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            {/* 设置按钮 */}
            <button
              onClick={() => navigate("/settings")}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          {/* 移动端进度条 */}
          <div className="sm:hidden mt-3">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>进度: {Math.round(progress)}%</span>
              <span>已完成 {answeredCount} 个</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* 所有问题平铺显示 */}
          {template.questions.map((question, index) => (
            <div key={question.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              {/* 问题标题 */}
              <div className="mb-4">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">问题 {index + 1}</span>
                  {answers[question.id]?.trim() && (
                    <span className="ml-2 text-green-600 dark:text-green-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">{question.question}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{question.placeholder}</p>
              </div>

              {/* 答案输入区域 */}
              <div>
                <textarea
                  value={answers[question.id] || ""}
                  onChange={(e) => updateAnswer(question.id, e.target.value)}
                  placeholder={question.placeholder}
                  className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{(answers[question.id] || "").length} 字符</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">内容会自动保存</span>
                </div>
              </div>
            </div>
          ))}

          {/* 生成日报按钮 */}
          <div className="flex justify-center pt-4">
            <button
              onClick={generateDiary}
              disabled={!isAllAnswered}
              className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium text-lg transition-colors ${
                isAllAnswered ? "bg-green-600 text-white hover:bg-green-700 shadow-lg" : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>生成日报</span>
              {!isAllAnswered && <span className="text-sm">(还有 {template.questions.length - answeredCount} 个问题待回答)</span>}
            </button>
          </div>
        </div>

        {/* 底部间距 */}
        <div className="h-8"></div>
      </main>
    </div>
  );
}
