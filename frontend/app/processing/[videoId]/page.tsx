"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Progress } from "@/components/ui/progress"

interface ProcessingStatus {
  status: "queued" | "processing" | "completed" | "error" | "not_found"
  progress: number
  filename?: string
  error?: string
  output_path?: string
}

export default function ProcessingPage() {
  const params = useParams()
  const router = useRouter()
  const videoId = params.videoId as string

  const [status, setStatus] = useState<ProcessingStatus>({
    status: "queued",
    progress: 0,
  })
  const [filename, setFilename] = useState<string>("")

  useEffect(() => {
    if (!videoId) return

    // Initial status check
    fetchStatus()

    // Set up polling for status updates
    const interval = setInterval(fetchStatus, 2000)

    return () => clearInterval(interval)
  }, [videoId])

  const fetchStatus = async () => {
    try {
      const response = await fetch(`/status/${videoId}`)
      const data = await response.json()

      setStatus(data)
      if (data.filename) {
        setFilename(data.filename)
      }

      // Redirect to results page when processing is complete
      if (data.status === "completed") {
        router.push(`/result/${videoId}`)
      }
    } catch (error) {
      console.error("Error fetching status:", error)
    }
  }

  return (
    <div className="container max-w-4xl py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Processing Your Video</h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Our AI is analyzing facial expressions in {filename || "your video"} to detect genuine vs. fake smiles
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium">
                {status.status === "queued"
                  ? "Queued..."
                  : status.status === "processing"
                    ? "Processing..."
                    : status.status === "completed"
                      ? "Completed"
                      : status.status === "error"
                        ? "Error"
                        : "Loading..."}
              </span>
              <span>{status.progress}%</span>
            </div>
            <Progress value={status.progress} className="h-2" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-500">
                ✓
              </div>
              <div>
                <p className="font-medium">Video uploaded successfully</p>
                <p className="text-sm text-gray-500">Your video has been received</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  status.status === "queued" ? "bg-gray-100 text-gray-400" : "bg-yellow-100 text-yellow-500"
                }`}
              >
                {status.status === "queued" ? "⋯" : "⟳"}
              </div>
              <div>
                <p className={`font-medium ${status.status === "queued" ? "text-gray-400" : ""}`}>
                  Facial recognition in progress
                </p>
                <p className="text-sm text-gray-500">Identifying and tracking faces</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  status.progress < 50 ? "bg-gray-100 text-gray-400" : "bg-yellow-100 text-yellow-500"
                }`}
              >
                {status.progress < 50 ? "⋯" : "⟳"}
              </div>
              <div>
                <p className={`font-medium ${status.progress < 50 ? "text-gray-400" : ""}`}>Smile analysis</p>
                <p className="text-sm text-gray-500">Analyzing micro-expressions</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  status.progress < 90 ? "bg-gray-100 text-gray-400" : "bg-yellow-100 text-yellow-500"
                }`}
              >
                {status.progress < 90 ? "⋯" : "⟳"}
              </div>
              <div>
                <p className={`font-medium ${status.progress < 90 ? "text-gray-400" : ""}`}>Generating results</p>
                <p className="text-sm text-gray-500">Creating your detailed report</p>
              </div>
            </div>
          </div>

          {status.status === "error" && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-500">
              Error processing video: {status.error || "Unknown error occurred"}
            </div>
          )}

          <div className="rounded-lg border bg-gray-50 p-4 text-center text-sm text-gray-500">
            This process typically takes 3-5 minutes depending on video length and complexity
          </div>
        </div>
      </div>
    </div>
  )
}

