export interface ModelProps {
    id: string
    object: string
    created: number
}

export async function GET (req: Request) {
    // const { name } = await req.json();

    const BASE_URL = process.env.NEXT_PUBLIC_OPENAI_URL

    const response = await fetch(BASE_URL + "/models", {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
    }).then((res) => res.json());

    // Set response headers and return the stream
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "application/json");
    return Response.json(response);
}
