import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';

const sizes = [
  { dir: 'mipmap-mdpi', size: 48 },
  { dir: 'mipmap-hdpi', size: 72 },
  { dir: 'mipmap-xhdpi', size: 96 },
  { dir: 'mipmap-xxhdpi', size: 144 },
  { dir: 'mipmap-xxxhdpi', size: 192 },
];

const basePath = '/home/devbox/project/android/app/src/main/res';

async function generateIcons() {
  const sourceImage = await Jimp.read('/home/devbox/project/lxqq512.png');

  for (const { dir, size } of sizes) {
    const targetPath = path.join(basePath, dir);

    const iconImage = sourceImage.clone().resize({ w: size, h: size });
    const roundImage = sourceImage.clone().resize({ w: size, h: size });
    const foregroundImage = sourceImage.clone().resize({ w: size, h: size });

    await iconImage.write(path.join(targetPath, 'ic_launcher.png'));
    await roundImage.write(path.join(targetPath, 'ic_launcher_round.png'));
    await foregroundImage.write(path.join(targetPath, 'ic_launcher_foreground.png'));

    console.log(`Generated ${size}x${size} icons in ${dir}`);
  }

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);