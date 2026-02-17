"use client"

import { useState } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import toast from 'react-hot-toast'

interface Member {
  name: string;
  srn: string;
  email: string;
  phone: string;
  semester: string[];
  section: string;
  department?: string[];
  hostel?: string[];
  paymentName?: string;
  paymentDataUrl?: string;
}

interface FormData {
  teamName: string
  teamLeader: string
  email: string
  phone: string
  problemStatement: string
  members: Member[]
  campus?: string
}

// SRN pattern: PES[1|2]UG[YY][DEPT][XXX] - case insensitive
// 1 = RR campus, 2 = EC campus, YY = joining year (22, 23, 24, etc.), DEPT = 2-3 letter code
const SRN_REGEX = /^PES[12]UG[0-9]{2}[A-Z]{2,3}[0-9]{3}$/i

// List of images to preload (add more as needed)
const preloadImages = [
  '/images/Logo.png',
  // Crew images (relative to public or as imported static assets)
  '/_next/static/media/Bhuvi%20Bagga.jpeg',
  '/_next/static/media/Ankush.jpg',
  '/_next/static/media/Tanisha%20Reddy.jpeg',
  '/_next/static/media/Tvisha.png',
  '/_next/static/media/Srijan.png',
  '/_next/static/media/Arun.jpg',
  '/_next/static/media/Sid.png',
  '/_next/static/media/Ragul%20Rajkumar.jpeg',
  '/_next/static/media/Shreya%20Revankar.jpg',
  '/_next/static/media/Naveen%20Selvaraj.jpg',
  '/_next/static/media/Dhruv%20Maheshwari.jpg',
  '/_next/static/media/Abhigyan.jpg',
  '/_next/static/media/Aarush%20khullar.jpg',
  '/_next/static/media/Yadunandan.jpg',
  '/_next/static/media/Bhuvigna%20Reddy.jpg',
  '/_next/static/media/Miruthulaa.jpg',
  '/_next/static/media/Hita%20Shree.jpg',
  '/_next/static/media/Architha%20SP.jpg',
  // Gallery images (sample from each folder, add more as needed)
  '/assets/gallery/bootstrap-2024/20240919_111525.jpg',
  '/assets/gallery/bootstrap-2024/20240920_135559.jpg',
  '/assets/gallery/bootstrap-2024/IMG_0152.JPG',
  '/assets/gallery/bootstrap-2025/20240919_115957.jpg',
  '/assets/gallery/bootstrap-2025/Group%20Photo.jpg',
  '/assets/gallery/bootstrap-2025/IMG_0049.jpg',
  '/assets/gallery/Freshers%20Day%202025/20250917_140451.jpg',
  '/assets/gallery/Freshers%20Day%202025/DSC03998.JPG',
  '/assets/gallery/ignition-1/20251107_205324.jpg',
  '/assets/gallery/ignition-1/DSC05603.JPG',
  '/assets/gallery/IKC%20_20/WhatsApp%20Image%202026-02-05%20at%2001.08.39.jpeg',
  '/assets/gallery/IKC%20_20/WhatsApp%20Image%202026-02-05%20at%2001.08.46.jpeg',
  '/assets/gallery/imported/fatal_fury.jpg',
  '/assets/gallery/imported/raven2.jpg',
  '/assets/gallery/imported/rocket_league.jpg',
  '/assets/gallery/arz_kiya_hai.png',
  '/assets/gallery/placeholder-1.jpg',
];

export default function Page() {
  const [showForm, setShowForm] = useState(false)
  const REGISTRATION_CLOSED = true;
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [stepError, setStepError] = useState<string | null>(null)
  const [memberErrors, setMemberErrors] = useState<(string | null)[]>([null, null, null, null])
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    teamLeader: '',
    email: '',
    phone: '',
    problemStatement: '',
    members: [
      { name: '', srn: '', email: '', phone: '', semester: [], section: '', department: [], hostel: [], paymentName: '', paymentDataUrl: '' },
      { name: '', srn: '', email: '', phone: '', semester: [], section: '', department: [], hostel: [], paymentName: '', paymentDataUrl: '' },
      { name: '', srn: '', email: '', phone: '', semester: [], section: '', department: [], hostel: [], paymentName: '', paymentDataUrl: '' },
      { name: '', srn: '', email: '', phone: '', semester: [], section: '', department: [], hostel: [], paymentName: '', paymentDataUrl: '' }
    ],
    campus: '',
  })
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  const handleNext = () => {
    setStepError(null);
    setMemberErrors([null, null, null, null]);
    if (step < 3) {
      const valid = isStepValid();
      if (valid) {
        setStep(step + 1);
      } else {
        if (step === 1) {
          setStepError('Please fill all required fields on this step and ensure email/phone are valid.');
        }
        if (step === 2) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const phoneRegex = /^\d{10}$/;
          const errs: (string | null)[] = [null, null, null, null];
          formData.members.forEach((member, idx) => {
            if (idx >= 3) return;
            const missing: string[] = [];
            if (!member.name || !member.name.trim()) missing.push('Name');
            if (!member.srn || !member.srn.trim() || !SRN_REGEX.test(member.srn)) missing.push('SRN (format: PES1UG24CS001)');
            if (!member.email || !member.email.trim() || !emailRegex.test(member.email)) missing.push('Email');
            if (!member.phone || !member.phone.trim() || !phoneRegex.test(member.phone)) missing.push('Phone');
            if (!member.semester) missing.push('Semester');
            if (!member.section || !member.section.trim()) missing.push('Section');
            if (!member.department) missing.push('Department');
            if (!member.hostel) missing.push('Hostel');
            if (!member.paymentDataUrl) missing.push('Payment acknowledgement');
            errs[idx] = missing.length ? `Missing: ${missing.join(', ')}` : null;
          });
          setMemberErrors(errs);
          setStepError('Please complete the highlighted member fields before continuing.');
        }
      }
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;
        return (
          !!formData.teamName.trim() &&
          !!formData.teamLeader.trim() &&
          !!formData.email.trim() &&
          emailRegex.test(formData.email) &&
          !!formData.phone.trim() &&
          phoneRegex.test(formData.phone) &&
          !!formData.problemStatement.trim()
        );
      }
      case 2: {
        // Validate all required member fields and payment upload
        for (let i = 0; i < 3; i++) {
          const m = formData.members[i];
          if (!m.name || !m.srn || !m.email || !m.phone || !m.semester?.length || !m.section || !m.department?.length || !m.hostel?.length || !m.paymentDataUrl) {
            return false;
          }
        }
        return true;
      }
      default:
        return true;
    }
  };
  if (REGISTRATION_CLOSED) {
    return (
      <>
        <Head>
          {preloadImages.map((src) => (
            <link key={src} rel="preload" as="image" href={src} />
          ))}
        </Head>
        <div className="min-h-screen bg-gradient-black text-white">
          <Navigation />
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                EmbedX 2.0
              </span>
            </h1>
            <p className="text-2xl text-orange-400 mb-4">Registrations are now closed.</p>
            <p className="text-gray-300 text-center max-w-xl">Thank you for your interest! If you have already registered, you will be contacted by the organizing team. Stay tuned for future events.</p>
          </div>
        </div>
      </>
    );
  }
  return null;
}