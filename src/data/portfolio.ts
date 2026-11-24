import type { LucideIcon } from "lucide-react";
import { Brain, Braces, Database, Server, Wrench } from "lucide-react";

export const profile = {
  name: "Parthiv Prakash",
  role: "Full-stack developer & ML enthusiast",
  email: "pparthivprakash1@gmail.com",
  location: "India",
  bio: "I design and ship thoughtful digital products, bridging reliable software engineering with practical machine learning.",
  objective:
    "To build useful, accessible products with teams that care about craft, curiosity, and real-world impact.",
};

export type SkillGroup = { name: string; icon: LucideIcon; skills: string[] };
export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    icon: Braces,
    skills: ["JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    name: "Frontend",
    icon: Wrench,
    skills: ["React", "HTML", "CSS", "Tailwind CSS"],
  },
  { name: "Backend", icon: Server, skills: ["Node.js", "Express", "Python"] },
  {
    name: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    name: "Machine Learning",
    icon: Brain,
    skills: ["PyTorch", "OpenCV", "YOLOv5", "TensorFlow"],
  },
  {
    name: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "VS Code", "Linux", "Docker"],
  },
];

export const milestones = [
  {
    date: "Present",
    title: "Building useful software",
    org: "Independent projects",
    copy: "Deepening full-stack engineering and machine learning skills through focused product work.",
  },
  {
    date: "2025-2027",
    title: "Master’s degree",
    org: "Kannur University",
    copy: "Pursuing advanced studies in computer science, specializing in machine learning and AI applications.",
  },
  {
    date: "2023 – 2025",
    title: "Bachelor’s degree",
    org: "Kannur University",
    copy: "Studied computer science fundamentals, data structures, software engineering, and applied AI.",
  },
];

export type Project = {
  title: string;
  category: "Web" | "Machine Learning" | "AI";
  description: string;
  stack: string[];
  features: string[];
  github: string;
  demo: string;
  gradient: string;
};
export const projects: Project[] = [
  {
    title: "Deepfake Audio Detector",
    category: "Machine Learning",
    description:
      "An audio forensics system that detects synthetic speech, voice clones, and spliced audio.",
    stack: ["Python", "PyTorch", "TensorFlow", "HuggingFace"],
    features: ["Dual-model detection", "Tamper localization", "Gradio dashboard"],
    github: "https://github.com/parthiv-wxyz/audiodetect",
    demo: "https://huggingface.co/spaces/iAmNewUserOkay/audio-deepfake-detector",
    gradient: "linear-gradient(135deg, #4d5bd5, #9b6cff)",
  },
  {
    title: "Multi-Road Object Detection",
    category: "Machine Learning",
    description:
      "An enhanced YOLOv5 system for road hazards, traffic signs, vehicles, and pedestrians.",
    stack: ["Python", "PyTorch", "YOLOv5", "FastAPI", "React"],
    features: ["Three detection models", "Small-object detection", "Interactive viewer"],
    github: "https://github.com/parthiv-wxyz/multi-road-object-detection",
    demo: "https://road-detect-seven.vercel.app/",
    gradient: "linear-gradient(135deg, #168d78, #5dd4b1)",
  },
];

export const socials = {
  github: "https://github.com/parthiv-wxyz",
  linkedin: "https://www.linkedin.com/in/parthiv-prakash-4100a532a/",
  instagram: "https://www.instagram.com/parthiv_prakash/",
};
