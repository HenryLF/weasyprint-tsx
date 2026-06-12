declare module "*.css"  { const s: Record<string, string>; export default s; }


declare module "*.png"  { const s: string; export default s; }
declare module "*.jpg"  { const s: string; export default s; }
declare module "*.jpeg" { const s: string; export default s; }
declare module "*.webp" { const s: string; export default s; }
declare module "*.gif"  { const s: string; export default s; }
declare module "*.svg"  { const s: string; export default s; }
declare module "*.avif" { const s: string; export default s; }
declare module "*.ico"  { const s: string; export default s; }
declare module "*.bmp"  { const s: string; export default s; }

declare module ".json" {const o : Record<string, any>; export default o }
declare module ".toml" {const o : Record<string, any>; export default o }
declare module ".yaml" {const o : Record<string, any>; export default o }