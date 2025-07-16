"use client"

import { Button } from "@/components/ui/button"
import { Plane, MapPin, ArrowRight, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export default function SolaraAirlines() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const fleetRef = useRef<HTMLElement>(null)
  const routesRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".observe-me")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Custom Cursor */}
      <div
        className="fixed w-4 h-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${isMenuOpen ? 2 : 1})`,
        }}
      />

      {/* Particle System */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/20 rounded-full animate-particle"
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
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <Plane className="w-6 h-6 text-white transition-transform duration-500 group-hover:rotate-45" />
              </div>
              <span className="text-3xl font-extralight tracking-[0.2em] text-gray-900 transition-all duration-300 group-hover:tracking-[0.3em]">
                SOLARA
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-16">
              {["Home", "Fleet", "Routes", "About"].map((item, index) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-gray-900 transition-all duration-500 text-sm font-light tracking-[0.2em] uppercase relative group overflow-hidden"
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-full block">
                    {item}
                  </span>
                  <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-orange-500">
                    {item}
                  </span>
                </Link>
              ))}
              <Link href="https://discord.gg/TeP3KUekhZ" target="_blank" rel="noopener noreferrer">
                <Button className="bg-transparent border border-gray-200 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-full transition-all duration-700 hover:scale-110 hover:border-gray-900 group">
                  <span className="tracking-[0.1em] text-xs uppercase font-light">Book Flight</span>
                </Button>
              </Link>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden transition-transform duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? "rotate-45 top-3" : ""}`}
                />
                <span
                  className={`absolute top-2 left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute top-4 left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? "-rotate-45 top-3" : ""}`}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-2xl transition-all duration-700 ${isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"}`}
        >
          <div className="container mx-auto px-8 py-12 space-y-8">
            {["Home", "Fleet", "Routes", "About"].map((item, index) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-2xl font-extralight text-gray-900 hover:text-orange-500 transition-all duration-500 tracking-[0.2em] uppercase"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-orange-50/10 to-yellow-50/10 transition-transform duration-1000"
          style={{ transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0005})` }}
        />

        <div className="container mx-auto px-8 lg:px-12 relative z-10">
          <div className="text-center space-y-20">
            <div className="space-y-12">
              <div className="overflow-hidden">
                <h1 className="text-8xl lg:text-[12rem] font-extralight tracking-[0.1em] text-gray-900 leading-none">
                  {["S", "O", "L", "A", "R", "A"].map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-slide-up-stagger opacity-0"
                      style={{
                        animationDelay: `${index * 0.1 + 0.5}s`,
                        color: index === 5 ? "#f97316" : "inherit",
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>

              <div className="overflow-hidden">
                <p className="text-2xl text-gray-400 font-extralight leading-relaxed tracking-[0.1em] uppercase animate-fade-in-delayed opacity-0">
                  Virtual Aviation Excellence
                </p>
              </div>
            </div>

            <div
              className="flex items-center justify-center space-x-12 animate-fade-in-delayed opacity-0"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="group cursor-pointer">
                <div className="flex items-center space-x-3 transition-all duration-500 group-hover:scale-110">
                  <div className="w-2 h-2 bg-orange-500 rounded-full transition-all duration-500 group-hover:scale-150" />
                  <span className="text-sm font-light tracking-[0.2em] text-gray-400 uppercase">OMDB</span>
                </div>
              </div>

              <div className="w-px h-8 bg-gray-200" />

              <div className="group cursor-pointer">
                <div className="flex items-center space-x-3 transition-all duration-500 group-hover:scale-110">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full transition-all duration-500 group-hover:scale-150" />
                  <span className="text-sm font-light tracking-[0.2em] text-gray-400 uppercase">HECA</span>
                </div>
              </div>

              <div className="w-px h-8 bg-gray-200" />

              <div className="group cursor-pointer">
                <div className="flex items-center space-x-3 transition-all duration-500 group-hover:scale-110">
                  <div className="w-2 h-2 bg-orange-400 rounded-full transition-all duration-500 group-hover:scale-150" />
                  <span className="text-sm font-light tracking-[0.2em] text-gray-400 uppercase">OEMA</span>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-delayed opacity-0" style={{ animationDelay: "2s" }}>
              <Link href="https://discord.gg/TeP3KUekhZ" target="_blank" rel="noopener noreferrer">
                <Button className="bg-transparent border border-gray-200 text-gray-900 hover:bg-gray-900 hover:text-white px-12 py-4 rounded-full transition-all duration-700 hover:scale-110 group">
                  <span className="mr-4 tracking-[0.2em] text-xs uppercase font-light">Explore</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        </div>
      </section>

      {/* Fleet Section */}
      <section ref={fleetRef} id="fleet" className="py-40 bg-white relative">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="text-center mb-32 observe-me opacity-0">
            <h2 className="text-7xl lg:text-8xl font-extralight text-gray-900 tracking-[0.1em] mb-8">FLEET</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-24 max-w-7xl mx-auto">
            {/* A320 */}
            <div className="observe-me opacity-0 group cursor-pointer">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 rounded-3xl transition-all duration-700 group-hover:scale-105" />

                <div className="relative p-16 space-y-12">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <h3 className="text-5xl font-extralight text-gray-900 tracking-[0.1em]">A320</h3>
                      <p className="text-gray-400 font-light tracking-[0.1em] uppercase text-sm">CEO & NEO Variants</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                      <Plane className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-45" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Capacity</p>
                      <p className="text-3xl font-extralight text-gray-900">150—180</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Range</p>
                      <p className="text-3xl font-extralight text-gray-900">4,000 NM</p>
                    </div>
                  </div>

                  <div className="h-64 bg-gray-50 rounded-2xl overflow-hidden transition-all duration-700 group-hover:scale-105">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Airbus A320"
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* A330 */}
            <div className="observe-me opacity-0 group cursor-pointer" style={{ animationDelay: "0.2s" }}>
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-3xl transition-all duration-700 group-hover:scale-105" />

                <div className="relative p-16 space-y-12">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <h3 className="text-5xl font-extralight text-gray-900 tracking-[0.1em]">A330</h3>
                      <p className="text-gray-400 font-light tracking-[0.1em] uppercase text-sm">CEO & NEO Variants</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                      <Plane className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-45" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Capacity</p>
                      <p className="text-3xl font-extralight text-gray-900">250—300</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Range</p>
                      <p className="text-3xl font-extralight text-gray-900">8,150 NM</p>
                    </div>
                  </div>

                  <div className="h-64 bg-gray-50 rounded-2xl overflow-hidden transition-all duration-700 group-hover:scale-105">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Airbus A330"
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Routes Section */}
      <section ref={routesRef} id="routes" className="py-40 bg-gray-50/30 relative">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="text-center mb-32 observe-me opacity-0">
            <h2 className="text-7xl lg:text-8xl font-extralight text-gray-900 tracking-[0.1em] mb-8">ROUTES</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Current Routes */}
            <div className="mb-24">
              <div className="text-center mb-16 observe-me opacity-0">
                <h3 className="text-3xl font-extralight text-gray-900 tracking-[0.1em] uppercase mb-4">
                  Current Destinations
                </h3>
                <p className="text-gray-500 font-light">Connecting major hubs across the region</p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    code: "OMDB",
                    city: "Dubai",
                    country: "United Arab Emirates",
                    status: "Hub",
                  },
                  {
                    code: "HECA",
                    city: "Cairo",
                    country: "Egypt",
                    status: "Active",
                  },
                  {
                    code: "OEMA",
                    city: "Medina",
                    country: "Saudi Arabia",
                    status: "Active",
                  },
                ].map((route, index) => (
                  <div
                    key={route.code}
                    className="text-center space-y-6 group observe-me opacity-0"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                        <Globe className="w-12 h-12 text-white" />
                      </div>
                      {route.status === "Hub" && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h4 className="text-2xl font-extralight text-gray-900 tracking-[0.1em]">{route.code}</h4>
                        <p className="text-lg font-light text-gray-600">{route.city}</p>
                        <p className="text-sm text-gray-400 uppercase tracking-[0.1em]">{route.country}</p>
                      </div>
                      <div className="inline-block">
                        <span
                          className={`px-3 py-1 rounded-full text-xs uppercase tracking-[0.1em] font-light ${
                            route.status === "Hub" ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"
                          }`}
                        >
                          {route.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon */}
            <div className="text-center observe-me opacity-0" style={{ animationDelay: "0.6s" }}>
              <div className="space-y-8">
                <h3 className="text-3xl font-extralight text-gray-900 tracking-[0.1em] uppercase">Coming Soon</h3>
                <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                  Expanding our network to connect more destinations across the Middle East and beyond
                </p>

                <div className="flex items-center justify-center space-x-8 pt-8">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 group cursor-pointer"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center transition-all duration-300 group-hover:from-orange-500 group-hover:to-yellow-500">
                        <Globe className="w-4 h-4 text-white opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="https://discord.gg/TeP3KUekhZ" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-transparent border border-gray-200 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-full transition-all duration-700 hover:scale-110 group mt-8">
                    <span className="mr-2 tracking-[0.1em] text-xs uppercase font-light">Stay Updated</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-40 bg-white relative">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="max-w-6xl mx-auto text-center space-y-24">
            <div className="space-y-12 observe-me opacity-0">
              <h2 className="text-7xl lg:text-8xl font-extralight text-gray-900 tracking-[0.1em]">ABOUT</h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
            </div>

            <div className="space-y-20">
              <p className="text-3xl lg:text-4xl font-extralight text-gray-600 leading-relaxed max-w-4xl mx-auto observe-me opacity-0">
                Based at Dubai International Airport, Solara Airlines represents the pinnacle of virtual aviation
                excellence, connecting the Middle East and beyond.
              </p>

              <div className="grid md:grid-cols-3 gap-20 pt-20">
                {[
                  {
                    icon: MapPin,
                    title: "Strategic Network",
                    desc: "Connecting OMDB, HECA, and OEMA with expanding routes across the region",
                  },
                  {
                    icon: Plane,
                    title: "Modern Fleet",
                    desc: "All-Airbus fleet ensuring consistency, reliability, and excellence",
                  },
                  {
                    icon: Globe,
                    title: "Growing Presence",
                    desc: "Expanding our network with new destinations coming soon",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center space-y-8 group observe-me opacity-0"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-extralight text-gray-900 tracking-[0.1em] uppercase">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 font-light leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-gray-50/30 relative overflow-hidden">
        <div className="container mx-auto px-8 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto space-y-16 observe-me opacity-0">
            <h2 className="text-7xl lg:text-8xl font-extralight text-gray-900 tracking-[0.1em] leading-tight">
              READY TO FLY?
            </h2>

            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link href="https://discord.gg/TeP3KUekhZ" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gray-900 hover:bg-orange-500 text-white px-12 py-4 rounded-full transition-all duration-700 hover:scale-110 group">
                  <span className="mr-4 tracking-[0.2em] text-xs uppercase font-light">Book Flight</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                </Button>
              </Link>
              <Link href="/join-crew">
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-900 hover:bg-gray-900 hover:text-white px-12 py-4 rounded-full transition-all duration-700 hover:scale-110 bg-transparent"
                >
                  <span className="tracking-[0.2em] text-xs uppercase font-light">Join Crew</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-gray-900 text-white relative">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-extralight tracking-[0.2em]">SOLARA</span>
            </div>

            <div className="flex items-center space-x-12 text-gray-400">
              <span className="text-sm font-light tracking-[0.1em] uppercase">© 2025 Solara Airlines</span>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full" />
                  <span className="text-sm font-light tracking-[0.1em] uppercase">OMDB</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-yellow-500 rounded-full" />
                  <span className="text-sm font-light tracking-[0.1em] uppercase">HECA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-orange-400 rounded-full" />
                  <span className="text-sm font-light tracking-[0.1em] uppercase">OEMA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
