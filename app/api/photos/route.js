import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'customPhotos.json');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

function getStoredPhotos() {
  if (fs.existsSync(dataFilePath)) {
    try {
      const content = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(content);
    } catch {
      return {};
    }
  }
  return {};
}

function saveStoredPhotos(data) {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  const photos = getStoredPhotos();
  return NextResponse.json(photos);
}

export async function POST(request) {
  try {
    const { id, dataUrl } = await request.json();
    if (!id || !dataUrl) {
      return NextResponse.json({ error: 'Missing id or dataUrl' }, { status: 400 });
    }

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Match data:image/jpeg;base64,... or similar
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length < 3) {
      return NextResponse.json({ error: 'Invalid data URL' }, { status: 400 });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    let ext = 'jpg';
    if (mimeType.includes('png')) ext = 'png';
    else if (mimeType.includes('webp')) ext = 'webp';

    const filename = `photo-${id}.${ext}`;
    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}?v=${Date.now()}`;
    const current = getStoredPhotos();
    current[id] = publicUrl;
    saveStoredPhotos(current);

    return NextResponse.json({ success: true, url: publicUrl, photos: current });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const current = getStoredPhotos();
    if (current[id]) {
      delete current[id];
      saveStoredPhotos(current);
    }

    // Also remove files if exist
    ['jpg', 'png', 'webp'].forEach((ext) => {
      const p = path.join(uploadsDir, `photo-${id}.${ext}`);
      if (fs.existsSync(p)) {
        try {
          fs.unlinkSync(p);
        } catch {}
      }
    });

    return NextResponse.json({ success: true, photos: current });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

