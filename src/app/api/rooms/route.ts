import { NextRequest, NextResponse } from 'next/server';
import { getRoomsForLanding, RoomCategory } from '@/services/room-landing.service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = (searchParams.get('category') || 'all') as RoomCategory;
    const limit = parseInt(searchParams.get('limit') || '8', 10);

    const rooms = await getRoomsForLanding(category, limit);

    return NextResponse.json({ rooms }, { status: 200 });
  } catch (error) {
    console.error('Error in rooms API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}
