import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'

const INPUT = 'public/images'
const OUTPUT = 'public/images'

// Landscape images (hero, partner)
const landscapeSizes = [
  { suffix: '-xs', width: 480 },
  { suffix: '-sm', width: 768 },
  { suffix: '-md', width: 1280 },
]

// Square-ish images (hof)
const squareSizes = [
  { suffix: '-sm', width: 400 },
  { suffix: '-md', width: 680 },
]

const files = await readdir(INPUT)
const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f))

for (const file of images) {
  const name = basename(file, extname(file))
  const inputPath = join(INPUT, file)

  // Determine sizes based on image name
  const isSquare = name.startsWith('hof-')
  const isLogo = name.startsWith('logo')
  const sizes = isSquare ? squareSizes : landscapeSizes

  // Convert original to WebP
  await sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(join(OUTPUT, `${name}.webp`))
  console.log(`✅ ${name}.webp (original size)`)

  // Skip resizing for logos (keep as-is) and partner-logos (small already)
  if (isLogo || name === 'partner-logos') {
    continue
  }

  // Create responsive variants
  for (const { suffix, width } of sizes) {
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(join(OUTPUT, `${name}${suffix}.webp`))
    console.log(`✅ ${name}${suffix}.webp (${width}px)`)
  }
}

console.log('\n🎉 Alle Bilder optimiert!')
