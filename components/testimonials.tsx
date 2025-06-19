"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah",
    role: "Product Manager",
    company: "TechCorp Inc.",
    image: "/nopick.jpg?height=100&width=100",
    rating: 5,
    quote:
      "Working with Dacchu was an absolute pleasure. He delivered a stunning website that exceeded our expectations and helped increase our conversion rate by 30%. His attention to detail is remarkable.",
  },
  {
    id: 2,
    name: "Michael",
    role: "Startup Founder",
    company: "InnovateLab",
    image: "/nopick.jpg?height=100&width=100",
    rating: 5,
    quote:
      "Dacchu transformed our vision into a beautiful, functional website. The process was smooth, communication was excellent, and the results speak for themselves. Highly recommended!",
  },
  {
    id: 3,
    name: "Emily",
    role: "Marketing Director",
    company: "Digital Solutions",
    image: "/nopick.jpg?height=100&width=100",
    rating: 5,
    quote:
      "The developer's expertise in creating responsive, user-friendly interfaces has been invaluable. Our new website has received countless compliments from clients and partners.",
  },
  {
    id: 4,
    name: "David",
    role: "E-commerce Owner",
    company: "StyleHub",
    image: "/nopick.jpg?height=100&width=100",
    rating: 5,
    quote:
      "The redesign of our online store was handled with professionalism and creativity. Dacchu delivered a product that significantly improved our user experience and sales.",
  },
  {
    id: 5,
    name: "Lisa ",
    role: "Creative Director",
    company: "Design Studio",
    image: "/nopick.jpg?height=100&width=100",
    rating: 5,
    quote:
      "Dacchu's ability to bring creative designs to life with clean, efficient code is remarkable. He understands both technical and aesthetic aspects perfectly.",
  },
  {
    id: 6,
    name: "Alex ",
    role: "CTO",
    company: "StartupXYZ",
    image: "/nopick.jpg?height=100&width=100",
    rating: 5,
    quote:
      "Exceptional work quality and professional approach. Dacchu delivered our project on time and within budget, with code that's both beautiful and maintainable.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && hoveredIndex === null) {
        nextSlide()
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [currentIndex, isAnimating, hoveredIndex])

  // Intersection Observer for scroll animations
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

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const getThreeTestimonials = () => {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
    const nextIndex = (currentIndex + 1) % testimonials.length

    return [
      { ...testimonials[prevIndex], position: 0, index: prevIndex }, // Left
      { ...testimonials[currentIndex], position: 1, index: currentIndex }, // Center
      { ...testimonials[nextIndex], position: 2, index: nextIndex }, // Right
    ]
  }

  const getCardTransform = (position: number, cardIndex: number) => {
    const isHovered = hoveredIndex === cardIndex

    if (hoveredIndex !== null) {
      // When any card is hovered
      if (isHovered) {
        // Hovered card comes to front center
        return {
          transform: "translateX(0) translateY(-10px) scale(1.08) rotateY(0deg)",
          zIndex: 50,
          opacity: 1,
        }
      } else {
        // Non-hovered cards go to background
        const offset = position < hoveredIndex ? -300 : 300
        return {
          transform: `translateX(${offset}px) translateY(20px) scale(0.75) rotateY(${position < hoveredIndex ? 20 : -20}deg)`,
          zIndex: 5,
          opacity: 0.4,
        }
      }
    }

    // Default positioning when no hover
    switch (position) {
      case 0: // Left
        return {
          transform: "translateX(-180px) translateY(0) scale(0.9) rotateY(10deg)",
          zIndex: 15,
          opacity: 0.8,
        }
      case 1: // Center
        return {
          transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)",
          zIndex: 30,
          opacity: 1,
        }
      case 2: // Right
        return {
          transform: "translateX(180px) translateY(0) scale(0.9) rotateY(-10deg)",
          zIndex: 15,
          opacity: 0.8,
        }
      default:
        return {
          transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)",
          zIndex: 20,
          opacity: 1,
        }
    }
  }

  const getCardStyling = (position: number, cardIndex: number) => {
    const isHovered = hoveredIndex === cardIndex
    const isCenter = position === 1
    const isFocused = isHovered || (hoveredIndex === null && isCenter)

    return {
      background: isFocused ? "bg-white/95 dark:bg-gray-900/95" : "bg-white/80 dark:bg-gray-900/80",
      border: isFocused ? "border-blue-300/60 dark:border-blue-600/60" : "border-white/30 dark:border-gray-700/40",
      shadow: isFocused ? "shadow-2xl shadow-blue-500/20" : "shadow-xl",
      hasGradient: isFocused,
      textSize: isFocused ? "text-base lg:text-lg" : "text-sm lg:text-base",
      avatarSize: isFocused ? "w-14 h-14" : "w-12 h-12",
    }
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-16 md:py-24 bg-white dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent dark:from-blue-900/10 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100/20 to-transparent dark:from-purple-900/10 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
            <Quote className="w-4 h-4" />
            <span>Client Reviews</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6">
            What Clients{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Say
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Don't just take my word for it - hear from the amazing clients I've had the pleasure to work with
          </p>

          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ perspective: "1500px" }}
          >
            <div
              className="relative h-[580px] flex items-center justify-center px-12"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {getThreeTestimonials().map((testimonial, cardIndex) => {
                const transform = getCardTransform(testimonial.position, cardIndex)
                const styling = getCardStyling(testimonial.position, cardIndex)

                return (
                  <div
                    key={`${testimonial.id}-${testimonial.position}`}
                    className="absolute w-full max-w-sm cursor-pointer"
                    style={{
                      ...transform,
                      transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                    onMouseEnter={() => setHoveredIndex(cardIndex)}
                    onClick={() => goToSlide(testimonial.index)}
                  >
                    {/* Card */}
                    <div
                      className={`relative backdrop-blur-xl rounded-3xl p-6 lg:p-8 border transition-all duration-500 ${styling.background} ${styling.border} ${styling.shadow}`}
                    >
                      {/* Gradient overlay for focused cards */}
                      {styling.hasGradient && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl"></div>
                      )}

                      <div className="relative z-10">
                        {/* Quote Icon and Rating */}
                        <div className="flex justify-between items-start mb-6">
                          <div
                            className={`p-3 rounded-2xl transition-all duration-300 ${
                              styling.hasGradient
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg scale-110"
                                : "bg-gradient-to-r from-gray-500 to-gray-600"
                            }`}
                          >
                            <Quote className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                          </div>
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 fill-yellow-400 text-yellow-400 transition-transform duration-300 ${
                                  styling.hasGradient ? "scale-110" : ""
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Quote Text */}
                        <p
                          className={`mb-6 lg:mb-8 leading-relaxed italic transition-all duration-300 ${
                            styling.hasGradient
                              ? "text-gray-700 dark:text-gray-300 text-base lg:text-lg"
                              : "text-gray-600 dark:text-gray-400 text-sm lg:text-base"
                          }`}
                        >
                          "{testimonial.quote}"
                        </p>

                        {/* Client Info */}
                        <div className="flex items-center">
                          <div
                            className={`rounded-full overflow-hidden mr-4 ring-2 transition-all duration-300 ${
                              styling.hasGradient
                                ? `${styling.avatarSize} ring-blue-600/50 dark:ring-blue-400/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900`
                                : "w-12 h-12 ring-gray-300/40 dark:ring-gray-600/40"
                            }`}
                          >
                            <Image
                              src={testimonial.image || "/nopick.jpg"}
                              alt={testimonial.name}
                              width={styling.hasGradient ? 56 : 48}
                              height={styling.hasGradient ? 56 : 48}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <h4
                              className={`font-bold transition-all duration-300 ${
                                styling.hasGradient
                                  ? "text-gray-800 dark:text-white text-lg lg:text-xl"
                                  : "text-gray-700 dark:text-gray-300 text-base lg:text-lg"
                              }`}
                            >
                              {testimonial.name}
                            </h4>
                            <p
                              className={`font-medium transition-all duration-300 ${
                                styling.hasGradient
                                  ? "text-gray-600 dark:text-gray-400 text-base"
                                  : "text-gray-500 dark:text-gray-500 text-sm"
                              }`}
                            >
                              {testimonial.role}
                            </p>
                            <p
                              className={`font-semibold transition-all duration-300 ${
                                styling.hasGradient
                                  ? "text-blue-600 dark:text-blue-400 text-base"
                                  : "text-blue-500 dark:text-blue-500 text-sm"
                              }`}
                            >
                              {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-800 dark:text-white hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed z-50 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-800 dark:text-white hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed z-50 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-10 h-3 bg-gradient-to-r from-blue-600 to-purple-600"
                    : "w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-125"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
