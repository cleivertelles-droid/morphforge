
import { ModMetadata } from "../types";

export async function fetchModrinthData(name: string, version: string, loader: string): Promise<ModMetadata | null> {
  try {
    const cleanName = name.replace(/[*_]/g, '').trim();
    // Search for the project
    // Facets ensure we only get mods compatible with the specific version and loader
    const facets = JSON.stringify([
      [`versions:${version}`],
      [`categories:${loader.toLowerCase()}`],
      ["project_type:mod"]
    ]);
    
    const searchUrl = `https://api.modrinth.com/v2/search?query=${encodeURIComponent(cleanName)}&facets=${encodeURIComponent(facets)}&limit=1`;
    
    const response = await fetch(searchUrl);
    if (!response.ok) return null;
    
    const data = await response.json();
    
    if (data.hits && data.hits.length > 0) {
      const hit = data.hits[0];
      return {
        id: hit.project_id,
        slug: hit.slug,
        title: hit.title,
        description: hit.description,
        downloads: hit.downloads,
        iconUrl: hit.icon_url,
        link: `https://modrinth.com/mod/${hit.slug}`,
        source: 'modrinth'
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching Modrinth data:", error);
    return null;
  }
}

export function getCurseForgeSearchUrl(name: string): string {
  const cleanName = name.replace(/[*_]/g, '').trim();
  return `https://www.curseforge.com/minecraft/search?search=${encodeURIComponent(cleanName)}`;
}
