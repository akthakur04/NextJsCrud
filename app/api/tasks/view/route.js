import connectMongo from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET(req) {
  await connectMongo();

  try {
    const tasks = await Task.find().lean();
    
    const headers = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Content-Type': 'application/json',
    };
    console.log('tasks',tasks)
    return new Response(JSON.stringify(tasks), { status: 200, headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching tasks' }), {
      status: 400, headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Content-Type': 'application/json',
      }
    });
  }
}
