// backend/storage.ts
import { db } from "./db";
import {
  projects,
  skills,
  experiences,
  messages,
  type Project,
  type Skill,
  type Experience,
  type Message,
  type InsertMessage,
} from "../../shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getExperiences(): Promise<Experience[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    try {
      // Execute query with .all()
      const result = db.select().from(projects).all();
      console.log("Projects fetched, count:", result.length);

      // Parse techStack from JSON string to array
      return result.map(project => ({
        ...project,
        techStack: JSON.parse(project.techStack as string) as string[]
      }));
    } catch (error) {
      console.error("Database error in getProjects:", error);
      console.error("Error details:", error instanceof Error ? error.stack : String(error));
      throw new Error(`Failed to fetch projects: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async getSkills(): Promise<Skill[]> {
    try {
      // Execute query with .all()
      const result = db.select().from(skills).all();
      console.log("Skills fetched successfully, count:", result.length);
      return result;
    } catch (error) {
      console.error("Database error in getSkills:", error);
      console.error("Error details:", error instanceof Error ? error.stack : String(error));
      throw new Error(`Failed to fetch skills: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async getExperiences(): Promise<Experience[]> {
    try {
      // Execute query with .all()
      const result = db.select().from(experiences).all();
      console.log("Experiences fetched successfully, count:", result.length);
      return result;
    } catch (error) {
      console.error("Database error in getExperiences:", error);
      throw new Error(`Failed to fetch experiences: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const result = db.insert(messages).values(insertMessage).returning().get();
    return result;
  }
}

// Singleton instance for easy import
export const storage = new DatabaseStorage();