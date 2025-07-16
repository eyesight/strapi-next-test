import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const url = searchParams.get('url');
  const secret = searchParams.get('secret');
  console.log('PREVIEW API CALLED:', { url, secret }); 

  if (secret !== process.env.PREVIEW_SECRET) {
    return new NextResponse('Invalid secret', { status: 401 });
  }

  if (!url) {
    return new NextResponse('Missing url', { status: 400 }); 
  }

  // Enable draft mode (sets cookies)
  draftMode().enable();

  // Redirect to the path in draft mode
  return NextResponse.redirect(new URL(url, req.nextUrl.origin)); 
} 
