"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  QrCode,
  User,
  BarChart3,
  Sparkles,
  CreditCard,
  Gift,
  Wallet,
  Eye,
  EyeOff,
  ChevronRight,
  MapPin,
  Clock,
  TrendingUp,
  Shield,
  Award,
  Leaf,
  Store,
  BookOpen,
} from "lucide-react"

import ScanPayment from "@/components/payment/scan-payment"
import PaymentConfirmation from "@/components/payment/payment-confirmation"
import PaymentSuccess from "@/components/payment/payment-success"
import GardenHome from "@/components/garden/garden-home"
import VoiceAssistant from "@/components/voice/voice-assistant"
import SpendingAnalytics from "@/components/analytics/spending-analytics"
import UserProfile from "@/components/profile/user-profile"
import LoadingSpinner from "@/components/ui/loading-spinner"
import ToastNotification from "@/components/ui/toast-notification"
import TutorialOverlay from "@/components/ui/tutorial-overlay"
import PaymentCodeDisplay from "@/components/payment/payment-code-display"
import MerchantPartnership from "@/components/merchant/merchant-partnership"
import AutoBookkeeping from "@/components/bookkeeping/auto-bookkeeping"

export default function LandBankMobilePay() {
  const [showBalance, setShowBalance] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [showAIDetails, setShowAIDetails] = useState(false)
  const [currentView, setCurrentView] = useState("home")
  const [merchantData, setMerchantData] = useState(null)
  const [transactionData, setTransactionData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{
    type: "success" | "error" | "info"
    title: string
    message: string
  } | null>(null)
  const [showTutorial, setShowTutorial] = useState(false)

  const handleTutorialComplete = () => {
    localStorage.setItem("hasSeenTutorial", "true")
    setShowTutorial(false)
  }

  const handleTutorialSkip = () => {
    localStorage.setItem("hasSeenTutorial", "true")
    setShowTutorial(false)
  }

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial")
    if (!hasSeenTutorial) {
      setShowTutorial(true)
    }
  }, [])

  const tutorialSteps = [
    {
      target: "ai-recommendation",
      title: "AI 智慧推薦 - 專業可靠",
      content: "土地銀行百年金融專業，結合AI技術為您推薦最適合的支付方案，讓每一筆消費都更有價值",
      position: "bottom" as const,
    },
    {
      target: "scan-payment",
      title: "安全支付 - 值得信賴",
      content: "採用銀行級安全防護，讓您安心享受便利的數位支付體驗",
      position: "bottom" as const,
    },
    {
      target: "garden-tab",
      title: "成長陪伴 - 永續發展",
      content: "如同土銀陪伴台灣經濟成長，小土苗系統陪伴您的理財成長之路",
      position: "top" as const,
    },
  ]

  const showToast = (type: "success" | "error" | "info", title: string, message: string) => {
    setToast({ type, title, message })
  }

  const handleScanPayment = () => {
    setIsLoading(true)
    showToast("info", "土銀智慧分析中", "正在為您尋找最優惠的支付方案...")
    setTimeout(() => {
      setIsLoading(false)
      setCurrentView("scan")
    }, 1000)
  }

  const handleScanComplete = (data: any) => {
    setMerchantData(data)
    setCurrentView("confirmation")
    showToast("info", "商家資訊已識別", "土銀AI正在為您分析最佳支付方案...")
  }

  const handlePaymentConfirm = (paymentMethod: string) => {
    setIsLoading(true)
    const transaction = {
      ...merchantData,
      paymentMethod,
      timestamp: new Date(),
      transactionId: `LB${Date.now().toString().slice(-8)}`,
    }

    setTimeout(() => {
      setIsLoading(false)
      setTransactionData(transaction)
      setCurrentView("success")
      showToast("success", "交易成功完成", "感謝您選擇土地銀行，您的信賴是我們前進的動力")
    }, 2000)
  }

  const handleBackToHome = () => {
    setCurrentView("home")
    setMerchantData(null)
    setTransactionData(null)
    setActiveTab("home")
  }

  const handleGardenView = () => {
    setCurrentView("garden")
    setActiveTab("garden")
  }

  const handleVoiceAssistant = () => {
    setCurrentView("voice")
    showToast("info", "語音助理啟動", "請說出您需要的服務")
  }

  const handleAnalyticsView = () => {
    setCurrentView("analytics")
    setActiveTab("analysis")
  }

  const handleProfileView = () => {
    setCurrentView("profile")
    setActiveTab("profile")
  }

  const handlePaymentCodeDisplay = () => {
    setCurrentView("payment-code")
    showToast("info", "付款碼已準備", "請向商家出示您的專屬付款碼")
  }

  const handleMerchantPartnership = () => {
    setCurrentView("merchant-partnership")
    showToast("info", "合作商家會員", "查看您的整合會員權益與點數")
  }

  const handleAutoBookkeeping = () => {
    setCurrentView("auto-bookkeeping")
    showToast("info", "智慧記帳", "檢視自動分類記帳與消費分析")
  }

  const aiRecommendation = {
    merchant: "新光三越",
    card: "土銀聯名卡",
    cashback: "7%",
    amount: "最高回饋 NT$ 350",
    location: "信義區",
    timeLeft: "優惠剩餘 2 小時",
    details: {
      baseReward: "3%",
      bonusReward: "4%",
      merchantBonus: "百貨週年慶加碼",
      cardBonus: "土銀聯名卡專屬優惠",
      trustLevel: "銀行級安全保障",
    },
  }

  const recentTransactions = [
    { merchant: "全家便利商店", amount: 120, cashback: 3.6, time: "2小時前", category: "日常消費" },
    { merchant: "台灣中油", amount: 800, cashback: 24.0, time: "昨天", category: "交通運輸" },
    { merchant: "誠品書店", amount: 450, cashback: 22.5, time: "3天前", category: "文化教育" },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground professional-text">土銀智慧系統處理中，請稍候...</p>
          <p className="text-sm text-muted-foreground mt-2">百年信賴，值得等待</p>
        </div>
      </div>
    )
  }

  if (currentView === "scan") {
    return <ScanPayment onBack={() => setCurrentView("home")} onScanComplete={handleScanComplete} />
  }

  if (currentView === "confirmation" && merchantData) {
    return (
      <PaymentConfirmation
        merchantData={merchantData}
        onBack={() => setCurrentView("scan")}
        onConfirm={handlePaymentConfirm}
      />
    )
  }

  if (currentView === "success" && transactionData) {
    return <PaymentSuccess transactionData={transactionData} onBackToHome={handleBackToHome} />
  }

  if (currentView === "garden") {
    return <GardenHome onBack={handleBackToHome} />
  }

  if (currentView === "voice") {
    return <VoiceAssistant onBack={handleBackToHome} />
  }

  if (currentView === "analytics") {
    return <SpendingAnalytics onBack={handleBackToHome} />
  }

  if (currentView === "profile") {
    return <UserProfile onBack={handleBackToHome} />
  }

  if (currentView === "payment-code") {
    return <PaymentCodeDisplay onBack={handleBackToHome} />
  }

  if (currentView === "merchant-partnership") {
    return <MerchantPartnership onBack={handleBackToHome} />
  }

  if (currentView === "auto-bookkeeping") {
    return <AutoBookkeeping onBack={handleBackToHome} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Tutorial Overlay */}
      {showTutorial && (
        <TutorialOverlay steps={tutorialSteps} onComplete={handleTutorialComplete} onSkip={handleTutorialSkip} />
      )}

      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <header className="land-bank-gradient text-primary-foreground p-4 pb-6 trust-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary-foreground" />
            <h1 className="text-xl font-bold professional-text">土銀行動 Pay</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary-foreground/10"
            onClick={handleProfileView}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>

        {/* Balance Card */}
        <Card className="bg-card/10 border-primary-foreground/20 trust-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-4 w-4 text-primary-foreground/80" />
                  <p className="text-primary-foreground/80 text-sm professional-text">安全帳戶餘額</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-primary-foreground">{showBalance ? "NT$ 125,680" : "****"}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowBalance(!showBalance)
                      showToast("info", showBalance ? "已隱藏餘額" : "已顯示餘額", "土銀守護您的隱私安全")
                    }}
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Award className="h-4 w-4 text-primary-foreground/80" />
                  <p className="text-primary-foreground/80 text-sm professional-text">會員等級</p>
                </div>
                <Badge className="bg-accent text-accent-foreground land-bank-pulse">小樹苗 Lv.3</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* AI Recommendation */}
        <Card className="mb-6 border-accent/20 land-bank-gradient trust-shadow" id="ai-recommendation">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent trust-glow" />
                <CardTitle className="text-lg professional-text text-primary-foreground">土銀 AI 智慧推薦</CardTitle>
              </div>
              <Badge variant="outline" className="text-accent border-accent bg-primary-foreground/90">
                即時分析
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                <span>{aiRecommendation.location}</span>
                <Clock className="h-4 w-4 ml-2" />
                <span className="text-accent">{aiRecommendation.timeLeft}</span>
                <Shield className="h-4 w-4 ml-2" />
                <span className="text-primary-foreground/90">銀行級別安全防護</span>
              </div>

              <div className="bg-primary-foreground/90 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium professional-text">{aiRecommendation.merchant}</span>
                  <Badge className="bg-accent text-accent-foreground">{aiRecommendation.cashback} 回饋</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  使用 {aiRecommendation.card} 支付，{aiRecommendation.amount}
                </p>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">本月已獲得 75% 回饋上限 • 土銀為您精算</p>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground professional-text"
                  onClick={() => setShowAIDetails(!showAIDetails)}
                >
                  {showAIDetails ? "收起詳情" : "查看詳情"}
                  <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${showAIDetails ? "rotate-90" : ""}`} />
                </Button>
                <Button variant="outline" className="flex-1 bg-primary-foreground/90 professional-text">
                  立即使用
                </Button>
              </div>

              {showAIDetails && (
                <div className="mt-4 p-3 bg-primary-foreground/90 rounded-lg space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">基礎回饋</span>
                      <span>{aiRecommendation.details.baseReward}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">加碼回饋</span>
                      <span className="text-accent font-medium">{aiRecommendation.details.bonusReward}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">安全等級</span>
                      <span className="text-primary font-medium">{aiRecommendation.details.trustLevel}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2 space-y-1">
                      <div>• {aiRecommendation.details.merchantBonus}</div>
                      <div>• {aiRecommendation.details.cardBonus}</div>
                      <div className="text-primary">• 土地銀行百年信賴保障</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 trust-shadow"
            onClick={handleScanPayment}
            id="scan-payment"
          >
            <CardContent className="p-6 text-center">
              <QrCode className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium professional-text">安全掃碼支付</p>
              <p className="text-xs text-muted-foreground mt-1">銀行級防護</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 trust-shadow"
            onClick={handlePaymentCodeDisplay}
          >
            <CardContent className="p-6 text-center">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium professional-text">出示付款碼</p>
              <p className="text-xs text-muted-foreground mt-1">快速便利</p>
            </CardContent>
          </Card>
        </div>

        {/* Spending Insights */}
        <Card className="mb-6 trust-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg professional-text">智慧理財洞察</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={handleAnalyticsView} className="text-primary">
                <BarChart3 className="h-4 w-4 mr-1" />
                詳細分析
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 land-bank-gradient rounded-lg text-primary-foreground">
                <div>
                  <p className="font-medium text-sm professional-text">本月總消費</p>
                  <p className="text-2xl font-bold">NT$ 18,450</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">土銀回饋</p>
                  <p className="text-lg font-semibold">NT$ 892</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm professional-text flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  安全交易記錄
                </h4>
                {recentTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 hover:bg-muted/30 rounded px-2 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-sm professional-text">{transaction.merchant}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">{transaction.time}</p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">NT$ {transaction.amount}</p>
                      <p className="text-xs text-accent">+NT$ {transaction.cashback}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 trust-shadow">
            <CardContent className="p-4 text-center">
              <Wallet className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium professional-text">安全轉帳</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 trust-shadow">
            <CardContent className="p-4 text-center">
              <Gift className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium professional-text">便民繳費</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 trust-shadow"
            onClick={handleAnalyticsView}
          >
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium professional-text">專業分析</p>
            </CardContent>
          </Card>
        </div>

        {/* Integrated Services */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 professional-text flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            整合金融服務
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Card
              className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 trust-shadow"
              onClick={handleMerchantPartnership}
            >
              <CardContent className="p-4 text-center">
                <Store className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium professional-text">合作商家</p>
                <p className="text-xs text-muted-foreground mt-1">會員整合</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 trust-shadow"
              onClick={handleAutoBookkeeping}
            >
              <CardContent className="p-4 text-center">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium professional-text">智慧記帳</p>
                <p className="text-xs text-muted-foreground mt-1">自動分類</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Floating Voice Assistant Button */}
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          size="lg"
          className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white relative overflow-hidden"
          onClick={handleVoiceAssistant}
          id="voice-assistant"
        >
          <div className="flex flex-col items-center justify-center relative">
            <div className="relative">
              {/* Face - round and cheerful with more realistic proportions */}
              <div className="w-8 h-8 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 rounded-full border-2 border-orange-300 relative shadow-inner">
                {/* Hair - brown bowl cut with more detail and shading */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-7 h-4 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 rounded-t-full shadow-sm"></div>

                {/* Hat - more detailed with proper Land Bank styling */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-7 h-3.5 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-t-full border border-orange-800 relative shadow-md">
                  {/* Hat band */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 border-t border-yellow-600"></div>
                  {/* Land Bank emblem - green circle with characters */}
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-br from-green-400 to-green-600 rounded-full border border-green-700 flex items-center justify-center shadow-sm">
                    <span className="text-[5px] text-white font-bold">土</span>
                  </div>
                </div>

                {/* Eyes - more expressive oval eyes */}
                <div className="absolute top-2.5 left-1.5 w-1.5 h-1 bg-gray-900 rounded-full"></div>
                <div className="absolute top-2.5 right-1.5 w-1.5 h-1 bg-gray-900 rounded-full"></div>

                {/* Eyebrows - small brown arcs for expression */}
                <div className="absolute top-2 left-1.5 w-1.5 h-0.5 bg-amber-800 rounded-full transform -rotate-12"></div>
                <div className="absolute top-2 right-1.5 w-1.5 h-0.5 bg-amber-800 rounded-full transform rotate-12"></div>

                {/* Big happy open mouth - more detailed */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2.5 h-2 bg-gradient-to-b from-red-400 to-red-600 rounded-full border border-red-700 shadow-inner"></div>

                {/* Tongue - small pink detail */}
                <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-1 h-0.5 bg-pink-400 rounded-full"></div>

                {/* Rosy cheeks - more prominent and realistic */}
                <div className="absolute top-3 left-0.5 w-1 h-1 bg-gradient-to-br from-red-300 to-red-400 rounded-full opacity-80 shadow-sm"></div>
                <div className="absolute top-3 right-0.5 w-1 h-1 bg-gradient-to-br from-red-300 to-red-400 rounded-full opacity-80 shadow-sm"></div>
              </div>

              {/* Arms raised up - more detailed with proper shading */}
              <div className="absolute top-2 -left-2 w-2 h-2.5 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 rounded-full transform rotate-45 shadow-sm border border-orange-300"></div>
              <div className="absolute top-2 -right-2 w-2 h-2.5 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 rounded-full transform -rotate-45 shadow-sm border border-orange-300"></div>

              {/* Hands - small circular details */}
              <div className="absolute top-1 -left-2.5 w-1.5 h-1.5 bg-gradient-to-br from-orange-50 to-orange-200 rounded-full shadow-sm border border-orange-300"></div>
              <div className="absolute top-1 -right-2.5 w-1.5 h-1.5 bg-gradient-to-br from-orange-50 to-orange-200 rounded-full shadow-sm border border-orange-300"></div>
            </div>

            {/* Name label with better styling */}
            <span className="text-[10px] text-white font-bold mt-1 drop-shadow-md">小福德</span>
          </div>

          {/* Enhanced notification dot with pulsing effect */}
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-pulse border-2 border-white shadow-lg"></div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-transparent rounded-full animate-pulse"></div>
        </Button>

        <div className="absolute -top-12 -right-2 bg-white rounded-lg px-3 py-2 shadow-lg border border-gray-200 animate-bounce">
          <div className="text-xs text-gray-700 font-medium whitespace-nowrap flex items-center gap-1">
            <span>👋</span>
            <span>小福德為您服務！</span>
          </div>
          <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border trust-shadow">
        <div className="grid grid-cols-4 gap-1">
          <Button
            variant={activeTab === "home" ? "default" : "ghost"}
            className="h-16 flex-col gap-1 rounded-none transition-colors professional-text"
            onClick={() => {
              setActiveTab("home")
              setCurrentView("home")
            }}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">首頁</span>
          </Button>

          <Button
            variant={activeTab === "garden" ? "default" : "ghost"}
            className="h-16 flex-col gap-1 rounded-none transition-colors professional-text"
            onClick={handleGardenView}
            id="garden-tab"
          >
            <Leaf className="h-5 w-5" />
            <span className="text-xs">小土苗</span>
          </Button>

          <Button
            variant={activeTab === "analysis" ? "default" : "ghost"}
            className="h-16 flex-col gap-1 rounded-none transition-colors professional-text"
            onClick={handleAnalyticsView}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">智慧分析</span>
          </Button>

          <Button
            variant={activeTab === "profile" ? "default" : "ghost"}
            className="h-16 flex-col gap-1 rounded-none transition-colors professional-text"
            onClick={handleProfileView}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">我的</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}