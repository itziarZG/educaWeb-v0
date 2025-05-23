import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("API Route Called: /api/andrea-agent");
    
    // Parse the request body
    const body = await req.json();
    console.log("Request body:", body);
    
    const { message, agentType, conversationId } = body;
    
    // Debug environment variables
    console.log("Environment variables status:", {
      API_URL: process.env.DEEPSEEK_API_URL ? "Set" : "Missing",
      API_KEY: process.env.DEEPSEEK_API_KEY ? "Set" : "Missing"
    });
    
    // Map agent type to appropriate prompt style
    let tema = message || "";
    let nivel = agentType || "junior";
    
    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    // Different prompts based on agent type
    let prompt = "";
    
    if (agentType === "junior") {
    prompt = `
      Eres Andrea, un agente educativo para niños de primaria (6-8 años).
      Responde a la siguiente consulta de manera amigable, sencilla y colorida: "${message}"
      
      Tu respuesta debe incluir:
      1. Explicación simple y clara adaptada para niños pequeños
      2. Un ejemplo visual o divertido
      3. Alguna actividad interactiva si es apropiado
      
      IMPORTANTE: Incluye formato HTML básico para mejorar la presentación como <h1>, <p>, <ul>, <li>, etc.
      Usa colores brillantes con etiquetas de estilo como <span style="color: #FF5733;">texto colorido</span>
      Incluye emojis relevantes para hacer tu respuesta más atractiva para niños.
    `;
  } else if (agentType === "middle") {
    prompt = `
      Eres un asistente educativo para estudiantes de secundaria (12-15 años).
      Responde a la siguiente consulta de manera informativa y atractiva: "${message}"
      
      Tu respuesta debe incluir:
      1. Explicación clara con detalles relevantes para esta edad
      2. Ejemplos prácticos y relaciones con la vida cotidiana
      3. Preguntas de reflexión o pequeños desafíos
      
      IMPORTANTE: Formatea tu respuesta con HTML para mejor presentación.
      Usa <h2> para títulos, <p> para párrafos, <ul>/<ol> para listas.
      Puedes incluir <div> con estilos para destacar información importante.
    `;
  } else {
    // Default or senior
    prompt = `
      Eres un asistente educativo avanzado para estudiantes mayores (16+ años).
      Responde a la siguiente consulta con profundidad académica: "${message}"
      
      Tu respuesta debe incluir:
      1. Explicación detallada con conceptos y terminología precisa
      2. Referencias a teorías o principios relevantes
      3. Aplicaciones prácticas o ejemplos del mundo real
      4. Sugerencias para profundizar en el tema
      
      IMPORTANTE: Usa formato HTML para estructurar tu respuesta de manera profesional.
      Incluye encabezados <h2>, <h3>, párrafos <p>, listas <ul>/<ol>, y cualquier otro elemento HTML que mejore la comprensión.
    `;
  }

    const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL;
    if (!DEEPSEEK_API_URL) {
      console.error("DEEPSEEK_API_URL environment variable not configured");
      return NextResponse.json(
        { error: "DeepSeek API URL not configured" },
        { status: 500 }
      );
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      console.error("DEEPSEEK_API_KEY environment variable not configured");
      return NextResponse.json(
        { error: "DeepSeek API key not configured" },
        { status: 500 }
      );
    }

    console.log("Making request to Deepseek API...");
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Deepseek API error (${response.status}):`, errorText);
      return NextResponse.json(
        { 
          error: `Deepseek API returned error status: ${response.status}`,
          details: errorText
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Deepseek API response:", data);
    
    const responseContent = data.choices?.[0]?.message?.content || "";

    // Format response for agentService expectations
    return NextResponse.json({
      message: responseContent,
      htmlContent: responseContent, // Same content used for both display methods
      conversationId: conversationId || data.id || Date.now().toString(),
    });
  } catch (error) {
    console.error("Error in andrea-agent API route:", error);
    return NextResponse.json(
      { 
        error: "An error occurred while processing your request",
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
