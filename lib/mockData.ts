import { Resource, FilterOptions } from './types';

export const mockResources: Resource[] = [
  {
    id: '1',
    source: 'SgLDC Virtual Meets',
    subject: 'Mathematics',
    level: 'PRIMARY',
    school_name: 'Si Ling Primary School',
    theme: ['Gamification', 'e-Pedagogy'],
    cluster: 'North',
    topic_title: 'Interactive Learning with Digital Tools',
    resource_title: 'Crafting Digital Escape Rooms for Math Learning',
    synopsis: 'Participants will learn how to craft engaging digital escape rooms using Google Forms and other free tools to reinforce mathematical concepts. The session covers puzzle design, hint systems, and assessment integration.',
    resource_type: 'video',
    drive_url: 'https://drive.google.com/file/d/1example123/view',
    drive_file_id: '1example123',
    date: '2024',
  },
  {
    id: '2',
    source: 'KOPI Time',
    subject: 'English Language',
    level: 'SECONDARY',
    school_name: 'Meridian Secondary School',
    theme: ['AI in Education', 'Differentiated Instruction'],
    cluster: 'East',
    topic_title: 'AI-Powered Writing Support',
    resource_title: 'Using AI Tools for Differentiated Writing Instruction',
    synopsis: 'This resource demonstrates how teachers can leverage AI writing assistants to provide personalized feedback and support for students at different proficiency levels.',
    resource_type: 'pdf',
    drive_url: 'https://drive.google.com/file/d/2example456/view',
    drive_file_id: '2example456',
    date: '2024',
  },
  {
    id: '3',
    source: 'ETD Webinar Series',
    subject: 'Science',
    level: 'JC/CI',
    school_name: 'Hwa Chong Institution',
    theme: ['Virtual Labs', 'Inquiry-Based Learning'],
    cluster: 'West',
    topic_title: 'Virtual Science Laboratories',
    resource_title: 'Implementing Virtual Labs for A-Level Chemistry',
    synopsis: 'Explore how virtual laboratory simulations can supplement hands-on experiments, allowing students to conduct complex experiments safely and repeatedly.',
    resource_type: 'ppt',
    drive_url: 'https://drive.google.com/file/d/3example789/view',
    drive_file_id: '3example789',
    date: '2023',
  },
  {
    id: '4',
    source: 'School Sharing',
    subject: 'Mother Tongue Languages',
    level: 'PRIMARY',
    school_name: 'Pei Hwa Presbyterian Primary School',
    theme: ['Gamification', 'Student Engagement'],
    cluster: 'North',
    topic_title: 'Game-Based Language Learning',
    resource_title: 'Kahoot! and Quizizz for Chinese Vocabulary Building',
    synopsis: 'Learn how to create engaging vocabulary quizzes using Kahoot! and Quizizz to increase student motivation and retention in Chinese Language lessons.',
    resource_type: 'video',
    drive_url: 'https://drive.google.com/file/d/4example012/view',
    drive_file_id: '4example012',
    date: '2024',
  },
  {
    id: '5',
    source: 'SgLDC Virtual Meets',
    subject: 'Mathematics',
    level: 'SECONDARY',
    school_name: 'Bukit Panjang Government High School',
    theme: ['Flipped Classroom', 'Self-Directed Learning'],
    cluster: 'West',
    topic_title: 'Flipped Learning in Mathematics',
    resource_title: 'Creating Effective Pre-Lesson Videos for Algebra',
    synopsis: 'This session shares best practices for creating short, engaging pre-lesson videos that help students learn algebraic concepts before class, freeing up face-to-face time for problem-solving.',
    resource_type: 'video',
    drive_url: 'https://drive.google.com/file/d/5example345/view',
    drive_file_id: '5example345',
    date: '2024',
  },
  {
    id: '6',
    source: 'KOPI Time',
    subject: 'Humanities',
    level: 'SECONDARY',
    school_name: 'Anglican High School',
    theme: ['Data Literacy', 'Critical Thinking'],
    cluster: 'East',
    topic_title: 'Teaching Data Literacy',
    resource_title: 'Using Real-World Data Sets in Social Studies',
    synopsis: 'Empower students to analyze real-world data from government sources to understand social issues and develop evidence-based arguments.',
    resource_type: 'pdf',
    drive_url: 'https://drive.google.com/file/d/6example678/view',
    drive_file_id: '6example678',
    date: '2023',
  },
  {
    id: '7',
    source: 'ETD Webinar Series',
    subject: null,
    level: 'MIXED',
    school_name: null,
    theme: ['Assessment', 'e-Pedagogy'],
    cluster: null,
    topic_title: 'Digital Assessment Strategies',
    resource_title: 'Formative Assessment Tools for the Digital Classroom',
    synopsis: 'An overview of various digital tools for formative assessment including Padlet, Mentimeter, and Google Forms, with practical examples from different subjects.',
    resource_type: 'link',
    drive_url: 'https://go.gov.sg/etd-assessment-tools',
    drive_file_id: null,
    date: '2024',
  },
  {
    id: '8',
    source: 'School Sharing',
    subject: 'Physical Education',
    level: 'PRIMARY',
    school_name: 'Rosyth School',
    theme: ['Video Analysis', 'Student Engagement'],
    cluster: 'North',
    topic_title: 'Technology in PE',
    resource_title: 'Using Video Analysis for Movement Skills Development',
    synopsis: 'Learn how to use tablet-based video analysis apps to help students self-assess and improve their motor skills in PE lessons.',
    resource_type: 'video',
    drive_url: 'https://drive.google.com/file/d/8example234/view',
    drive_file_id: '8example234',
    date: '2023',
  },
  {
    id: '9',
    source: 'SgLDC Virtual Meets',
    subject: 'Art',
    level: 'SECONDARY',
    school_name: 'School of the Arts',
    theme: ['Digital Art', 'Creativity'],
    cluster: 'Central',
    topic_title: 'Digital Art Creation',
    resource_title: 'Introduction to Digital Illustration with Procreate',
    synopsis: 'A beginner-friendly guide to using Procreate on iPad for digital art creation, covering basic tools, layers, and techniques suitable for secondary school art programs.',
    resource_type: 'ppt',
    drive_url: 'https://drive.google.com/file/d/9example567/view',
    drive_file_id: '9example567',
    date: '2024',
  },
  {
    id: '10',
    source: 'KOPI Time',
    subject: 'Computing',
    level: 'JC/CI',
    school_name: 'National Junior College',
    theme: ['Computational Thinking', 'Programming'],
    cluster: 'Central',
    topic_title: 'Teaching Programming Concepts',
    resource_title: 'Pair Programming Strategies for H2 Computing',
    synopsis: 'Explore effective pair programming techniques that promote collaboration and deeper understanding of programming concepts among JC students.',
    resource_type: 'doc',
    drive_url: 'https://drive.google.com/file/d/10example890/view',
    drive_file_id: '10example890',
    date: '2024',
  },
  {
    id: '11',
    source: 'ETD Webinar Series',
    subject: 'Music',
    level: 'PRIMARY',
    school_name: 'CHIJ St. Nicholas Girls\' School',
    theme: ['Digital Music', 'Creativity'],
    cluster: 'Central',
    topic_title: 'Music Technology in Primary Schools',
    resource_title: 'Creating Music with GarageBand',
    synopsis: 'A hands-on guide to using GarageBand for music creation in primary school, including loop-based composition and simple recording techniques.',
    resource_type: 'video',
    drive_url: 'https://drive.google.com/file/d/11example123/view',
    drive_file_id: '11example123',
    date: '2023',
  },
  {
    id: '12',
    source: 'School Sharing',
    subject: 'Science',
    level: 'PRIMARY',
    school_name: 'Henry Park Primary School',
    theme: ['Inquiry-Based Learning', 'e-Pedagogy'],
    cluster: 'South',
    topic_title: 'Science Inquiry with Technology',
    resource_title: 'Using SLS for Science Investigations',
    synopsis: 'Learn how to design effective science investigation tasks on the Student Learning Space (SLS) that promote inquiry-based learning.',
    resource_type: 'pdf',
    drive_url: 'https://drive.google.com/file/d/12example456/view',
    drive_file_id: '12example456',
    date: '2024',
  },
];

