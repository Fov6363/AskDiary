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
];

export const categories = [...new Set(templates.map((template) => template.category))];
