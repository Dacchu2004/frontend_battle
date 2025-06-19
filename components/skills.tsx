"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Palette, Server, Smartphone, Globe, Database, Zap, Users, Clock, Star, TrendingUp } from "lucide-react"

const skills = [
  {
    name: "Frontend Development",
    icon: <Code className="h-6 w-6" />,
    experience: "3+ years",
    level: 95,
    color: "from-blue-500 to-cyan-500",
    description: "React, Next.js, TypeScript, Vue.js",
    projects: 25,
  },
  {
    name: "UI/UX Design",
    icon: <Palette className="h-6 w-6" />,
    experience: "2+ years",
    level: 88,
    color: "from-purple-500 to-pink-500",
    description: "Figma, Adobe XD, Prototyping",
    projects: 18,
  },
  {
    name: "Backend Development",
    icon: <Server className="h-6 w-6" />,
    experience: "2+ years",
    level: 82,
    color: "from-green-500 to-emerald-500",
    description: "Node.js, Express, Python, APIs",
    projects: 15,
  },
  {
    name: "Mobile Development",
    icon: <Smartphone className="h-6 w-6" />,
    experience: "1+ year",
    level: 75,
    color: "from-orange-500 to-red-500",
    description: "React Native, Flutter, PWA",
    projects: 8,
  },
  {
    name: "Web Technologies",
    icon: <Globe className="h-6 w-6" />,
    experience: "4+ years",
    level: 98,
    color: "from-indigo-500 to-blue-500",
    description: "HTML5, CSS3, JavaScript, SASS",
    projects: 35,
  },
  {
    name: "Database Management",
    icon: <Database className="h-6 w-6" />,
    experience: "2+ years",
    level: 85,
    color: "from-teal-500 to-cyan-500",
    description: "MongoDB, PostgreSQL, Redis",
    projects: 12,
  },
]

const stats = [
  {
    value: 50,
    label: "Projects Completed",
    icon: <Zap className="h-5 w-5" />,
    color: "from-blue-500 to-blue-600",
  },
  {
    value: 25,
    label: "Happy Clients",
    icon: <Users className="h-5 w-5" />,
    color: "from-green-500 to-green-600",
  },
  {
    value: 3,
    label: "Years Experience",
    icon: <Clock className="h-5 w-5" />,
    color: "from-purple-500 to-purple-600",
  },
  {
    value: 15,
    label: "Technologies",
    icon: <Star className="h-5 w-5" />,
    color: "from-orange-500 to-orange-600",
  },
]

export default function Skills() {
  const [animatedStats, setAnimatedStats] = useState<{ [key: number]: number }>({})
  const [skillsAnimated, setSkillsAnimated] = useState<{ [key: number]: boolean }>({})
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true)
      }
    }, observerOptions)

    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        stats.forEach((stat, index) => {
          let current = 0
          const increment = stat.value / 50
          const timer = setInterval(() => {
            current += increment
            if (current >= stat.value) {
              current = stat.value
              clearInterval(timer)
            }
            setAnimatedStats((prev) => ({ ...prev, [index]: Math.floor(current) }))
          }, 40)
        })
      }
    }, observerOptions)

    const skillsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        skills.forEach((_, index) => {
          setTimeout(() => {
            setSkillsAnimated((prev) => ({ ...prev, [index]: true }))
          }, index * 150)
        })
      }
    }, observerOptions)

    if (sectionRef.current) sectionObserver.observe(sectionRef.current)
    if (statsRef.current) statsObserver.observe(statsRef.current)
    if (skillsRef.current) skillsObserver.observe(skillsRef.current)

    return () => {
      sectionObserver.disconnect()
      statsObserver.disconnect()
      skillsObserver.disconnect()
    }
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-16 md:py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-100/50 to-transparent dark:from-blue-900/20 rounded-full -translate-x-36 -translate-y-36 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100/50 to-transparent dark:from-purple-900/20 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-100/30 to-transparent dark:from-pink-900/10 rounded-full -translate-x-32 -translate-y-32 blur-2xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Skills & Expertise</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Skills
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Expertise across the full spectrum of modern web development, from frontend magic to backend architecture
          </p>

          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* Enhanced Skills Grid */}
        <div ref={skillsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`group relative bg-white dark:bg-gray-900 rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden transform ${
                skillsAnimated[index] ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              } hover:-translate-y-3 hover:scale-105`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Gradient border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-2xl lg:rounded-3xl`}>
                <div className="absolute inset-[2px] bg-white dark:bg-gray-900 rounded-2xl lg:rounded-3xl"></div>
              </div>

              <div className="relative p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-gradient-to-r ${skill.color} text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {skill.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">{skill.level}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{skill.projects} projects</div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{skill.experience}</p>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{skill.description}</p>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Proficiency</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1500 ease-out`}
                        style={{
                          width: skillsAnimated[index] ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 150 + 500}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <div ref={statsRef} className="relative">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl lg:rounded-[2rem] p-[2px] shadow-2xl">
            <div className="bg-white dark:bg-gray-900 rounded-3xl lg:rounded-[2rem] p-8 lg:p-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                  Achievement{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Statistics
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Numbers that speak for themselves</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${stat.color} rounded-2xl lg:rounded-3xl text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      {stat.icon}
                    </div>
                    <div className="text-3xl lg:text-5xl font-black text-gray-800 dark:text-white mb-2">
                      {animatedStats[index] || 0}
                      {stat.label.includes("Projects") || stat.label.includes("Technologies") ? "+" : ""}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium text-sm lg:text-base">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