export const mockFilterOptions: FilterOptions = {
  sources: [
    { value: 'SgLDC Virtual Meets', label: 'SgLDC Virtual Meets', count: 3 },
    { value: 'KOPI Time', label: 'KOPI Time', count: 3 },
    { value: 'ETD Webinar Series', label: 'ETD Webinar Series', count: 3 },
    { value: 'School Sharing', label: 'School Sharing', count: 3 },
  ],
  subjects: [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English Language', label: 'English Language' },
    { value: 'Science', label: 'Science' },
    { value: 'Mother Tongue Languages', label: 'Mother Tongue Languages' },
    { value: 'Humanities', label: 'Humanities' },
    { value: 'Physical Education', label: 'Physical Education' },
    { value: 'Art', label: 'Art' },
    { value: 'Music', label: 'Music' },
    { value: 'Computing', label: 'Computing' },
  ],
  levels: [
    { value: 'PRIMARY', label: 'Primary' },
    { value: 'SECONDARY', label: 'Secondary' },
    { value: 'JC/CI', label: 'JC/CI' },
    { value: 'MIXED', label: 'Mixed Levels' },
  ],
  schools: [
    { value: 'Si Ling Primary School', label: 'Si Ling Primary School' },
    { value: 'Meridian Secondary School', label: 'Meridian Secondary School' },
    { value: 'Hwa Chong Institution', label: 'Hwa Chong Institution' },
    { value: 'Pei Hwa Presbyterian Primary School', label: 'Pei Hwa Presbyterian Primary School' },
    { value: 'Bukit Panjang Government High School', label: 'Bukit Panjang Government High School' },
    { value: 'Anglican High School', label: 'Anglican High School' },
    { value: 'Rosyth School', label: 'Rosyth School' },
    { value: 'School of the Arts', label: 'School of the Arts' },
    { value: 'National Junior College', label: 'National Junior College' },
    { value: 'CHIJ St. Nicholas Girls\' School', label: 'CHIJ St. Nicholas Girls\' School' },
    { value: 'Henry Park Primary School', label: 'Henry Park Primary School' },
  ],
  themes: [
    { value: 'Gamification', label: 'Gamification' },
    { value: 'e-Pedagogy', label: 'e-Pedagogy' },
    { value: 'AI in Education', label: 'AI in Education' },
    { value: 'Differentiated Instruction', label: 'Differentiated Instruction' },
    { value: 'Virtual Labs', label: 'Virtual Labs' },
    { value: 'Inquiry-Based Learning', label: 'Inquiry-Based Learning' },
    { value: 'Student Engagement', label: 'Student Engagement' },
    { value: 'Flipped Classroom', label: 'Flipped Classroom' },
    { value: 'Self-Directed Learning', label: 'Self-Directed Learning' },
    { value: 'Data Literacy', label: 'Data Literacy' },
    { value: 'Critical Thinking', label: 'Critical Thinking' },
    { value: 'Assessment', label: 'Assessment' },
    { value: 'Video Analysis', label: 'Video Analysis' },
    { value: 'Digital Art', label: 'Digital Art' },
    { value: 'Creativity', label: 'Creativity' },
    { value: 'Computational Thinking', label: 'Computational Thinking' },
    { value: 'Programming', label: 'Programming' },
    { value: 'Digital Music', label: 'Digital Music' },
  ],
  clusters: [
    { value: 'North', label: 'North' },
    { value: 'South', label: 'South' },
    { value: 'East', label: 'East' },
    { value: 'West', label: 'West' },
    { value: 'Central', label: 'Central' },
  ],
};

