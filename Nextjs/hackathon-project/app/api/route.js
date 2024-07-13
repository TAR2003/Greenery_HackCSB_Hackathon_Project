
export async function POST(request) {
    const info = await request.json();
    console.log(info.type);

    return new Response("Hello world");
}
