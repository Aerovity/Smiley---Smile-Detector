import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Progress } from "@/components/ui/progress"

export default function ProcessingPage() {
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
            Our AI is analyzing facial expressions in your video to detect genuine vs. fake smiles
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Processing...</span>
              <span>45%</span>
            </div>
            <Progress value={45} className="h-2" />
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
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
                ⟳
              </div>
              <div>
                <p className="font-medium">Facial recognition in progress</p>
                <p className="text-sm text-gray-500">Identifying and tracking faces</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">⋯</div>
              <div>
                <p className="font-medium text-gray-400">Smile analysis</p>
                <p className="text-sm text-gray-500">Analyzing micro-expressions</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">⋯</div>
              <div>
                <p className="font-medium text-gray-400">Generating results</p>
                <p className="text-sm text-gray-500">Creating your detailed report</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-gray-50 p-4 text-center text-sm text-gray-500">
            This process typically takes 3-5 minutes depending on video length and complexity
          </div>
        </div>
      </div>
    </div>
  )
}

