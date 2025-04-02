"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Download, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ProcessingResult {
  status: string
  progress: number
  filename?: string
  output_path?: string
}

export default function ResultPage() {
  const params = useParams()
  const videoId = params.videoId as string

  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!videoId) return

    const fetchResult = async () => {
      try {
        const response = await fetch(`/status/${videoId}`)
        const data = await response.json()

        if (data.status === "completed") {
          setResult(data)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching result:", error)
        setLoading(false)
      }
    }

    fetchResult()
  }, [videoId])

  if (loading) {
    return (
      <div className="container max-w-4xl py-12 text-center">
        <p>Loading results...</p>
      </div>
    )
  }

  if (!result || result.status !== "completed") {
    return (
      <div className="container max-w-4xl py-12 text-center">
        <p>
          Results not available.{" "}
          <Link href="/" className="text-yellow-500 hover:underline">
            Return to home
          </Link>
        </p>
      </div>
    )
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

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Analysis Results</h1>
          <p className="text-gray-500 mt-2">Here's what we found in {result.filename || "your video"}</p>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <div className="aspect-video w-full bg-black">
            <video
              controls
              className="w-full h-full"
              src={`/video/${videoId}`}
              poster="/placeholder.svg?height=720&width=1280"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-4 bg-white flex justify-between items-center">
            <div>
              <h3 className="font-medium">{result.filename || "Processed Video"}</h3>
              <p className="text-sm text-gray-500">Processed with Smiley AI</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6 space-y-4">
            <h3 className="text-xl font-medium">Analysis Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Genuine Smiles</span>
                <span className="font-medium text-green-500">68%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "68%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Fake Smiles</span>
                <span className="font-medium text-yellow-500">32%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: "32%" }}></div>
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-500">
                  Based on our analysis, this video contains predominantly genuine smiles, with some instances of forced
                  expressions.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-6 space-y-4">
            <h3 className="text-xl font-medium">Timeline</h3>
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                      i % 3 === 0 ? "bg-yellow-100 text-yellow-500" : "bg-green-100 text-green-500"
                    }`}
                  >
                    {i % 3 === 0 ? "F" : "G"}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {i % 3 === 0 ? "Fake smile detected" : "Genuine smile detected"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {`${Math.floor(i * 12.5)}s - ${Math.floor((i + 1) * 12.5)}s`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6 space-y-4">
          <h3 className="text-xl font-medium">Detailed Analysis</h3>
          <p className="text-sm text-gray-500">
            Our AI analyzed facial micro-expressions, muscle movements, and timing patterns to determine the
            authenticity of smiles in this video. Genuine smiles (also known as Duchenne smiles) involve both the mouth
            and the eyes, while fake smiles typically only engage the mouth muscles.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded border p-4 bg-gray-50">
              <h4 className="font-medium mb-2">Genuine Smile Characteristics</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Engagement of orbicularis oculi (eye) muscles</li>
                <li>• Symmetrical facial movement</li>
                <li>• Gradual onset and offset</li>
                <li>• Natural timing (1-4 seconds)</li>
              </ul>
            </div>
            <div className="rounded border p-4 bg-gray-50">
              <h4 className="font-medium mb-2">Fake Smile Characteristics</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Limited to zygomaticus (mouth) muscles</li>
                <li>• Often asymmetrical</li>
                <li>• Abrupt onset and/or offset</li>
                <li>• Unnatural timing (too brief or prolonged)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

