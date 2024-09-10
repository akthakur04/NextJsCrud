import connectMongo from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET(req) {
  await connectMongo();
  
  try {
    const tasks = await Task.find();
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching tasks' }), { status: 400 });
  }
}
