import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { db } from "./db";
import { projects, skills, experiences } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.projects.list.path, async (req, res) => {
    const data = await storage.getProjects();
    res.json(data);
  });

  app.get(api.skills.list.path, async (req, res) => {
    const data = await storage.getSkills();
    res.json(data);
  });

  app.get(api.experiences.list.path, async (req, res) => {
    const data = await storage.getExperiences();
    res.json(data);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      await storage.createMessage(input);
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data endpoint (internal use or auto-run)
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      {
        title: "Calculator Application",
        description: "A comprehensive calculator with scientific functions.",
        techStack: ["React", "CSS"],
        imageUrl: "https://images.unsplash.com/photo-1587145820266-a5951ee1f620?q=80&w=800&auto=format&fit=crop",
        category: "Utility",
        githubUrl: "https://github.com",
        problemStatement: "Users needed a convenient way to perform scientific calculations on the web without installing software.",
        motivation: "Built to demonstrate complex state management in React and CSS grid layouts.",
        systemDesign: "The application uses a modular component structure where each mathematical operation is a separate utility function.",
        challenges: "Implementing the parenthesis logic for complex expressions was the most difficult part.",
        learnings: "Deepened understanding of React state updates and event handling."
      },
      {
        title: "Student Record & Marksheet System",
        description: "C++ based application for managing student academic records.",
        techStack: ["C++", "File Handling"],
        imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
        category: "Academic",
        githubUrl: "https://github.com",
        problemStatement: "Manual record keeping for student marks was prone to errors and time-consuming.",
        motivation: "Academic project focused on data persistence and efficient retrieval in C++.",
        systemDesign: "Utilizes binary file handling for data storage and custom algorithms for sorting students by GPA.",
        challenges: "Ensuring data integrity during concurrent file access simulated environments.",
        learnings: "Mastered file stream operations and structured data management in low-level languages."
      },
      {
        title: "8085 Assembly Programs",
        description: "Collection of optimized assembly programs for the 8085 microprocessor.",
        techStack: ["Assembly", "8085"],
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        category: "System",
        githubUrl: "https://github.com",
        problemStatement: "Understanding low-level hardware interactions requires direct register manipulation.",
        motivation: "System design project to optimize execution cycles for common arithmetic operations.",
        systemDesign: "Set of optimized subroutines for multiplication, division, and BCD to binary conversion.",
        challenges: "Debugging logic using limited register sets and hardware constraints.",
        learnings: "Gained foundational knowledge of computer architecture and CPU instruction cycles."
      },
      {
        title: "Python Utilities & Scripts",
        description: "Automation scripts for file management and data processing.",
        techStack: ["Python", "Automation"],
        imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop",
        category: "Utility",
        githubUrl: "https://github.com",
        problemStatement: "Repeating manual file sorting and data extraction tasks was inefficient.",
        motivation: "Built to automate daily workflows and improve productivity through scripting.",
        systemDesign: "Modular script library with a command-line interface for easy task selection.",
        challenges: "Handling various file formats and edge cases in data cleaning.",
        learnings: "Improved proficiency in Python's standard library and regular expressions."
      },
      {
        title: "Django Backend Systems",
        description: "Scalable backend architecture implementation.",
        techStack: ["Python", "Django", "PostgreSQL"],
        imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop",
        category: "Backend",
        githubUrl: "https://github.com",
        problemStatement: "Modern web applications require robust, scalable backends with secure authentication.",
        motivation: "Exploring full-stack development patterns and database relationships.",
        systemDesign: "MVC architecture with RESTful API endpoints and a relational database schema.",
        challenges: "Optimizing database queries to prevent N+1 performance issues.",
        learnings: "Comprehensive understanding of middleware, ORMs, and secure API design."
      }
    ]);

    await db.insert(skills).values([
      { name: "C", category: "Languages", icon: "Code" },
      { name: "C++", category: "Languages", icon: "Code2" },
      { name: "Python", category: "Languages", icon: "Snake" },
      { name: "Java", category: "Languages", icon: "Coffee" },
      { name: "HTML/CSS", category: "Web", icon: "Layout" },
      { name: "JavaScript", category: "Web", icon: "FileJson" },
      { name: "Microprocessor (8085)", category: "System", icon: "Cpu" },
      { name: "Data Structures", category: "Core", icon: "Database" },
    ]);

    await db.insert(experiences).values([
      {
        role: "Student",
        organization: "Tribhuvan University",
        period: "Expected 2028",
        description: "B.E. in Electronics & Communication Engineering",
        type: "Education"
      }
    ]);
  }
}
