// backend/src/seed.ts
import { storage } from "./storage";

export async function seedDatabase() {
  try {
    // Check if projects already exist
    const projectsData = await storage.getProjects();
    if (projectsData.length > 0) return;

    console.log("Seeding database...");

    // ------------------- PROJECTS -------------------
    const projectList = [
      {
        title: "Calculator Application",
        description: "A comprehensive calculator with scientific functions.",
        techStack: ["React", "CSS"],
        imageUrl: "https://images.unsplash.com/photo-1581091870620-1f8a0ff05a1f?q=80&w=800&auto=format&fit=crop",
        category: "Utility",
        githubUrl: "https://github.com",
        liveUrl: "",
        problemStatement: "Users needed a convenient way to perform scientific calculations.",
        motivation: "Built to demonstrate complex state management in React.",
        systemDesign: "Component-based React architecture with utility math functions.",
        challenges: "Implementing correct parenthesis evaluation.",
        learnings: "Improved React state and event handling.",
      },
      {
        title: "Student Record & Marksheet System",
        description: "C++ based student record management system.",
        techStack: ["C++", "File Handling"],
        imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
        category: "Academic",
        githubUrl: "https://github.com",
        liveUrl: "",
        problemStatement: "Manual marksheet management was inefficient.",
        motivation: "Academic project to practice file persistence.",
        systemDesign: "Binary file storage with structured records.",
        challenges: "Maintaining data consistency.",
        learnings: "Strong understanding of file I/O in C++.",
      },
      {
        title: "Python Utilities & Scripts",
        description: "Automation scripts for productivity.",
        techStack: ["Python"],
        imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop",
        category: "Utility",
        githubUrl: "https://github.com",
        liveUrl: "",
        problemStatement: "Manual repetitive tasks wasted time.",
        motivation: "Improve productivity via automation.",
        systemDesign: "Modular CLI-based scripts.",
        challenges: "Handling edge cases in file formats.",
        learnings: "Advanced Python standard library usage.",
      },
    ];

    for (const proj of projectList) {
      await storage.createProject(proj);
    }

    // ------------------- SKILLS -------------------
    const skillList = [
      { name: "C", category: "Languages", icon: "Code" },
      { name: "C++", category: "Languages", icon: "Code2" },
      { name: "Python", category: "Languages", icon: "Snake" },
      { name: "JavaScript", category: "Web", icon: "FileJson" },
      { name: "HTML/CSS", category: "Web", icon: "Layout" },
      { name: "8085 Microprocessor", category: "System", icon: "Cpu" },
      { name: "Data Structures", category: "Core", icon: "Database" },
    ];

    for (const skill of skillList) {
      await storage.createSkill(skill);
    }

    // ------------------- EXPERIENCES -------------------
    const experienceList = [
      {
        role: "Student",
        organization: "Tribhuvan University",
        period: "2024 – 2028",
        description: "B.E. in Electronics & Communication Engineering",
        type: "Education",
      },
    ];

    for (const exp of experienceList) {
      await storage.createExperience(exp);
    }

    // ------------------- MESSAGES -------------------
    await storage.createMessage({
      name: "Seed User",
      email: "seed@example.com",
      subject: "Seed",
      message: "Seeding initial message",
    });

    console.log("✅ Database seeded successfully");
  } catch (err) {
    console.error("❌ Database seeding failed:", err);
    throw err;
  }
}
