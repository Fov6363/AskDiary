import { Template } from "../types";

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
}

export default function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "工作":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "学习":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "生活":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200 p-6 cursor-pointer group"
      onClick={() => onSelect(template)}
    >
      {/* 标签 */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>{template.category}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{template.questions.length} 个问题</span>
      </div>

      {/* 标题 */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{template.name}</h3>

      {/* 描述 */}
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{template.description}</p>

      {/* 问题预览 */}
      <div className="space-y-1 mb-4">
        {template.questions.slice(0, 2).map((question, index) => (
          <div key={question.id} className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {index + 1}. {question.question}
          </div>
        ))}
        {template.questions.length > 2 && <div className="text-xs text-gray-400 dark:text-gray-500">还有 {template.questions.length - 2} 个问题...</div>}
      </div>

      {/* 开始按钮 */}
      <button className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        开始填写
      </button>
    </div>
  );
}
