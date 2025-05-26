"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Star, Users } from "lucide-react"

interface PlanItem {
  time: string
  activity: string
  location: string
  type: "attraction" | "show" | "meal" | "break"
  priority: "high" | "medium" | "low"
}

interface Preferences {
  park: string
  ageGroup: string[]
  interests: string[]
  duration: string
  priorities: string[]
}

const samplePlan: PlanItem[] = [
  { time: "8:00", activity: "開園・入園", location: "メインエントランス", type: "break", priority: "high" },
  {
    time: "8:30",
    activity: "ダックリングドリームバーガー",
    location: "ファンタジースプリングス",
    type: "meal",
    priority: "medium",
  },
  {
    time: "9:30",
    activity: "ギョウザドッグ",
    location: "ミステリアスアイランド",
    type: "meal",
    priority: "medium",
  },
  {
    time: "10:30",
    activity: "フライドチキン",
    location: "アメリカンウォーターフロント",
    type: "meal",
    priority: "high",
  },
  {
    time: "12:00",
    activity: "ユカタンソーセージドッグ",
    location: "ロストリバーデルタ",
    type: "meal",
    priority: "medium",
  },
  {
    time: "13:30",
    activity: "クレームブリュレ風チュロス",
    location: "ウエスタンランド",
    type: "meal",
    priority: "medium",
  },
  {
    time: "14:30",
    activity: "スパークリングカクテル（ウォッカ&パイナップル）",
    location: "アメリカンウォーターフロント",
    type: "break",
    priority: "low",
  },
  { time: "15:30", activity: "ウィスキーカクテル（ピーチ&バタフライピー", location: "アメリカンウォーターフロント", type: "break", priority: "low" },
  { time: "16:30", activity: "日本酒カクテル（Apple&バニラ）", location: "アメリカンウォーターフロント", type: "break", priority: "low" },
  {
    time: "18:00",
    activity: "スモークチキンレッグ",
    location: "ファンタジースプリングス",
    type: "meal",
    priority: "high",
  },
  { time: "20:00", activity: "退園", location: "メインエントランス", type: "break", priority: "low" },
  { time: "21:00", activity: "ファミチキ", location: "最寄りのファミマ", type: "meal", priority: "high" },
]

export default function DisneyPlannerApp() {
  const [preferences, setPreferences] = useState<Preferences>({
    park: "",
    ageGroup: [],
    interests: [],
    duration: "",
    priorities: [],
  })
  const [generatedPlan, setGeneratedPlan] = useState<PlanItem[] | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleCheckboxChange = (category: keyof Preferences, value: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: checked
        ? [...(prev[category] as string[]), value]
        : (prev[category] as string[]).filter((item) => item !== value),
    }))
  }

  const generatePlan = async () => {
    setIsGenerating(true)
    // サンプルプラン生成のシミュレーション
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setGeneratedPlan(samplePlan)
    setIsGenerating(false)
  }

  const getTypeIcon = (type: PlanItem["type"]) => {
    switch (type) {
      case "attraction":
        return "🎢"
      case "show":
        return "🎭"
      case "meal":
        return "🍽️"
      case "break":
        return "☕"
      default:
        return "📍"
    }
  }

  const getPriorityColor = (priority: PlanItem["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🏰 ディズニーパーク 1日プランナー</h1>
          <p className="text-lg text-gray-600">あなたの好みに合わせて最適な1日プランを提案します</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 設定パネル */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                プラン設定
              </CardTitle>
              <CardDescription>あなたの好みや条件を選択してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* パーク選択 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">パーク選択</Label>
                <Select
                  value={preferences.park}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, park: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="パークを選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disneyland">東京ディズニーシー</SelectItem>
                    <SelectItem value="disneysea">東京ディズニーシー</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 年齢層 */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">年齢層・グループ</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "小さなお子様連れ",
                    "小学生連れ",
                    "中高生グループ",
                    "大学生グループ",
                    "大人カップル",
                    "大人友達同士",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`age-${item}`}
                        checked={preferences.ageGroup.includes(item)}
                        onCheckedChange={(checked) => handleCheckboxChange("ageGroup", item, checked as boolean)}
                      />
                      <Label htmlFor={`age-${item}`} className="text-sm">
                        {item}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 興味のあるエリア */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">興味のあるエリア</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "ファンタジーランド",
                    "トゥモローランド",
                    "ウエスタンランド",
                    "アドベンチャーランド",
                    "クリッターカントリー",
                    "トゥーンタウン",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`area-${item}`}
                        checked={preferences.interests.includes(item)}
                        onCheckedChange={(checked) => handleCheckboxChange("interests", item, checked as boolean)}
                      />
                      <Label htmlFor={`area-${item}`} className="text-sm">
                        {item}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 滞在時間 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">滞在時間</Label>
                <Select
                  value={preferences.duration}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, duration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="滞在時間を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="half-day">半日（4-6時間）</SelectItem>
                    <SelectItem value="full-day">1日（8-12時間）</SelectItem>
                    <SelectItem value="two-days">2日間</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 優先度 */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">重視したいポイント</Label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "アトラクション重視",
                    "ショー・パレード重視",
                    "グルメ重視",
                    "写真撮影重視",
                    "お土産重視",
                    "のんびり過ごしたい",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`priority-${item}`}
                        checked={preferences.priorities.includes(item)}
                        onCheckedChange={(checked) => handleCheckboxChange("priorities", item, checked as boolean)}
                      />
                      <Label htmlFor={`priority-${item}`} className="text-sm">
                        {item}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={generatePlan} className="w-full" size="lg" disabled={isGenerating || !preferences.park}>
                {isGenerating ? "プラン生成中..." : "🎯 最適プランを生成"}
              </Button>
            </CardContent>
          </Card>

          {/* 生成されたプラン */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                おすすめ1日プラン
              </CardTitle>
              <CardDescription>
                {generatedPlan
                  ? "森さんにぴったりのプランが完成しました！"
                  : "左側で条件を設定してプランを生成してください"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedPlan ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {preferences.park === "disneyland" ? "東京ディズニーランド" : "東京ディズニーシー"}
                    </Badge>
                    <Badge variant="outline">全{generatedPlan.length}項目</Badge>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {generatedPlan.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
                      >
                        <div className="text-2xl">{getTypeIcon(item.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-blue-600">{item.time}</span>
                            <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>
                              {item.priority === "high" ? "必須" : item.priority === "medium" ? "推奨" : "余裕があれば"}
                            </Badge>
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">{item.activity}</h4>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="h-3 w-3" />
                            {item.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 このプランは目安です。当日の混雑状況や天候に応じて調整してくださいね！
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">🎠</div>
                  <p>
                    まずは左側で条件を設定して、
                    <br />
                    プランを生成してみましょう！
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
