"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plane, ArrowLeft, Send, User, Globe, Clock } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { submitCrewApplication } from "./actions"
import { useActionState } from "react"

export default function JoinCrewPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [state, action, isPending] = useActionState(submitCrewApplication, null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Custom Cursor */}
      <div
        className="fixed w-4 h-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
      />

      {/* Particle System */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/10 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/60 backdrop-blur-2xl z-40 transition-all duration-500">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between h-24">
            <Link href="/" className="flex items-center space-x-4 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <Plane className="w-6 h-6 text-white transition-transform duration-500 group-hover:rotate-45" />
              </div>
              <span className="text-3xl font-extralight tracking-[0.2em] text-gray-900 transition-all duration-300 group-hover:tracking-[0.3em]">
                SOLARA
              </span>
            </Link>

            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-gray-900 transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-sm font-light tracking-[0.1em] uppercase">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-extralight tracking-[0.1em] text-gray-900">JOIN OUR CREW</h1>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
              </div>
              <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                Become part of Solara Airlines' elite team and help us deliver exceptional virtual aviation experiences
              </p>
            </div>

            {/* Application Form */}
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
              <CardContent className="p-12 lg:p-16">
                {state?.success ? (
                  <div className="text-center space-y-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                      <Send className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-3xl font-extralight text-gray-900 tracking-[0.1em]">APPLICATION SUBMITTED</h2>
                      <p className="text-gray-600 font-light leading-relaxed max-w-lg mx-auto">
                        Thank you for your interest in joining Solara Airlines. We'll review your application and get
                        back to you soon.
                      </p>
                    </div>
                    <Link href="/">
                      <Button className="bg-gray-900 hover:bg-orange-500 text-white px-8 py-3 rounded-full transition-all duration-500 hover:scale-105">
                        <span className="tracking-[0.1em] text-xs uppercase font-light">Back to Home</span>
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <form action={action} className="space-y-12">
                    {/* Personal Information */}
                    <div className="space-y-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <User className="w-5 h-5 text-orange-500" />
                        <h2 className="text-2xl font-extralight text-gray-900 tracking-[0.1em] uppercase">
                          Personal Information
                        </h2>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-light">
                            Full Name *
                          </label>
                          <Input
                            name="fullName"
                            required
                            className="border-gray-200 focus:border-orange-500 bg-transparent h-12 text-gray-900 font-light"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-light">
                            Discord Username *
                          </label>
                          <Input
                            name="discordUsername"
                            required
                            className="border-gray-200 focus:border-orange-500 bg-transparent h-12 text-gray-900 font-light"
                            placeholder="username#1234"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-light">
                            Email Address *
                          </label>
                          <Input
                            name="email"
                            type="email"
                            required
                            className="border-gray-200 focus:border-orange-500 bg-transparent h-12 text-gray-900 font-light"
                            placeholder="your.email@example.com"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-light">Age *</label>
                          <Input
                            name="age"
                            type="number"
                            min="13"
                            required
                            className="border-gray-200 focus:border-orange-500 bg-transparent h-12 text-gray-900 font-light"
                            placeholder="18"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Aviation Experience */}
                    <div className="space-y-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <Plane className="w-5 h-5 text-orange-500" />
                        <h2 className="text-2xl font-extralight text-gray-900 tracking-[0.1em] uppercase">
                          Aviation Experience
                        </h2>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-light">
                            Position Applying For *
                          </label>
                          <Select name="position" required>
                            <SelectTrigger className="border-gray-200 focus:border-orange-500 bg-transparent h-12 text-gray-900 font-light">
                              <SelectValue placeholder="Select a position" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pilot">Pilot</SelectItem>
                              <SelectItem value="co-pilot">Co-Pilot</SelectItem>
                              <SelectItem value="cabin-crew">Cabin Crew</SelectItem>
                              <SelectItem value="ground-crew">Ground Crew</SelectItem>
                              <SelectItem value="atc">Air Traffic Control</SelectItem>
                              <SelectItem value="management">Management</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-light">
                            Flight Simulator Experience *
                          </label>
                          <Select name="experience" required>
                            <SelectTrigger className="border-gray-200 focus:border-orange-500 bg-transparent h-12 text-gray-900 font-light">
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner (0-6 months)</SelectItem>
                              <SelectItem value="intermediate">Intermediate (6 months - 2 years)</SelectItem>
                              <SelectItem value="advanced">Advanced (2+ years)</SelectItem>
                              <SelectItem value="expert">Expert (5+ years)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-light">
                          Previous Virtual Airline Experience
                        </label>
                        <Textarea
                          name="previousExperience"
                          className="border-gray-200 focus:border-orange-500 bg-transparent min-h-24 text-gray-900 font-light resize-none"
                          placeholder="Tell us about your experience with other virtual airlines (optional)"
                        />
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="space-y-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <h2 className="text-2xl font-extralight text-gray-900 tracking-[0.1em] uppercase">
                          Availability
                        </h2>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-light">
                            Time Zone *
                          </label>
                          <Input
                            name="timezone"
                            required
                            className="border-gray-200 focus:border-orange-500 bg-transparent h-12 text-gray-900 font-light"
                            placeholder="e.g., UTC+4, EST, GMT"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-light">
                            Hours Available Per Week *
                          </label>
                          <Select name="availability" required>
                            <SelectTrigger className="border-gray-200 focus:border-orange-500 bg-transparent h-12 text-gray-900 font-light">
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-5">1-5 hours</SelectItem>
                              <SelectItem value="5-10">5-10 hours</SelectItem>
                              <SelectItem value="10-20">10-20 hours</SelectItem>
                              <SelectItem value="20+">20+ hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <Globe className="w-5 h-5 text-orange-500" />
                        <h2 className="text-2xl font-extralight text-gray-900 tracking-[0.1em] uppercase">
                          Additional Information
                        </h2>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-light">
                          Why do you want to join Solara Airlines? *
                        </label>
                        <Textarea
                          name="motivation"
                          required
                          className="border-gray-200 focus:border-orange-500 bg-transparent min-h-32 text-gray-900 font-light resize-none"
                          placeholder="Tell us what motivates you to join our team and what you can bring to Solara Airlines"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-light">
                          Additional Comments
                        </label>
                        <Textarea
                          name="additionalComments"
                          className="border-gray-200 focus:border-orange-500 bg-transparent min-h-24 text-gray-900 font-light resize-none"
                          placeholder="Any additional information you'd like to share (optional)"
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {state?.error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm font-light">{state.error}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="text-center pt-8">
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-gray-900 hover:bg-orange-500 text-white px-12 py-4 rounded-full transition-all duration-700 hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isPending ? (
                          <span className="tracking-[0.1em] text-xs uppercase font-light">Submitting...</span>
                        ) : (
                          <>
                            <span className="mr-3 tracking-[0.1em] text-xs uppercase font-light">
                              Submit Application
                            </span>
                            <Send className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
