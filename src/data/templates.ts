import { Template } from "../types";

export const templates: Template[] = [
  {
    id: "template-problem-solving",
    name: "问题解决日报",
    description: "记录你今天遇到的问题、解决过程与反思。",
    category: "问题解决",
    questions: [
      {
        id: "q1",
        question: "你今天遇到了什么关键问题？",
        placeholder: "描述具体的问题情境，例如服务异常、功能缺陷等",
      },
      {
        id: "q2",
        question: "你是怎么定位和分析这个问题的？",
        placeholder: "提及你用到的排查手段、数据或工具",
      },
      {
        id: "q3",
        question: "最终是如何解决的？",
        placeholder: "说明采用的解决方案和关键思路",
      },
      {
        id: "q4",
        question: "这件事带来了哪些经验教训？",
        placeholder: "你对这个问题的反思或总结",
      },
    ],
  },
  {
    id: "template-progress-report",
    name: "工作进展日报",
    description: "用于记录今日完成的工作与明日计划。",
    category: "工作进展",
    questions: [
      {
        id: "q1",
        question: "今天完成了哪些任务？",
        placeholder: "用清单形式列出主要工作事项",
      },
      {
        id: "q2",
        question: "过程中遇到了什么困难？",
        placeholder: "可以写没有解决的 bug、阻塞事项等",
      },
      {
        id: "q3",
        question: "明天的工作计划是什么？",
        placeholder: "列出预计要完成的事项",
      },
    ],
  },
  {
    id: "template-thinking-log",
    name: "深度思考日报",
    description: "引导你对工作中的现象或选择进行深入思考。",
    category: "思考总结",
    questions: [
      {
        id: "q1",
        question: "今天有什么让你产生疑问或好奇的地方？",
        placeholder: "比如某个用户行为、系统设计选择等",
      },
      {
        id: "q2",
        question: "你是如何理解或解答这个问题的？",
        placeholder: "可以写你搜索、请教或推理的过程",
      },
      {
        id: "q3",
        question: "这个过程对你的工作有什么启发？",
        placeholder: "思考这件事如何影响你未来的决策",
      },
    ],
  },
  {
    id: "weekly-001-q1",
    name: "产品或技术交流洞察模板",
    description: "记录一次交流、分享、讨论中对你产生启发的内容或观点",
    category: "weekly-detail",
    questions: [
      {
        id: "q1",
        question: "你本周参与了哪些产品或技术的讨论？核心话题是什么？",
        placeholder: "如一次团队评审、架构讨论、PR review 等",
      },
      {
        id: "q2",
        question: "有没有哪次对话或同事的观点让你改变了原本的想法？",
        placeholder: "可提到具体的人、观点或讨论内容",
      },
      {
        id: "q3",
        question: "有没有你主动表达、澄清或推进的内容？别人反馈如何？",
        placeholder: "可结合沟通技巧、影响力思考",
      },
      {
        id: "q4",
        question: "从这些交流中，你收获了什么？是否引发了你新的思考？",
        placeholder: "比如“我意识到 xxx 背后的逻辑是...”",
      },
    ],
  },
  {
    id: "weekly-001-q2",
    name: "技术排查过程复盘模板",
    description: "复盘一次技术问题的排查过程与思考路径",
    category: "weekly-detail",
    questions: [
      {
        id: "q1",
        question: "这周遇到的技术问题是什么？是如何被触发或发现的？",
        placeholder: "例如“某服务在扩容后 500”",
      },
      {
        id: "q2",
        question: "你是如何开始排查的？哪些思路或工具帮到了你？",
        placeholder: "例如观察日志、对比版本、二分定位等",
      },
      {
        id: "q3",
        question: "AI 在这个过程中是否有帮助？你用的是哪个工具？效果如何？",
        placeholder: "例如 Claude 在解释栈时很清晰，但 Cursor 没能给出正解",
      },
      {
        id: "q4",
        question: "这个问题背后有没有更深的根因？你有哪些复盘和反思？",
        placeholder: "例如：“问题根本原因是部署流程中的 xx 机制不一致”",
      },
    ],
  },
  {
    id: "weekly-001-q3",
    name: "AI 工具使用体验模板",
    description: "记录你试用 AI 工具的过程与对工作方式的启发",
    category: "weekly-detail",
    questions: [
      {
        id: "q1",
        question: "你本周试用了哪些新的 AI 工具或功能？在什么场景下？",
        placeholder: "如 Claude 代码分析、Cursor 自动补全、ChatGPT 总结日志等",
      },
      {
        id: "q2",
        question: "你在使用过程中印象最深的地方是什么？",
        placeholder: "例如 Claude 能连续跟进问题，比其他工具更稳",
      },
      {
        id: "q3",
        question: "这个工具改变了你哪些原有的工作流程？",
        placeholder: "如写日报变轻松、查文档速度变快等",
      },
      {
        id: "q4",
        question: "你是否发现了一些局限、误区或值得优化的点？",
        placeholder: "如“长上下文支持不稳定”、“补全总是跑偏”",
      },
    ],
  },
  {
    id: "weekly-001-q4",
    name: "产品上线问题与复盘模板",
    description: "记录一次上线后出现的问题及根因反思",
    category: "weekly-detail",
    questions: [
      {
        id: "q1",
        question: "是什么产品或功能上线了？出现了什么问题？",
        placeholder: "例如“AI 入口上线后用户打不开页面”",
      },
      {
        id: "q2",
        question: "你是如何知道这个问题的？是内部测试还是用户反馈？",
        placeholder: "是否第一时间响应？是否复现顺畅？",
      },
      {
        id: "q3",
        question: "根因是什么？是流程、技术、协作还是理解偏差？",
        placeholder: "例如“文案理解差异导致埋点缺失”",
      },
      {
        id: "q4",
        question: "这件事给你带来了哪些反思？你打算怎么优化？",
        placeholder: "例如补充 checklist、引入前置测试场景",
      },
    ],
  },
  {
    id: "weekly-001-q5",
    name: "公司信息与个人理解模板",
    description: "记录你对 All Hands 或公司战略消息的理解与回应",
    category: "weekly-detail",
    questions: [
      {
        id: "q1",
        question: "这周公司有哪些全员传达或战略信息？是什么主题？",
        placeholder: "如“全面 AI 化”、“强化 GCR 本地化”",
      },
      {
        id: "q2",
        question: "你如何理解这个方向？它和你的日常工作有什么关系？",
        placeholder: "是否对你负责的模块、协作方式产生了影响？",
      },
      {
        id: "q3",
        question: "你是否从中获得了新的动力、目标或压力？",
        placeholder: "如感受到速度的要求、能力结构的变化等",
      },
      {
        id: "q4",
        question: "有没有你认同或不认同的地方？为什么？",
        placeholder: "如“我觉得 AI 优先不是所有流程都适配”",
      },
    ],
  },
  {
    id: "weekly-001-q6",
    name: "反思与趋势洞察模板",
    description: "记录你对个人节奏、行业趋势或工作习惯的反思",
    category: "weekly-detail",
    questions: [
      {
        id: "q1",
        question: "这周有没有哪件事让你停下来思考？",
        placeholder: "如“对输出质量的标准开始有了新的思考”",
      },
      {
        id: "q2",
        question: "你在自己的节奏、习惯或角色中发现了哪些问题或优势？",
        placeholder: "如“我太依赖 AI，而不再验证逻辑”",
      },
      {
        id: "q3",
        question: "有没有观察到一些值得关注的趋势、变化或信号？",
        placeholder: "如“最近团队开始更主动复盘错误”",
      },
      {
        id: "q4",
        question: "你希望未来怎么调整自己或推动团队？",
        placeholder: "如“试着每周至少写一篇主动反思类日报”",
      },
    ],
  },
];

export const categories = [...new Set(templates.map((template) => template.category))];
