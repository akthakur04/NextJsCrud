import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET() {
  try {
    await connectMongo();
    console.log('Connected to MongoDB'); 
    const tasks = await Task.find({}).lean();
    console.log(`Fetched ${tasks.length} tasks from the database`);
    
    return NextResponse.json(tasks, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (e) {
    console.error('Error fetching tasks:', e);
    return NextResponse.json({ error: 'Unable to fetch tasks' }, { status: 500 });
  }
}