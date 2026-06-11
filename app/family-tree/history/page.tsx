import HistoryClient from "./history-client";

// 强制页面为动态渲染，避免静态预渲染错误
export const dynamic = 'force-dynamic';

export default function HistoryPage() {
  return <HistoryClient />;
}
