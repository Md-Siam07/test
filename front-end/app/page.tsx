"use client"
import NavBar from "@/components/navigation/nav-bar"
import PdfShare from "@/components/pdf-sharing/pdf-sharing"
import PlatformPdf from "@/components/platform-pdf/PlatformPdf"
import StatusView from "@/components/platform-pdf/StatusView"
import OmniGPT from "@/components/omnigpt"
import Login from "@/components/Auth/Login"
import Register from "@/components/Auth/Register"

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <NavBar />
      <div className="my-5" />
      <Login />
      <Register />
      <PlatformPdf />
      <StatusView />
    </div>
  )
}
