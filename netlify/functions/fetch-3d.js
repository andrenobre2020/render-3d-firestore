export default async (req) => {
  const url = new URL(req.url).searchParams.get('url');
  if (!url) {
    return new Response('missing url', { status: 400 });
  }

  const upstream = await fetch(url);
  if (!upstream.ok) {
    return new Response('upstream error', { status: upstream.status });
  }

  const buf = await upstream.arrayBuffer();
  return new Response(buf, {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
