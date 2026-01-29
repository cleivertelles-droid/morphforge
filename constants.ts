
import { MCVersion, ModLoader } from './types';

export const MC_VERSIONS: MCVersion[] = [
  '1.21.1',
  '1.20.4',
  '1.20.1',
  '1.19.2',
  '1.18.2',
  '1.16.5',
  '1.12.2'
];

export const LOADERS: ModLoader[] = [
  ModLoader.FORGE,
  ModLoader.FABRIC,
  ModLoader.NEOFORGE
];

export interface ThemePreset {
  id: string;
  label: string;
  icon: string;
  prompt: string;
  color: string;
}

export const PRESET_THEMES: ThemePreset[] = [
  {
    id: 'optimization',
    label: 'Optimization',
    icon: 'fa-gauge-high',
    color: 'text-cyan-400',
    prompt: 'Focus strictly on performance and technical stability. Include every modern optimization mod available for this version and loader. The goal is maximum FPS and lowest possible latency.'
  },
  {
    id: 'vanilla-plus',
    label: 'Vanilla+',
    icon: 'fa-leaf',
    color: 'text-blue-400',
    prompt: 'A subtle improvement on the base game. Focus on performance, atmospheric sounds, better animations, and quality-of-life features without breaking the core Minecraft feel.'
  },
  {
    id: 'tech-heavy',
    label: 'Tech-Heavy',
    icon: 'fa-microchip',
    color: 'text-sky-400',
    prompt: 'Focus on extreme automation, electricity, multi-block machinery, and massive industrial factories. Resource processing and digital storage systems are a must.'
  },
  {
    id: 'magic-lore',
    label: 'Magic & Lore',
    icon: 'fa-hat-wizard',
    color: 'text-indigo-400',
    prompt: 'Deep dive into spellcasting, ancient artifacts, boss dimensions, and mystical rituals. Focus on progression through arcane knowledge.'
  },
  {
    id: 'horror-survival',
    label: 'Horror/Survival',
    icon: 'fa-skull',
    color: 'text-red-500',
    prompt: 'Hardcore survival with limited resources, terrifying night-time mobs, dynamic darkness, and sanity mechanics. The atmosphere should be oppressive and tense.'
  },
  {
    id: 'exploration',
    label: 'Exploration',
    icon: 'fa-map-location-dot',
    color: 'text-amber-500',
    prompt: 'Focus on massive biome overhauls, hundreds of new structures, unique dimensions, and treasure-hunting. Travel should be rewarding and visually stunning.'
  },
  {
    id: 'rpg-adventure',
    label: 'RPG & Adventure',
    icon: 'fa-shield-halved',
    color: 'text-orange-400',
    prompt: 'Focus on character progression, skills, attributes, and epic quests. Include custom NPCs, dungeon crawling, legendary loot, and RPG-style combat mechanics.'
  },
  {
    id: 'skyblock',
    label: 'Skyblock Challenge',
    icon: 'fa-cubes',
    color: 'text-sky-400',
    prompt: 'Survival in a void world with limited resources. Focus on automated resource generation from nothing, quest-guided progression, and island expansion.'
  },
  {
    id: 'steampunk',
    label: 'Steampunk / Create',
    icon: 'fa-gears',
    color: 'text-orange-600',
    prompt: 'Focus on the Create mod and mechanical aesthetics. Include trains, brass machinery, clockwork automation, and a 19th-century industrial revolution atmosphere.'
  },
  {
    id: 'cozy-farming',
    label: 'Cozy & Farming',
    icon: 'fa-wheat-awn',
    color: 'text-yellow-400',
    prompt: 'A peaceful experience focused on agriculture, culinary arts, and house decoration. Include expanded farming, diverse crops, animal breeding, and aesthetic building blocks.'
  },
  {
    id: 'sci-fi-space',
    label: 'Sci-Fi & Space',
    icon: 'fa-rocket',
    color: 'text-indigo-400',
    prompt: 'Interstellar travel and high-tech weaponry. Focus on rocket science, planetary exploration, oxygen management, and advanced futuristic gadgets.'
  },
  {
    id: 'hardcore-realism',
    label: 'Hardcore Realism',
    icon: 'fa-temperature-high',
    color: 'text-rose-400',
    prompt: 'Extreme survival realism. Include mechanics for thirst, body temperature, weight systems, realistic physics, and slow-paced, methodical progression.'
  }
];

export const SYSTEM_INSTRUCTION = `
You are the "MorphForge Architect AI". Your goal is to help users design and generate curated lists of mods based on specific themes, versions, and loaders.

Technical Constraints:
- Versions Supported: Minecraft 1.12.2 up to 1.21.1.
- Loaders: Forge, Fabric, or NeoForge.
- Conflict Resolution: Check for known incompatibilities.

Mandatory Optimization Focus:
- Every pack MUST include a "Performance Stack" category.
- If Fabric: Include **Sodium**, **Lithium**, **FerriteCore**, and **Starlight**.
- If Forge/NeoForge: Include **Embeddium**, **Canary**, **ModernFix**, and **FerriteCore**.

Output Structure:
1. # [Unique Modpack Name] (Generate a unique, catchy name)
2. ## Concept Overview (A concise, 2-3 sentence summary of the vision)
3. ## Mod Breakdown (Categorized list)
   - ### Performance Stack (Mandatory - lists performance mods)
   - ### Content Mods (The meat of the pack)
   - ### Utility & Visuals (Quality of Life mods)
   - Format: **Mod Name** - Brief explanation.
4. ## Installation & Download Center
   - ALWAYS include this exact header.
   - Provide "Technical Specs" (Java version, recommended RAM).
   - Provide a "Final Installation Checklist".
   - End with exactly these two markers as separate lines:
     [📥 DOWNLOAD VIA MODRINTH (.mrpack)]
     [📥 DOWNLOAD VIA CURSEFORGE (.zip)]

Rules:
- Mod names MUST be wrapped in double asterisks: **Mod Name**.
- Use clean headers, dividers, and bullet points.
- Aesthetic: Cyber-technical, authoritative, yet creative.
`;
