"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Github, ExternalLink, Play, Pause, Eye } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive admin dashboard for managing online store operations with real-time analytics, inventory management, and customer insights.",
    image: "/nopick.jpg?height=400&width=600",
    tech: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "Node.js", "MongoDB"],
    github: "#",
    demo: "#",
    category: "Web App",
    status: "Live",
    year: "2024",
  },
  {
    id: 2,
    title: "Social Media Platform",
    description:
      "Modern social networking platform with real-time messaging, story features, advanced privacy controls, and AI-powered content recommendations.",
    image: "/nopick.jpg?height=400&width=600",
    tech: ["Next.js", "Socket.io", "MongoDB", "Tailwind CSS", "Redis", "AWS"],
    github: "#",
    demo: "#",
    category: "Full Stack",
    status: "Live",
    year: "2024",
  },
  {
    id: 3,
    title: "Task Management Tool",
    description:
      "Collaborative project management application with Kanban boards, team collaboration, progress tracking, and automated workflow management.",
    image: "/nopick.jpg?height=400&width=600",
    tech: ["React", "Redux Toolkit", "Express.js", "PostgreSQL", "Material-UI"],
    github: "#",
    demo: "#",
    category: "SaaS",
    status: "Beta",
    year: "2023",
  },
  {
    id: 4,
    title: "Weather Forecast App",
    description:
      "Beautiful weather application with detailed forecasts, interactive maps, location-based recommendations, and severe weather alerts.",
    image: "/nopick.jpg?height=400&width=600",
    tech: ["Vue.js", "Weather API", "CSS3", "Chart.js", "PWA", "Service Workers"],
    github: "#",
    demo: "#",
    category: "Mobile App",
    status: "Live",
    year: "2023",
  },
  {
    id: 5,
    title: "Creative Portfolio",
    description:
      "Award-winning developer portfolio with stunning animations, dark mode support, optimized performance, and accessibility features.",
    image: "/nopick.jpg?height=400&width=600",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "Vercel"],
    github: "#",
    demo: "#",
    category: "Portfolio",
    status: "Live",
    year: "2024",
  },
]

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setTimeout(() => setIsAnimating(false), 400)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setTimeout(() => setIsAnimating(false), 400)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 400)
  }

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) nextSlide()
    if (isRightSwipe) prevSlide()
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying])

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getVisibleProjects = () => {
    if (typeof window === "undefined") return [projects[0]]

    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth < 1024

    let visibleCount = 1
    if (!isMobile && isTablet) visibleCount = 2
    if (!isMobile && !isTablet) visibleCount = 3

    const result = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % projects.length
      result.push({ ...projects[index], position: i })
    }
    return result
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Enhanced background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/40 to-transparent dark:from-blue-900/20 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100/40 to-transparent dark:from-purple-900/20 rounded-full translate-y-48 -translate-x-48 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
            <Eye className="w-4 h-4" />
            <span>Featured Work</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Projects
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Showcasing my latest work and creative solutions that bring ideas to life
          </p>
        </div>

        {/* Auto-play Control */}
        <div
          className={`flex justify-center mb-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pause Slideshow</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Resume Slideshow</span>
              </>
            )}
          </button>
        </div>

        {/* Enhanced Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div
            ref={carouselRef}
            className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="flex gap-6 justify-center items-stretch min-h-[600px] px-4">
              {getVisibleProjects().map((project, index) => (
                <div
                  key={project.id}
                  className={`transition-all duration-500 ease-out ${
                    index === 1 && getVisibleProjects().length === 3
                      ? "w-full max-w-2xl scale-100 z-20"
                      : index === 0 && getVisibleProjects().length === 3
                        ? "w-80 scale-95 opacity-80 z-10 hidden md:block"
                        : index === 2 && getVisibleProjects().length === 3
                          ? "w-80 scale-95 opacity-80 z-10 hidden md:block"
                          : "w-full max-w-2xl scale-100 z-20"
                  } ${isAnimating ? "blur-sm" : "blur-0"}`}
                >
                  <div className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col">
                    {/* Project Image */}
                    <div className="relative h-64 lg:h-80 overflow-hidden">
                      <Image
                        src={project.image || "/nopick.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full ${
                            project.status === "Live" ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Category & Year */}
                      <div className="absolute top-4 right-4 text-right">
                        <div className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full mb-2">
                          {project.category}
                        </div>
                        <div className="px-3 py-1 bg-white/90 text-gray-800 text-xs font-medium rounded-full">
                          {project.year}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <a
                          href={project.github}
                          className="p-3 bg-white/95 rounded-full hover:bg-white transition-colors shadow-lg hover:shadow-xl"
                          aria-label="View source code"
                        >
                          <Github className="w-5 h-5 text-gray-800" />
                        </a>
                        <a
                          href={project.demo}
                          className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                          aria-label="View live demo"
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </a>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 lg:p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-1">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 5).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 5 && (
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full font-medium">
                            +{project.tech.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center text-gray-800 dark:text-white hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed z-30 group"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center text-gray-800 dark:text-white hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed z-30 group"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform" />
          </button>

          {/* Enhanced Dots Indicator */}
          <div className="flex justify-center mt-12 gap-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-10 h-3 bg-gradient-to-r from-blue-600 to-purple-600"
                    : "w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-125"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
