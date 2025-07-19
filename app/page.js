"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Zap,
  BookOpen,
  Trophy,
  Users,
  Star,
  Instagram,
  Calendar,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Cpu,
  Battery,
  CircuitBoard,
} from "lucide-react";
import Link from "next/link";

const Card = ({ className, children, ...props }) => (
  <div className={`bg-white rounded-lg border ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 pb-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`font-semibold ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm ${className}`}>{children}</p>
);

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-orange-600 text-white hover:bg-orange-700",
    outline:
      "border border-orange-200 bg-background hover:bg-orange-50 hover:text-orange-900",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    lg: "h-11 rounded-md px-8",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Avatar = ({ className = "", children }) => (
  <div
    className={`relative flex shrink-0 overflow-hidden rounded-full ${className}`}
  >
    {children}
  </div>
);

const AvatarImage = ({ src, alt = "" }) => (
  <img className="aspect-square h-full w-full" src={src} alt={alt} />
);

const AvatarFallback = ({ children, className = "" }) => (
  <div
    className={`flex h-full w-full items-center justify-center rounded-full bg-orange-100 ${className}`}
  >
    {children}
  </div>
);

export default function Home() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [events, setEvents] = useState([]);

  const bottom_nav = [
    { href: "/verify-certificate", label: "Verify certificates" },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events/home");
        const data = await response.json();
        console.log(data);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // const testimonials = [
  //   initial: { opacity: 0, y: 20 },
  //   animate: { opacity: 1, y: 0 },
  //   transition: { duration: 0.6 },
  // };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Electronics Background */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
        <div className="absolute inset-0 opacity-10">
          <div className="animate-pulse font-mono text-sm whitespace-pre leading-6 text-orange-600">
            {`#include <Arduino.h>\n#include <WiFi.h>\n\nvoid setup() {\n  pinMode(LED_PIN, OUTPUT);\n  WiFi.begin(ssid, password);\n  Serial.begin(115200);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, HIGH);\n  delay(1000);\n  digitalWrite(LED_PIN, LOW);\n  delay(1000);\n}`}
          </div>
        </div>
        <div className="relative z-10 text-center space-y-8 max-w-4xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl">
              <CircuitBoard className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Build Electronics.
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Drive Innovation.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Join an elite community of electronics enthusiasts. Master circuit
            design, build autonomous systems, and shape the future of automotive
            technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/register"}>
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-lg px-8"
              >
                Start Building <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                Explore Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-orange-25">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-all border-orange-100 hover:border-orange-300">
              <CardHeader>
                <Zap className="text-orange-600 w-12 h-12" />
                <CardTitle className="text-2xl font-bold">
                  Circuit Design Challenges
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Master analog and digital circuits
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-600">
                Tackle real-world circuit design problems from basic LED
                circuits to complex automotive control systems. Get instant
                simulation feedback and learn industry best practices.
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all border-orange-100 hover:border-orange-300">
              <CardHeader>
                <BookOpen className="text-red-600 w-12 h-12" />
                <CardTitle className="text-2xl font-bold">
                  Interactive Learning
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Master electronics fundamentals
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-600">
                Access comprehensive tutorials on microcontrollers, power
                electronics, signal processing, and automotive systems with
                hands-on simulation tools.
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all border-orange-100 hover:border-orange-300">
              <CardHeader>
                <Trophy className="text-amber-600 w-12 h-12" />
                <CardTitle className="text-2xl font-bold">
                  Design Competitions
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Showcase your innovations
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-600">
                Compete in monthly design challenges, earn achievement badges,
                and showcase your electronic projects to leading automotive and
                tech companies.
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all border-orange-100 hover:border-orange-300">
              <CardHeader>
                <Users className="text-orange-600 w-12 h-12" />
                <CardTitle className="text-2xl font-bold">
                  Expert Mentorship
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Learn from industry professionals
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-600">
                Connect with mentors from Tesla, BMW, Intel, and other leading
                companies. Get design reviews and personalized guidance for your
                electronics career.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-orange-25 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-gray-600">
              Join our community events and level up your skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {events.map((event) => (
              <Card
                key={event.id}
                className=" shadow-lg hover:shadow-xl transition-all border-blue-100 hover:border-blue-300 overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">
                      {formatDate(event.date)}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {event.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href={"/all-events"}>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                View All Events <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-6">
            <div className="flex gap-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Battery className="w-8 h-8" />
              </div>
              <div className="p-3 bg-white/20 rounded-lg">
                <CircuitBoard className="w-8 h-8" />
              </div>
              <div className="p-3 bg-white/20 rounded-lg">
                <Cpu className="w-8 h-8" />
              </div>
            </div>
          </div>
          <h2 className="text-5xl font-bold">Ready to Innovate?</h2>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Join over 25,000 electronics enthusiasts who are building the future
            of automotive technology and smart systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/register"}>
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-12"
              >
                Join Autobit <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white/30 text-white hover:bg-white/10"
              >
                View Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-orange-100 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CircuitBoard className="w-8 h-8 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-900">Autobit</h3>
              </div>
              <p className="text-gray-600">
                Empowering the next generation of electronics engineers and
                automotive innovators through hands-on learning and community
                collaboration.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {bottom_nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    Project Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    Circuit Simulator
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Community</h3>
              <ul className="space-y-2">
                {[
                  "Blog",
                  "Forums",
                  "Discord Server",
                  "Help Center",
                  "Mentorship",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Connect With Us
              </h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="p-2 bg-white rounded-full border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <Instagram className="w-6 h-6 text-gray-700 hover:text-orange-600" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white rounded-full border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <Twitter className="w-6 h-6 text-gray-700 hover:text-orange-600" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white rounded-full border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <Linkedin className="w-6 h-6 text-gray-700 hover:text-orange-600" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white rounded-full border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <Youtube className="w-6 h-6 text-gray-700 hover:text-orange-600" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-orange-100">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                © 2025 Autobit. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-orange-600"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-orange-600"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-orange-600"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
