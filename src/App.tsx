import { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 示例：使用axios获取数据
  const fetchData = async () => {
    setLoading(true);
    try {
      // 这里是一个示例API调用
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
      setData(response.data);
    } catch (error) {
      console.error("获取数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex justify-center space-x-8 mb-8">
            <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
              <img src={viteLogo} className="h-24 hover:drop-shadow-lg transition-all duration-300" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              <img src={reactLogo} className="h-24 animate-spin-slow hover:drop-shadow-lg transition-all duration-300" alt="React logo" />
            </a>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">AskDiary</h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">React + Vite + Tailwind</h2>

            <button
              onClick={() => setCount((count) => count + 1)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              计数: {count}
            </button>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              编辑 <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono text-sm">src/App.tsx</code> 并保存以测试热重载
            </p>
          </div>

          {/* Axios数据获取示例 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Axios数据获取示例</h3>

            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-gray-600 dark:text-gray-300">加载中...</span>
              </div>
            ) : data ? (
              <div className="text-left bg-gray-50 dark:bg-gray-700 rounded p-4">
                <h4 className="font-semibold text-gray-800 dark:text-white">{data.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{data.body}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">ID: {data.id}</span>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">没有数据</p>
            )}

            <button onClick={fetchData} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
              重新获取数据
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>点击Vite和React图标了解更多</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
