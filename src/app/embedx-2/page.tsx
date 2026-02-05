'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import toast from 'react-hot-toast'

interface Member {
  name: string
  srn: string
  email: string
  phone: string
  semester: string
  section: string
  department?: string
  hostel?: string
  paymentName?: string
  paymentDataUrl?: string
}

interface FormData {
  teamName: string
  teamLeader: string
  email: string
  phone: string
  members: Member[]
  campus?: string
}

// SRN pattern: PES[1|2]UG[YY][DEPT][XXX] - case insensitive
// 1 = RR campus, 2 = EC campus, YY = joining year (22, 23, 24, etc.), DEPT = 2-3 letter code
const SRN_REGEX = /^PES[12]UG[0-9]{2}[A-Z]{2,3}[0-9]{3}$/i

export default function EmbedX2Page() {
  const [showForm, setShowForm] = useState(false)
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [stepError, setStepError] = useState<string | null>(null)
  const [memberErrors, setMemberErrors] = useState<(string | null)[]>([null, null, null, null])
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    teamLeader: '',
    email: '',
    phone: '',
    members: [
      { name: '', srn: '', email: '', phone: '', semester: '', section: '' },
      { name: '', srn: '', email: '', phone: '', semester: '', section: '' },
      { name: '', srn: '', email: '', phone: '', semester: '', section: '' },
      { name: '', srn: '', email: '', phone: '', semester: '', section: '' }
    ],
    campus: '',
  })

  const handleNext = () => {
    setStepError(null)
    setMemberErrors([null, null, null, null])
    if (step < 3) {
      const valid = isStepValid()
      if (valid) {
        setStep(step + 1)
      } else {
        if (step === 1) {
          setStepError('Please fill all required fields on this step and ensure email/phone are valid.')
        }
        if (step === 2) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          const phoneRegex = /^\d{10}$/
          const errs: (string | null)[] = [null, null, null, null]
          formData.members.forEach((member, idx) => {
            if (idx >= 3) return
            const missing: string[] = []
            if (!member.name || !member.name.trim()) missing.push('Name')
            if (!member.srn || !member.srn.trim() || !SRN_REGEX.test(member.srn)) missing.push('SRN (format: PES1UG24CS001)')
            if (!member.email || !member.email.trim() || !emailRegex.test(member.email)) missing.push('Email')
            if (!member.phone || !member.phone.trim() || !phoneRegex.test(member.phone)) missing.push('Phone')
            if (!member.semester) missing.push('Semester')
            if (!member.section || !member.section.trim()) missing.push('Section')
            if (!member.department) missing.push('Department')
            if (!member.hostel) missing.push('Hostel')
            if (!member.paymentDataUrl) missing.push('Payment acknowledgement')
            errs[idx] = missing.length ? `Missing: ${missing.join(', ')}` : null
          })
          setMemberErrors(errs)
          setStepError('Please complete the highlighted member fields before continuing.')
        }
      }
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\d{10}$/
        return (
          !!formData.teamName.trim() &&
          !!formData.teamLeader.trim() &&
          !!formData.email.trim() &&
          emailRegex.test(formData.email) &&
          !!formData.phone.trim() &&
          phoneRegex.test(formData.phone)
        )
      }
      case 2: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\d{10}$/
        const completeMembers = formData.members.filter(member => (
          member.name && member.name.trim() &&
          member.srn && member.srn.trim() && SRN_REGEX.test(member.srn) &&
          member.email && member.email.trim() && emailRegex.test(member.email) &&
          member.phone && member.phone.trim() && phoneRegex.test(member.phone) &&
          member.semester &&
          member.section && member.section.trim() &&
          member.department &&
          member.hostel
        ))

        const paymentsOk = formData.members.slice(0, 3).every((m) => !!m.paymentDataUrl) &&
          formData.members.slice(3).every((m) => !m.name || !!m.paymentDataUrl)

        return completeMembers.length >= 3 && paymentsOk
      }
      case 3:
        return true
      default:
        return true
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (submitting) return
    setSubmitting(true)

    try {
      const filteredMembers = formData.members.filter((m) => m.name && m.name.trim())

      const payload = {
        teamName: formData.teamName,
        teamLeader: formData.teamLeader,
        email: formData.email,
        phone: formData.phone,
        campus: formData.campus,
        members: filteredMembers,
      }

      const res = await fetch('/api/embedx-2/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error('API error:', errorData)
        throw new Error(errorData.error || errorData.details || 'Submission failed')
      }

      toast.success('Registration submitted — details saved.')
      setShowForm(false)
      setStep(1)
    } catch (error: any) {
      console.error('Submission failed:', error)
      toast.error(error.message || 'Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-black text-white">
      <Navigation />

      <div className="px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/40 rounded-full mb-6">
            <span className="text-orange-400 text-sm font-semibold">• UPCOMING</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              EmbedX 2.0
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
            An exciting hardware and embedded systems event bringing together innovators,
            makers, and tech enthusiasts to build cutting-edge solutions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📅</span>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Date</h3>
                  <p className="text-white font-semibold">21st February 2026</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Venue</h3>
                  <p className="text-white font-semibold">MRD Auditorium, PESU EC Campus</p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-3xl font-bold text-orange-400 mb-4">About Xylem</h2>
        <p className="text-gray-200 mb-4">Xylem is a global leader in water technology, providing innovative and smart solutions to address the world’s critical water challenges. Through research, advanced engineering, and industry collaboration, Xylem enables utilities, industries, and communities to optimize water usage, reduce non-revenue water, and improve operational efficiency.</p>
        <ul className="list-disc pl-6 text-gray-300 mb-4">
          <li>Xylem’s portfolio spans advanced metering, water monitoring, wastewater treatment, analytics, and intelligent infrastructure solutions that help build resilient and sustainable water systems.</li>
          <li>With a strong focus on digital transformation, Xylem integrates IoT, AI, and data-driven insights to empower utilities and industries to make informed decisions and improve service delivery.</li>
          <li>Xylem actively collaborates with academic institutions worldwide to nurture young talent through Xylem Ignite Programs, support R&D initiatives, and encourage innovation in solving emerging water challenges.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-bold text-orange-400 mb-4">Hackathon Objectives</h2>
        <ul className="list-disc pl-6 text-gray-300">
          <li>Encourage students to solve real-world water industry challenges through Embedded Systems and IoT.</li>
          <li>Foster innovation and creativity in smart water monitoring and management.</li>
          <li>Promote industry–academia collaboration and knowledge sharing.</li>
          <li>Provide students with hands-on experience in designing practical, scalable technological solutions.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-bold text-orange-400 mb-4">Participation Guidelines</h2>
        <ul className="list-disc pl-6 text-gray-300">
          <li>Teams must bring their own laptops and development environments.</li>
          <li>Teams are responsible for software development, simulation, and prototyping logic.</li>
          <li>Teams should prepare their own documentation and presentation materials.</li>
          <li>Teams should ensure version control and backup of their work.</li>
          <li>Teams must comply with event rules, timelines, and ethical usage of data.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-bold text-orange-400 mb-4">Problem Statements</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">1. Energy Wastage Detection in Pump Operations</h3>
          <p className="text-gray-300 mb-2">Design an embedded IoT solution that correlates electrical input (current/voltage) with hydraulic behavior (flow/pressure) to detect inefficient operating conditions at the edge and generate actionable alerts.</p>
          <ul className="list-disc pl-6 text-gray-300">
            <li>Electrical and hydraulic sensor integration</li>
            <li>Edge-level analytics and rule-based logic</li>
            <li>Low-latency anomaly detection</li>
            <li>Power-efficient embedded design</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">2. Real-Time Water Usage & Leak Detection Analytics for Smart Buildings</h3>
          <p className="text-gray-300 mb-2">Develop a system that continuously analyses real-time water usage in a building to detect abnormal consumption and potential leak scenarios, enabling rapid response to prevent water loss and damage.</p>
          <ul className="list-disc pl-6 text-gray-300">
            <li>Detect sudden continuous high-water flow indicating a major leak (based on set duration of water flow)</li>
            <li>Trigger emergency cutoff when a critical leak is detected</li>
            <li>Identify continuous water usage during expected non-usage hours</li>
            <li>Distinguish between legitimate high demand and leakage</li>
            <li>(Optional) Enable basic demand-based pump operation, prioritizing low-usage periods</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">3. Water Theft & Unauthorized Usage Detection</h3>
          <p className="text-gray-300 mb-2">Design an embedded monitoring solution that identifies abnormal flow or pressure patterns indicative of theft or unauthorized usage and raises alerts with minimal false positives.</p>
          <ul className="list-disc pl-6 text-gray-300">
            <li>Flow and pressure pattern analysis</li>
            <li>Event detection algorithms</li>
            <li>Edge-based alert generation</li>
            <li>Low-power continuous monitoring</li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-bold text-orange-400 mb-4">Rules & Regulations</h2>
        <ul className="list-disc pl-6 text-gray-300">
          <li>All participants must be currently enrolled students.</li>
          <li>Teams must consist of 3-4 members.</li>
          <li>Plagiarism or use of unoriginal work will result in disqualification.</li>
          <li>Decisions of the judges and organizers are final.</li>
          <li>Teams must submit their work before the deadline; late submissions will not be accepted.</li>
          <li>Respect all participants, mentors, and event staff.</li>
          <li>Any form of cheating or unethical behavior will result in immediate removal from the event.</li>
          <li>Follow all campus and event safety protocols.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-orange-400 mb-2">Evaluation & Submission Guidelines</h2>
        <p className="text-gray-300">All submissions will be evaluated based on innovation, technical feasibility, scalability, and presentation. Ensure your documentation is clear and your solution is well-demonstrated. Submission instructions and deadlines will be announced during the event. Late or incomplete submissions will not be considered for evaluation.</p>
      </section>

      <AnimatePresence>
        {showForm && (
          <motion.div
            id="register"
            className="px-4 pb-16"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm"
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {step === 1 && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-white">EmbedX 2.0 Registration</h2>
                      <button
                        onClick={() => setShowForm(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                        title="Close form"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                <div className="space-y-4">
                  {stepError && step === 1 && (
                    <div className="p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-md">{stepError}</div>
                  )}
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">Team Name <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      placeholder="Team Name"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-300 block mb-1">Team Leader Name <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        placeholder="Team Leader Name"
                        value={formData.teamLeader}
                        onChange={(e) => setFormData({ ...formData, teamLeader: e.target.value })}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        required
                      />
                    </div>
                    <select
                      value={formData['campus'] || ''}
                      onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    >
                      <option value="">Select Campus (EC / RR)</option>
                      <option value="EC">EC</option>
                      <option value="RR">RR</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-300 block mb-1">Email <span className="text-red-400">*</span></label>
                      <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-300 block mb-1">Phone Number <span className="text-red-400">*</span></label>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Payment instructions</h3>
                  <p className="text-gray-400 text-sm mb-3">Please take a screenshot of your payment/acknowledgement. Upload each member&apos;s payment below.</p>
                  <p className="text-gray-500 text-xs">SRN format: PES1UG24CS001 (1=RR, 2=EC campus | 24=year | CS/AM/EC=dept)</p>
                </div>

                <div className="space-y-6">
                  {formData.members.map((member, index) => (
                    <div key={index} className="bg-gray-900/60 border border-gray-700 p-4 rounded-lg">
                      <h3 className="text-white font-semibold mb-3">Member {index + 1} {index >= 3 ? '(Optional)' : ''}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={member.name}
                          onChange={(e) => {
                            const newMembers = [...formData.members]
                            newMembers[index] = { ...member, name: e.target.value }
                            setFormData({ ...formData, members: newMembers })
                          }}
                          className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none ${memberErrors[index] && memberErrors[index]!.includes('Name') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                          required={index < 3}
                        />
                        <input
                          type="text"
                          placeholder="SRN (e.g., PES1UG24CS001)"
                          value={member.srn}
                          onChange={(e) => {
                            const newMembers = [...formData.members]
                            newMembers[index] = { ...member, srn: e.target.value.toUpperCase() }
                            setFormData({ ...formData, members: newMembers })
                          }}
                          className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none ${memberErrors[index] && memberErrors[index]!.includes('SRN') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                          required={index < 3}
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={member.email}
                          onChange={(e) => {
                            const newMembers = [...formData.members]
                            newMembers[index] = { ...member, email: e.target.value }
                            setFormData({ ...formData, members: newMembers })
                          }}
                          className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none ${memberErrors[index] && memberErrors[index]!.includes('Email') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                          required={index < 3}
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={member.phone}
                          onChange={(e) => {
                            const newMembers = [...formData.members]
                            newMembers[index] = { ...member, phone: e.target.value }
                            setFormData({ ...formData, members: newMembers })
                          }}
                          className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none ${memberErrors[index] && memberErrors[index]!.includes('Phone') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                          required={index < 3}
                        />
                        <div className={`mb-2 ${memberErrors[index] && memberErrors[index]!.includes('Semester') ? 'ring-1 ring-red-500 rounded-md' : ''}`}>
                          <div className="text-sm text-gray-400 mb-2">Select semester <span className="text-red-400">*</span></div>
                          <div className="flex flex-wrap gap-2">
                            {['2nd', '4th', '6th', '8th'].map((opt) => {
                              const checked = member.semester === opt
                              return (
                                <label key={opt} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${checked ? 'bg-orange-600 border border-orange-500' : 'bg-gray-800/30 border border-gray-700 hover:border-gray-600'}`}>
                                  <input
                                    type="radio"
                                    name={`semester-${index}`}
                                    className="hidden"
                                    checked={checked}
                                    onChange={() => {
                                      const newMembers = [...formData.members]
                                      newMembers[index] = { ...member, semester: opt }
                                      setFormData({ ...formData, members: newMembers })
                                    }}
                                  />
                                  <span className="text-sm text-gray-200">{opt}</span>
                                </label>
                              )
                            })}
                          </div>
                        </div>
                        <input
                          type="text"
                          placeholder="Section (e.g., A)"
                          value={member.section}
                          onChange={(e) => {
                            const newMembers = [...formData.members]
                            newMembers[index] = { ...member, section: e.target.value }
                            setFormData({ ...formData, members: newMembers })
                          }}
                          className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none ${memberErrors[index] && memberErrors[index]!.includes('Section') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                          required={index < 3}
                        />
                        <div className={`mb-2 ${memberErrors[index] && memberErrors[index]!.includes('Department') ? 'ring-1 ring-red-500 rounded-md' : ''}`}>
                          <div className="text-sm text-gray-400 mb-2">Select department <span className="text-red-400">*</span></div>
                          <div className="flex flex-wrap gap-2">
                            {['CSE', 'AIML', 'ECE', 'Mech', 'EEE'].map((opt) => {
                              const checked = member.department === opt
                              return (
                                <label key={opt} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${checked ? 'bg-orange-600 border border-orange-500' : 'bg-gray-800/30 border border-gray-700 hover:border-gray-600'}`}>
                                  <input
                                    type="radio"
                                    name={`department-${index}`}
                                    className="hidden"
                                    checked={checked}
                                    onChange={() => {
                                      const newMembers = [...formData.members]
                                      newMembers[index] = { ...member, department: opt }
                                      setFormData({ ...formData, members: newMembers })
                                    }}
                                  />
                                  <span className="text-sm text-gray-200">{opt}</span>
                                </label>
                              )
                            })}
                          </div>
                        </div>

                        <div className={`mb-2 ${memberErrors[index] && memberErrors[index]!.includes('Hostel') ? 'ring-1 ring-red-500 rounded-md' : ''}`}>
                          <div className="text-sm text-gray-400 mb-2">Select hostel <span className="text-red-400">*</span></div>
                          <div className="flex flex-wrap gap-2">
                            {['RR Boys Hostel', 'RR Girls Hostel', 'EC Boys Hostel', 'Amaatra Boys Hostel', 'Amaatra Girls Hostel', 'Day Scholar'].map((opt) => {
                              const checked = member.hostel === opt
                              return (
                                <label key={opt} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${checked ? 'bg-orange-600 border border-orange-500' : 'bg-gray-800/30 border border-gray-700 hover:border-gray-600'}`}>
                                  <input
                                    type="radio"
                                    name={`hostel-${index}`}
                                    className="hidden"
                                    checked={checked}
                                    onChange={() => {
                                      const newMembers = [...formData.members]
                                      newMembers[index] = { ...member, hostel: opt }
                                      setFormData({ ...formData, members: newMembers })
                                    }}
                                  />
                                  <span className="text-sm text-gray-200">{opt}</span>
                                </label>
                              )
                            })}
                          </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 mt-2">
                          <label className="block text-sm text-gray-300 mb-2">Payment acknowledgement {index < 3 ? <span className="text-red-400">(required)</span> : <span className="text-gray-400">(required if member exists)</span>}</label>
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              const newMembers = [...formData.members]
                              if (!file) {
                                newMembers[index] = { ...member, paymentName: undefined, paymentDataUrl: undefined }
                                setFormData({ ...formData, members: newMembers })
                                return
                              }

                              const reader = new FileReader()
                              reader.onload = () => {
                                const dataUrl = reader.result as string
                                newMembers[index] = { ...member, paymentName: file.name, paymentDataUrl: dataUrl }
                                setFormData({ ...formData, members: newMembers })
                              }
                              reader.readAsDataURL(file)
                            }}
                            className="w-full text-sm text-gray-300"
                          />
                          {member.paymentName && (
                            <div className="mt-2 text-xs text-gray-400">Selected: {member.paymentName}</div>
                          )}
                          {memberErrors[index] && (
                            <div className="mt-2 text-sm text-red-400">{memberErrors[index]}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Review & Confirm</h2>
                <div className="space-y-4 bg-gray-800/30 p-6 rounded-lg">
                  <div><span className="text-gray-400">Team:</span> <span className="text-white">{formData.teamName}</span></div>
                  <div><span className="text-gray-400">Leader:</span> <span className="text-white">{formData.teamLeader}</span></div>
                  <div><span className="text-gray-400">Email:</span> <span className="text-white">{formData.email}</span></div>

                  <div className="mt-6">
                    <h3 className="text-white font-semibold mb-4">Team Members:</h3>
                    {formData.members.filter(member => member.name).map((member, index) => (
                      <div key={index} className="bg-gray-800/50 p-4 rounded-lg mb-2">
                        <div className="text-white font-medium">{member.name} {index === 0 ? '(Leader)' : ''}</div>
                        <div className="text-gray-400 text-sm">
                          SRN: {member.srn} | Email: {member.email} | Phone: {member.phone} |
                          Sem: {Array.isArray(member.semester) ? member.semester.join(', ') : member.semester} | Sec: {member.section}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

                {step <= 3 && (
                  <div className="flex justify-between items-center mt-8">
                    <button
                      onClick={handleBack}
                      disabled={step === 1}
                      className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:text-white hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Back
                    </button>

                    <div className="flex gap-4">
                      <button
                        onClick={step === 3 ? handleSubmit : handleNext}
                        disabled={step === 3 && submitting}
                        className="px-6 py-3 bg-gradient-orange text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                      >
                        {step === 3 ? (submitting ? 'Submitting…' : 'Submit') : 'Next'}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
