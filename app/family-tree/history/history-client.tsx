"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText, Save, Pencil, Loader2 } from "lucide-react";
import { RichTextEditor } from "@/components/rich-text/editor";
import { RichTextViewer } from "@/components/rich-text/viewer";
import { saveFamilyHistory } from "./actions";

export function HistoryClient() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("家族渊源");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("请输入标题");
      return;
    }

    setIsSaving(true);
    const result = await saveFamilyHistory(title.trim(), content);
    setIsSaving(false);

    if (result.success) {
      setIsEditing(false);
      setLastUpdated(new Date().toLocaleString("zh-CN"));
      router.refresh();
    } else {
      alert(`保存失败：${result.error}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <ScrollText className="h-6 w-6 text-amber-700 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-2xl font-serif">{title}</CardTitle>
              {lastUpdated && (
                <p className="text-sm text-muted-foreground mt-1">
                  最后更新：{lastUpdated}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  取消
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  保存
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                编辑
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="history-title">标题</Label>
                <Input
                  id="history-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="输入标题..."
                  className="text-lg font-serif"
                />
              </div>
              <div className="space-y-2">
                <Label>内容</Label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  maxLength={5000}
                />
              </div>
            </>
          ) : (
            <div className="prose prose-stone dark:prose-invert max-w-none min-h-[200px] font-serif">
              {content ? (
                <RichTextViewer value={content} />
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                  <ScrollText className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-lg">暂无家族渊源记录</p>
                  <p className="text-sm">点击"编辑"开始撰写</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default HistoryClient;
