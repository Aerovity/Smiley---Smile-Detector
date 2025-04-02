import Link from "next/link"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-yellow-500">😊</span> Smiley
          </Link>
          <nav className="ml-auto flex gap-4">
            <Link href="#" className="text-sm font-medium hover:underline">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              How It Works
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid gap-6 py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-[800px] space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Detect Fake Smiles in Videos
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Upload your video and our AI will analyze facial expressions to identify genuine vs. fake smiles.
            </p>
          </div>
          <div className="mx-auto w-full max-w-[600px] space-y-8">
            <form
              action="/upload"
              method="post"
              encType="multipart/form-data"
              className="rounded-lg border border-dashed p-10"
            >
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                  <Upload className="h-10 w-10 text-yellow-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">Upload your video</h3>
                  <p className="text-sm text-gray-500">Drag and drop your video file here, or click to browse</p>
                </div>
                <input
                  type="file"
                  id="video-upload"
                  name="video"
                  accept="video/mp4,video/avi,video/mov,video/wmv,video/mkv"
                  className="hidden"
                />
                <label
                  htmlFor="video-upload"
                  className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-yellow-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-yellow-500 disabled:pointer-events-none disabled:opacity-50"
                >
                  Select Video
                </label>
                <p className="text-xs text-gray-500">Supported formats: MP4, MOV, AVI, WMV, MKV (max 100MB)</p>
                <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600" size="lg">
                  Analyze Video
                </Button>
              </div>
            </form>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                <div className="h-px flex-1 bg-gray-200"></div>
                <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                <div className="h-px flex-1 bg-gray-200"></div>
                <div className="h-4 w-4 rounded-full bg-gray-200"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Upload</span>
                <span>Processing</span>
                <span>Results</span>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How Smiley Works</h2>
              <p className="text-gray-500 md:text-xl/relaxed">
                Our advanced AI technology analyzes facial micro-expressions to determine if a smile is genuine or
                forced.
              </p>
              <ul className="grid gap-4">
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Upload your video</h3>
                    <p className="text-sm text-gray-500">Simply upload any video containing facial expressions</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">AI Processing</h3>
                    <p className="text-sm text-gray-500">Our algorithm analyzes each frame for facial cues</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Get Results</h3>
                    <p className="text-sm text-gray-500">
                      Receive a detailed analysis with timestamps of genuine vs. fake smiles
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border bg-white p-8 shadow-sm">
              <div className="aspect-video w-full rounded-md bg-gray-100"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-100"></div>
                <div className="h-4 w-1/2 rounded bg-gray-100"></div>
                <div className="h-4 w-5/6 rounded bg-gray-100"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500">© 2025 Smiley. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

