import connectMongo from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET(req) {
  await connectMongo();

  try {
    const tasks = await Task.find();
    const headers = {
      'Cache-Control': 'no-store, max-age=0',
      'Content-Type': 'application/json',
    };

    return new Response(JSON.stringify(tasks), { status: 200, headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching tasks' }), {
      status: 400, headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json',
      }
    });
  }
}