/**
 * Filter resources based on filter criteria
 */
export function filterResources(resources: Resource[], filters: {
  source?: string[];
  subject?: string | null;
  level?: string | null;
  school_name?: string | null;
  theme?: string[];
  cluster?: string | null;
  search?: string;
}): Resource[] {
  return resources.filter(resource => {
    // Source filter (multi-select)
    if (filters.source && filters.source.length > 0) {
      if (!filters.source.includes(resource.source)) return false;
    }

    // Subject filter
    if (filters.subject) {
      if (resource.subject !== filters.subject) return false;
    }

    // Level filter
    if (filters.level) {
      if (resource.level !== filters.level) return false;
    }

    // School filter
    if (filters.school_name) {
      if (resource.school_name !== filters.school_name) return false;
    }

    // Theme filter (multi-select, any match)
    if (filters.theme && filters.theme.length > 0) {
      if (!resource.theme || !filters.theme.some(t => resource.theme?.includes(t))) {
        return false;
      }
    }

    // Cluster filter
    if (filters.cluster) {
      if (resource.cluster !== filters.cluster) return false;
    }

    // Search filter
    if (filters.search && filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = resource.topic_title.toLowerCase().includes(searchLower) ||
                          resource.resource_title.toLowerCase().includes(searchLower);
      const matchesSynopsis = resource.synopsis?.toLowerCase().includes(searchLower);
      if (!matchesTitle && !matchesSynopsis) return false;
    }

    return true;
  });
}
