import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface TeamMember {
  id: string
  name: string
  role: string
  domain: 'Automotive' | 'Robotics' | 'Design' | 'Media' | 'Marketing'
  bio: string
  photo_url: string
  linkedin_url?: string
  github_url?: string
  created_at: string
}

export interface GalleryItem {
  id: string
  image_url: string
  caption: string
  event_name: string
  created_at: string
  media_type?: 'image' | 'video' // Optional for backwards compatibility
}

export interface Application {
  id: string
  name: string
  email: string
  phone: string
  skills: string[]
  motivation: string
  preferred_domain: string
  experience: string
  portfolio_url?: string
  created_at: string
}

export interface InterviewSlot {
  id: string
  slot_time: string
  is_taken: boolean
  meeting_link: string
  applicant_email?: string
  created_at: string
}
export interface HackathonRegistration {
  id: string
  team_name: string
  leader_name: string
  leader_email: string
  members: string[]
  problem_statement: string
  tech_stack: string[]
  created_at: string
}

// Database functions
export async function getTeamMembers() {
  try {
    // Check if we have valid Supabase configuration
    if (supabaseUrl == 'https://glbgndtmjqoybzidexdn.supabase.co') {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('team')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data as TeamMember[]
  } catch (error) {
    // Return real crew data, segregated
    return [
      // Core
      {
        id: 'core-1',
        name: 'Naveen S',
        role: 'Club Head',
        domain: 'Automotive',
        bio: 'When life gives you lemonade, make lemons. Life will be all like, "Whaaaat?"',
        photo_url: '',
        created_at: new Date().toISOString(),
      },
      {
        id: 'core-2',
        name: 'Ankush Gowda',
        role: 'Club Manager',
        domain: 'Marketing',
        bio: 'Ignore me',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: 'core-3',
        name: 'Dhruv Maheshwari',
        role: 'Design Head',
        domain: 'Automotive',
        bio: 'design bro.',
        photo_url: getCrewImagePath('Dhruv Maheshwari.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'core-4',
        name: 'Tvisha',
        role: 'Social Media Head',
        domain: 'Media',
        bio: 'Write off anything',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: 'core-5',
        name: 'Srijan Das',
        role: 'Automotive Head',
        domain: 'Automotive',
        bio: 'Driving a slow car fast is better than driving a fast car slow.',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: 'core-6',
        name: 'Bhumika',
        role: 'Operations Head',
        domain: 'Operations',
        bio: "Still pretending to know what I'm doing 😥",
        photo_url: getCrewImagePath('Bhumika.jpg'),
        created_at: new Date().toISOString(),
      },
      // Crew
      {
        id: 'crew-1',
        name: 'Karan Maheshwari',
        role: 'Member',
        domain: 'Robotics',
        bio: 'Life never gives you free lemons, it only gives Pain',
        photo_url: getCrewImagePath('Karan Maheshwari.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-2',
        name: 'Bhuvi Bagga',
        role: 'Member',
        domain: 'Sponsorships',
        bio: 'Powered by caffeine, creativity, and convincing emails. As a part of the sponsorship team, I make sure our passion gets the backing it deserves',
        photo_url: getCrewImagePath('Bhuvi Bagga.jpeg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-3',
        name: 'Velkur Tanisha Reddy',
        role: 'Member',
        domain: 'Operations',
        bio: 'Adventure awaits, fueled by adrenaline',
        photo_url: getCrewImagePath('Tanisha Reddy.jpeg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-5',
        name: 'Siddharth Shilin',
        role: 'Member',
        domain: 'Logistics',
        bio: 'Came for the cars, stayed for the chaos.',
        photo_url: getCrewImagePath('Sid.png'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-6',
        name: 'Abhigyan',
        role: 'Member',
        domain: 'Programming',
        bio: 'He who wasn\'t.',
        photo_url: getCrewImagePath('Abhigyan.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-7',
        name: 'Aarush Khullar',
        role: 'Member',
        domain: 'Automotive',
        bio: 'Just a chill guy with a caffeine addiction',
        photo_url: getCrewImagePath('Aarush khullar.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-8',
        name: 'Yadunandana Reddy M',
        role: 'Member',
        domain: 'Design',
        bio: 'I touch photoshop',
        photo_url: getCrewImagePath('Yadunandan Reddy.JPG'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-9',
        name: 'Bhuvigna Reddy A T',
        role: 'Member',
        domain: 'Design',
        bio: 'YOLOing at full throttle - No pit stops !!',
        photo_url: getCrewImagePath('Bhuvigna Reddy.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-10',
        name: 'Miruthulaa E M',
        role: 'Member',
        domain: 'Robotics',
        bio: "If you're going hard enough left, you'll find yourself turning right.",
        photo_url: getCrewImagePath('Miruthulaa.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-11',
        name: 'Hitha Shree Suresh',
        role: 'Member',
        domain: 'Marketing',
        bio: 'All eyes on KALESH',
        photo_url: getCrewImagePath('Hita Shree.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-12',
        name: 'Architha',
        role: 'Member',
        domain: 'Marketing',
        bio: 'I am Kalesh',
        photo_url: getCrewImagePath('Architha SP.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-13',
        name: 'Nitya Kushwaha',
        role: 'Member',
        domain: 'Media',
        bio: "At the end of the day, it's night.",
        photo_url: getCrewImagePath('Nitya Kushwaha.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-15',
        name: 'Moorty Perepa',
        role: 'Member',
        domain: '3D Space',
        bio: "We're going on a trip, on our favourite rocket ship :3",
        photo_url: getCrewImagePath('Moorty.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-16',
        name: 'Shreya Revankar',
        role: 'Member',
        domain: 'Media',
        bio: "I'll do it but first I need to cry",
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-17',
        name: 'Ragul Rajkumar',
        role: 'Member',
        domain: 'Automotive',
        bio: 'I’d rather fix the issue permanently than put a band aid on it.',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-18',
        name: 'Maniish Rajendran',
        role: 'Member',
        domain: 'Programming',
        bio: 'Fill in Later',
        photo_url: getCrewImagePath('Manish.png'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-19',
        name: 'Ankit Bembalgi',
        role: 'Member',
        domain: 'Automotive',
        bio: '"The harder i push, The more I find within myself" -Ayrton Senna',
        photo_url: getCrewImagePath('Ankit Bembalgi.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-20',
        name: 'Vinay Dasari',
        role: 'Member',
        domain: 'Automotive',
        bio: 'If you told me something, I probably forgot it',
        photo_url: getCrewImagePath('Vinay Dasari.jpg'),
        created_at: new Date().toISOString(),
      },
      // Additional crew requested
      {
        id: 'crew-21',
        name: 'Kethan K B',
        role: 'Robotics',
        domain: 'Robotics',
        bio: 'NTG much',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-22',
        name: 'Sumedh B Rao',
        role: 'Member',
        domain: 'Automotive',
        bio: "Best club in pesecc!! ,  dont care what anyone says .",
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-23',
        name: 'Mancirat Singh',
        role: 'Automotives',
        domain: 'Automotive',
        bio: 'In mad love with cars and engines...',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      // New Recruits
      // Add new recruits here
      // Old Crew
      {
        id: 'oc-1',
        name: 'Arun Murugappan I',
        role: 'Club Head 25',
        domain: 'Automotive',
        bio: 'Machines n Circuits - A true obsession',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      // Old Crew
      {
        id: 'oc-2',
        name: 'Shibu Rangarajan',
        role: 'Old Crew',
        domain: 'Automotive',
        bio: 'Idk man put off smh',
        photo_url: getCrewImagePath('Shibu.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'oc-3',
        name: 'Swetha Ranganathan',
        role: 'Old Crew',
        domain: 'Automotive',
        bio: 'Never, ever, forget to have fun. #Lifeatfullthrottle',
        photo_url: getCrewImagePath('Swetha.png'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'oc-4',
        name: 'Ram Prakhyath',
        role: 'Old Crew',
        domain: 'Automotive',
        bio: 'Grazie Ragazzi',
        photo_url: getCrewImagePath('Ram Prakhyath.png'),
        created_at: new Date().toISOString(),
      },
      // More legacy members requested
      {
        id: 'oc-5',
        name: 'HARSHITH R',
        role: 'Core 2019 - 2023',
        domain: 'Automotive',
        bio: '#LifeatFullThrottle',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: 'oc-6',
        name: 'Alan G Lal',
        role: 'Head of Go-karting',
        domain: 'Automotive',
        bio: 'For me, racing isn’t about the track. It’s about the team that builds the machine',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: 'oc-7',
        name: 'Anantha Krishnan',
        role: "Core’25",
        domain: 'Automotive',
        bio: "Life’s too short for Slow Laps",
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: 'oc-8',
        name: 'Karthik',
        role: 'Core 21-23',
        domain: 'Automotive',
        bio: 'Art without Engineering is dreaming, Engineering without Art is calculating.',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
// Crew image tile size recommendation: 1:1 aspect ratio, e.g. 600x600px or 800x800px for best fit in the UI.
    ] as TeamMember[]
  }
}

export async function getGalleryItems() {
  try {
    // Check if we have valid Supabase configuration
    if (supabaseUrl === 'https://placeholder.supabase.co') {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as GalleryItem[]
  } catch (error) {
    // Return local gallery data
    const galleryData: GalleryItem[] = []
    
    // Bootstrap 2024 - 10 images
    const bootstrap2024Images = [
      '20240919_111525.jpg',
      '20240920_135559.jpg',
      'IMG_0152.JPG',
      'IMG_0154.JPG',
      'IMG_0241.JPG',
      'IMG_0251.JPG',
      'IMG_0305.JPG',
      'IMG_20240905_175756.jpg',
      'trashed-1739687798-IMG20240914103508.jpg',
      'WhatsApp Image 2024-09-22 at 20.23.19_a6c698ae.jpg',
    ]
    bootstrap2024Images.forEach((img, idx) => {
      galleryData.push({
        id: `bootstrap-2024-${idx + 1}`,
        image_url: `/assets/gallery/bootstrap-2024/${img}`,
        caption: 'Bootstrap 2024',
        event_name: 'Bootstrap 2024',
        created_at: new Date(2024, 8, idx + 1).toISOString(),
        media_type: 'image',
      })
    })
    
    // Bootstrap 2024 - Videos
    const bootstrap2024Videos = [
      'Copy of naveen 3.mp4',
      'Copy of shibu 1.mp4',
    ]
    bootstrap2024Videos.forEach((vid, idx) => {
      galleryData.push({
        id: `bootstrap-2024-video-${idx + 1}`,
        image_url: `/assets/gallery/bootstrap-2024/${vid}`,
        caption: 'Bootstrap 2024',
        event_name: 'Bootstrap 2024',
        created_at: new Date(2024, 8, 15 + idx).toISOString(),
        media_type: 'video',
      })
    })
    
    // Bootstrap 2025 - JPG images only (HEIC/CR3 need conversion)
    const bootstrap2025Images = [
      '20240919_115957.jpg',
      'DSC02250.JPG',
      'DSC06188.JPG',
      'IMG-20250929-WA0134.jpg',
      'IMG20250809121020.jpg',
      'IMG20250822163324.jpg',
      'IMG_0188.JPG',
      'IMG_0193.JPG',
      'IMG_0285.JPG',
      'IMG_0288.JPG',
      'IMG_0290.JPG',
      'IMG_0291.JPG',
      'IMG_3859.JPG',
      '_MG_6654.JPG',
      '_MG_6717.JPG',
    ]
    bootstrap2025Images.forEach((img, idx) => {
      galleryData.push({
        id: `bootstrap-2025-${idx + 1}`,
        image_url: `/assets/gallery/bootstrap-2025/${img}`,
        caption: 'Bootstrap \'25',
        event_name: 'Bootstrap',
        created_at: new Date(2025, 8, idx + 1).toISOString(),
      })
    })
    
    // Ignition 1.0 - 13 images
    const ignition1Images = [
      'DSC05603.JPG',
      'DSC_0147.JPG',
      'DSC_0164.JPG',
      'DSC_0209.JPG',
      'DSC_0266.JPG',
      'IMG_0124.JPG',
      'IMG_0333.JPG',
      'IMG_0338.JPG',
      'IMG_0403.JPG',
      'IMG_5420.JPG',
      'IMG_5442.JPG',
      'IMG_5453.JPG',
      'IMG_9990.JPG',
    ]
    ignition1Images.forEach((img, idx) => {
      galleryData.push({
        id: `ignition-1-${idx + 1}`,
        image_url: `/assets/gallery/ignition-1/${img}`,
        caption: 'Ignition 1.0',
        event_name: 'Ignition 1.0',
        created_at: new Date(2025, 10, idx + 1).toISOString(),
        media_type: 'image',
      })
    })
    
    // IKC 2020 - 22 images
    const ikc2020Images = [
      'WhatsApp Image 2026-02-05 at 01.08.39.jpeg',
      'WhatsApp Image 2026-02-05 at 01.08.46.jpeg',
      'WhatsApp Image 2026-02-05 at 01.08.48.jpeg',
      'WhatsApp Image 2026-02-05 at 01.08.49.jpeg',
      'WhatsApp Image 2026-02-05 at 01.08.50.jpeg',
      'WhatsApp Image 2026-02-05 at 01.08.51.jpeg',
      'WhatsApp Image 2026-02-05 at 01.08.53.jpeg',
      'WhatsApp Image 2026-02-05 at 01.08.54.jpeg',
      'WhatsApp Image 2026-02-05 at 01.08.55.jpeg',
      'WhatsApp Image 2026-02-05 at 01.08.56.jpeg',
      'WhatsApp Image 2026-02-05 at 01.09.14.jpeg',
      'WhatsApp Image 2026-02-05 at 01.09.23.jpeg',
      'WhatsApp Image 2026-02-05 at 01.09.24.jpeg',
      'WhatsApp Image 2026-02-05 at 01.09.26 (1).jpeg',
      'WhatsApp Image 2026-02-05 at 01.09.26 (2).jpeg',
      'WhatsApp Image 2026-02-05 at 01.09.26.jpeg',
      'WhatsApp Image 2026-02-05 at 01.09.27.jpeg',
      'WhatsApp Image 2026-02-05 at 01.09.28.jpeg',
      'WhatsApp Image 2026-02-05 at 01.09.29 (1).jpeg',
      'WhatsApp Image 2026-02-05 at 01.09.29.jpeg',
      'WhatsApp Image 2026-02-05 at 01.09.30.jpeg',
      'WhatsApp Image 2026-02-05 at 01.09.31.jpeg',
    ]
    ikc2020Images.forEach((img, idx) => {
      galleryData.push({
        id: `ikc-2020-${idx + 1}`,
        image_url: `/assets/gallery/IKC _20/${encodeURIComponent(img)}`,
        caption: "IKC '20",
        event_name: 'IKC 2020',
        created_at: new Date(2020, 0, idx + 1).toISOString(),
        media_type: 'image',
      })
    })
    
    // Freshers Day 2025 - 17 images + 1 video
    const freshersDay2025Images = [
      '20250917_140451.jpg',
      '20250917_142026.jpg',
      '20250917_145040.jpg',
      '20250917_145308.jpg',
      '20250917_145414.jpg',
      'DSC03998.JPG',
      'DSC04003.JPG',
      'IMG-20250916-WA0108.jpg',
      'IMG-20250917-WA0102.jpg',
      'IMG-20250919-WA0030.jpg',
      'IMG20250917143725 (1).jpg',
      'IMG_0810-2.jpg',
      'IMG_0898-1.jpg',
      'IMG_1636 (1).jpg',
      'IMG_20250917_153243781_HDR.jpg',
      'IMG_9649.PNG',
      'vegavath.jpg',
    ]
    freshersDay2025Images.forEach((img, idx) => {
      galleryData.push({
        id: `freshers-day-2025-${idx + 1}`,
        image_url: `/assets/gallery/Freshers%20Day%202025/${encodeURIComponent(img)}`,
        caption: "Freshers Day '25",
        event_name: 'Freshers Day 2025',
        created_at: new Date(2025, 9, 17 + idx).toISOString(),
        media_type: 'image',
      })
    })
    
    // Freshers Day 2025 - Video
    galleryData.push({
      id: 'freshers-day-2025-video-1',
      image_url: '/assets/gallery/Freshers%20Day%202025/VID-20250916-WA0113.mp4',
      caption: "Freshers Day '25",
      event_name: 'Freshers Day 2025',
      created_at: new Date(2025, 9, 16).toISOString(),
      media_type: 'video',
    })
    
    // EmbedX 2.0 - empty for now (upcoming event)
    
    return galleryData
  }
}

export async function submitApplication(application: Omit<Application, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('applications')
    .insert([application])
    .select()
  
  if (error) throw error
  return data[0] as Application
}

// Upload a file to Supabase storage and return its public URL
export async function uploadFileToStorage(bucket: string, path: string, file: File) {
  // Upload
  const { data, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true })

  if (uploadError) throw uploadError

  // Make public URL
  const publicResult = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  // getPublicUrl returns { data: { publicUrl } }
  // TS: access nested data
  const publicUrl = (publicResult as any)?.data?.publicUrl || null
  if (!publicUrl) throw new Error('Failed to create public URL')
  return publicUrl
}

interface HackathonMember {
  name: string
  srn: string
  email: string
  phone: string
  semester: string
  section: string
  department?: string
  hostel?: string
}

export async function submitHackathonRegistration(registration: {
  teamName: string
  teamLeader: string
  email: string
  phone: string
  campus?: string
  members: HackathonMember[]
  experience: string
  idea: string
  proposalPdf?: File | null
}) {
  try {
    let proposalUrl: string | null = null

    // If files provided, upload them to 'hackathon' bucket. Ensure the bucket exists in Supabase storage.
    if (registration.proposalPdf) {
      const safeName = `${Date.now()}_${registration.teamName.replace(/\s+/g, '_')}_proposal.pdf`
      proposalUrl = await uploadFileToStorage('hackathon', safeName, registration.proposalPdf)
    }

    const payload = {
      team_name: registration.teamName,
      leader_name: registration.teamLeader,
      leader_email: registration.email,
      leader_phone: registration.phone,
      campus: registration.campus || null,
      members: registration.members,
      experience: registration.experience,
      idea: registration.idea,
      proposal_pdf_url: proposalUrl,
    }

    const { data, error } = await supabase
      .from('hackathon')
      .insert([payload])
      .select()

    if (error) throw error
    return data[0]
  } catch (error) {
    throw error
  }
}

export async function getAvailableInterviewSlots() {
  const { data, error } = await supabase
    .from('interview_slots')
    .select('*')
    .eq('is_taken', false)
    .order('slot_time', { ascending: true })
  
  if (error) throw error
  return data as InterviewSlot[]
}

export async function bookInterviewSlot(slotId: string, applicantEmail: string) {
  const { data, error } = await supabase
    .from('interview_slots')
    .update({ 
      is_taken: true, 
      applicant_email: applicantEmail 
    })
    .eq('id', slotId)
    .select()
  
  if (error) throw error
  return data[0] as InterviewSlot
}

// Fix crew image paths to use /src/lib/crewimg/ for local dev and /crewimg/ for production
function getCrewImagePath(filename: string) {
  // If running in production, use /crewimg/ (public folder)
  // If running locally, use /src/lib/crewimg/
  if (typeof window !== 'undefined') {
    // Next.js serves public assets from /public, so use /crewimg/ for both
    return `/crewimg/${filename}`;
  }
  return `/crewimg/${filename}`;
}