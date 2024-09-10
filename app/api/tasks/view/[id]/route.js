import connectMongo from '@/lib/mongodb';
import Task from '@/models/Task';

export const revalidate = 0; // Ensure the page doesn't cache

export async function GET(req) {
  await connectMongo();

  try {
    const tasks = await Task.find();
    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching tasks' }), {
      status: 400,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json',
      },
    });
  }
}
