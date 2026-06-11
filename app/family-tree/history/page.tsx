import { Suspense } from "react";
import { fetchFamilyHistory } from "./actions";
import { HistoryClient } from "./history-client";

export default async function HistoryPage() {
  const record = await fetchFamilyHistory();

  return (
    <div className="container mx-auto px-4 py-6">
      <Suspense fallback={<div className="animate-pulse">加载中...</div>}>
        <HistoryClient initialRecord={record} />
      </Suspense>
    </div>
  );
}
