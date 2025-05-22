// Esta ruta puede ser utilizada para comunicarse con la API de Pickaxe si es necesario
export async function POST(request) {
  try {
    const data = await request.json();

    // Aquí puedes implementar la lógica para comunicarte con la API de Pickaxe
    // Este es solo un ejemplo y deberá adaptarse a la API real de Pickaxe

    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`, // Necesitarías configurar esta variable de entorno
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
