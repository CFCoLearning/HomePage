"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Trophy,
  Book,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Background from "../(components)/background";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Who can participate in the hackathon?",
    answer:
      "The CFC Mini Hackathon is open to all developers, designers, and innovators, regardless of experience level. We welcome students, professionals, and enthusiasts alike!",
  },
  {
    question: "Do I need to have a team before registering?",
    answer:
      "No, you don't need to have a team before registering. We'll have a team formation session at the beginning of the event where you can meet other participants and form teams.",
  },
  {
    question: "What should I bring to the hackathon?",
    answer:
      "Bring your laptop, charger, and any other devices you might need for development. We'll provide food, drinks, and a comfortable hacking space.",
  },
  // Add more FAQs as needed
];

export default function DetailsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <Background>
      <div className="py-12">
        <Link
          href="/"
          className="inline-flex items-center text-white hover:text-green-300 transition-colors mb-8"
        >
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          CFC Mini Hackathon 2024: Event Details
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8 text-white">
            <section className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Calendar className="mr-2 text-green-400" />
                About the Event
              </h2>
              <p className="text-lg">
                The CFC Mini Hackathon 2024 is an exciting 24-hour coding event
                where developers, designers, and innovators come together to
                create groundbreaking solutions. Organized by CFC Studio, this
                hackathon aims to foster creativity, collaboration, and
                technological innovation.
              </p>
            </section>

            <section className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Trophy className="mr-2 text-yellow-400" />
                Prizes
              </h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-2">1st Place:</span>
                  $3,000 + Mentorship Program
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-2">2nd Place:</span>
                  $2,000 + Cloud Credits
                </li>
                <li className="flex items-center">
                  <span className="text-orange-400 mr-2">3rd Place:</span>
                  $1,000 + Digital Rewards
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">Best Innovation:</span>
                  Special Recognition and Prizes
                </li>
              </ul>
            </section>
          </div>

          <div className="space-y-8 text-white">
            <section className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Book className="mr-2 text-blue-400" />
                Event Schedule
              </h2>
              <ul className="space-y-2">
                <li>Day 1, 9:00 AM: Opening Ceremony and Team Formation</li>
                <li>Day 1, 10:00 AM: Hacking Begins</li>
                <li>Day 1, 2:00 PM: Mentorship Sessions</li>
                <li>Day 2, 9:00 AM: Project Submissions</li>
                <li>Day 2, 2:00 PM: Project Presentations</li>
                <li>Day 2, 4:00 PM: Awards Ceremony</li>
              </ul>
            </section>

            <section className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Users className="mr-2 text-purple-400" />
                Rules and Guidelines
              </h2>
              <ul className="space-y-2">
                <li>Teams must consist of 2-4 members</li>
                <li>All code must be written during the hackathon</li>
                <li>Use of open-source libraries and APIs is allowed</li>
                <li>
                  Projects must be original and solve a real-world problem
                </li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>
          </div>
        </div>

        <section className="mt-12 bg-white/10 backdrop-blur-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/20 pb-4">
                <button
                  className="flex justify-between items-center w-full text-left text-white hover:text-green-300 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  {openFAQ === index ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openFAQ === index && (
                  <p className="mt-2 text-white/80">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/#register"
            className="inline-block px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
          >
            Register Now
          </Link>
        </div>
      </div>
    </Background>
  );
}
