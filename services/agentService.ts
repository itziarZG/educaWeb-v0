import { AgentMessage, AgentResponse } from "@/types/agents";
import prompts from "@/utils/prompts.json";

export async function sendMessageToAgent(
  messages: { role: string; content: string }[],
  childInfoOrAgent?: any,
  userEmail?: string,
  childInfoArg?: any,
): Promise<AgentResponse> {
  let childInfo = childInfoOrAgent;
  let agentName: string | undefined;

  if (typeof childInfoOrAgent === "string") {
    agentName = childInfoOrAgent;
    childInfo = childInfoArg;
  }

  try {
    const response = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        childInfo,
        agentName,
        userEmail,
      }),
    });

    if (!response.ok) {
      // Si falla, intentamos leer el error que enviamos desde el servidor
      const errorData = await response.json();
      throw new Error(errorData.error || `Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error communicating with agent API:", error);
    return {
      message: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
export async function sendMessageToMaquetin(
  messages: { role: string; content: string }[],
): Promise<AgentResponse> {
  const systemPrompt = prompts.maquetin;
  const lastUserMessage = messages[messages.length - 1];

  if (!lastUserMessage) {
    throw new Error("No messages provided to sendMessageToMaquetin");
  }

  const maquetinMessages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: lastUserMessage.content },
  ];

  try {
    const response = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: maquetinMessages,
      }),
    });

    if (!response.ok) {
      // Si falla, intentamos leer el error que enviamos desde el servidor
      const errorData = await response.json();
      throw new Error(errorData.error || `Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error communicating with agent API:", error);
    return {
      message: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
export async function getConversationHistory(
  conversationId: string,
): Promise<AgentMessage[]> {
  try {
    // Instead of calling external API directly
    const response = await fetch("/api/andrea-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    console.error("Error fetching conversation history:", error);
    return [];
  }
}

export function generateSystemPrompt(child: {
  nombre: string;
  edad: string;
  curso: string;
  gustos: string;
  observaciones?: string;
  comunidadAutonoma: string;
}) {
  return `Eres un Asistente educativo personalizado para la familia de ${child.nombre}.
**Perfil del Estudiante:**
- Edad: ${child.edad} años.
- Nivel actual: ${child.curso}.
- Intereses: ${child.gustos}.
- Comunidad Autónoma: ${child.comunidadAutonoma}.
${child.observaciones ? `- Notas importantes: ${child.observaciones}` : ""}

**Tu Misión:**
Tu objetivo es reforzar su aprendizaje, atención y motivación. Debes proponer actividades lúdicas basadas estrictamente en sus intereses (${child.gustos}) y adaptadas a su nivel educativo (${child.curso}) y a su comunidad autónoma (${child.comunidadAutonoma}).

**Reglas de Interacción:**
1. **Tono:** Cálido, claro y motivador para la familia. y ayudando a los padres a entender el proceso.
Ten en cuenta también las tradiciones y cultura de España para adaptar las actividades. Y las observaciones de los padres: ${child.observaciones}.
2. **Estructura:** Divide las lecciones en pasos cortos.
3. **Maquetación:** Para que el sistema visual funcione, separa SIEMPRE el inicio y el fin de la ficha de ejercicios prácticos con una línea de cuatro guiones en markdown '*----*' pero no lo uses en medio de la ficha. En la ficha sólo ejercicios creados.
4. **Recompensas:** Utiliza emojis temáticos relacionados con sus gustos para reforzar los logros.

**Formato de salida:**
Habla directamente a la familia según el contexto, sugiriendo rutinas y retos semanales.`;
}
