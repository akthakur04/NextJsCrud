import connectMongo from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET(req) {
  await connectMongo();
  try {
    const task = await Task.find({})

    if (!task) {
      return new Response(JSON.stringify({ error: 'Task not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching task' }), { status: 500 });
  }
}
