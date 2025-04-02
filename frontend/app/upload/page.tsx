"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        // Redirect to processing page would happen here
        setTimeout(() => {
          window.location.href = "/processing"
        }, 500)
      }
    }, 200)
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
          <h1 className="text-3xl font-bold">Upload Your Video</h1>
          <p className="text-gray-500 mt-2">Upload a video to analyze facial expressions and detect fake smiles</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className={`rounded-lg border-2 border-dashed p-8 transition-colors ${
              selectedFile ? "border-green-500 bg-green-50" : "border-gray-200"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {!selectedFile ? (
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                  <Upload className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">Drag and drop your video</h3>
                  <p className="text-sm text-gray-500">Or click to browse your files</p>
                </div>
                <input type="file" id="video-upload" accept="video/*" className="hidden" onChange={handleFileChange} />
                <label
                  htmlFor="video-upload"
                  className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-yellow-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-yellow-500 disabled:pointer-events-none disabled:opacity-50"
                >
                  Select Video
                </label>
                <p className="text-xs text-gray-500">Supported formats: MP4, MOV, AVI (max 100MB)</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <Upload className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveFile}
                    className="h-8 w-8 rounded-full"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Video Information</h3>
              <p className="text-sm text-gray-500">Add optional details about your video</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title (optional)
                </label>
                <input
                  id="title"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                  placeholder="Enter a title for your video"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description (optional)
                </label>
                <input
                  id="description"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                  placeholder="Add a brief description"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600"
            size="lg"
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Uploading..." : "Analyze Video"}
          </Button>
        </form>
      </div>
    </div>
  )
}

