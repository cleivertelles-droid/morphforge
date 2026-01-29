
export type MCVersion = '1.12.2' | '1.16.5' | '1.18.2' | '1.19.2' | '1.20.1' | '1.20.4' | '1.21.1';

export enum ModLoader {
  FORGE = 'Forge',
  FABRIC = 'Fabric',
  NEOFORGE = 'NeoForge'
}

export interface ArchitectQuery {
  version: MCVersion;
  loader: ModLoader;
  prompt: string;
}

export interface ModpackGeneration {
  id: string;
  timestamp: number;
  query: ArchitectQuery;
  result: string; // Markdown response from AI
}

export interface ModMetadata {
  id: string;
  slug: string;
  title: string;
  description: string;
  downloads: number;
  iconUrl: string;
  link: string;
  source: 'modrinth' | 'curseforge';
}
