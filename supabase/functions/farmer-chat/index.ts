
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language = 'hindi' } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      console.error("GEMINI_API_KEY is not set");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Gemini API key is missing. Please set the GEMINI_API_KEY secret in the Supabase project settings."
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create language-specific system prompts
    const systemPrompts = {
      hindi: `आप एक विशेषज्ञ कृषि सहायक हैं। आपको निम्नलिखित विषयों में मदद करनी है:
      - फसल की खेती और देखभाल
      - मौसम और जलवायु सलाह
      - मिट्टी का स्वास्थ्य और उर्वरक
      - कीट और रोग नियंत्रण
      - सरकारी योजनाएं और सब्सिडी
      - बाजार की कीमतें और बिक्री
      - आधुनिक कृषि तकनीक
      
      हमेशा व्यावहारिक, सटीक और किसानों के लिए उपयोगी सलाह दें। हिंदी में उत्तर दें।`,
      
      english: `You are an expert agricultural assistant. Help with:
      - Crop cultivation and care
      - Weather and climate advice
      - Soil health and fertilizers
      - Pest and disease control
      - Government schemes and subsidies
      - Market prices and sales
      - Modern farming techniques
      
      Always provide practical, accurate, and useful advice for farmers. Respond in English.`,
      
      kannada: `ನೀವು ಒಬ್ಬ ತಜ್ಞ ಕೃಷಿ ಸಹಾಯಕರು. ನೀವು ಈ ವಿಷಯಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಬೇಕು:
      - ಬೆಳೆ ಕೃಷಿ ಮತ್ತು ಆರೈಕೆ
      - ಹವಾಮಾನ ಮತ್ತು ವಾತಾವರಣ ಸಲಹೆ
      - ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಗೊಬ್ಬರಗಳು
      - ಕೀಟ ಮತ್ತು ರೋಗ ನಿಯಂತ್ರಣ
      - ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಸಬ್ಸಿಡಿಗಳು
      - ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ಮಾರಾಟ
      - ಆಧುನಿಕ ಕೃಷಿ ತಂತ್ರಗಳು
      
      ಯಾವಾಗಲೂ ಪ್ರಾಯೋಗಿಕ, ನಿಖರ ಮತ್ತು ರೈತರಿಗೆ ಉಪಯುಕ್ತವಾದ ಸಲಹೆ ನೀಡಿ. ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಿಸಿ।`
    };

    const prompt = `${systemPrompts[language]}

    किसान का प्रश्न: ${message}

    कृपया इस प्रश्न का उत्तर दें:`;

    console.log("Sending request to Gemini API for farmer chat");
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error response:", errorText);
      
      if (response.status === 401 || response.status === 403) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Invalid Gemini API key. Please check and update your GEMINI_API_KEY in the Supabase project settings."
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || !data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      console.error("Invalid or empty response from Gemini:", data);
      throw new Error("Invalid response format from Gemini API");
    }

    const botResponse = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({
      success: true,
      response: botResponse
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in farmer chat:', error);
    
    // Fallback responses based on language
    const fallbackResponses = {
      hindi: "मुझे खुशी होगी कि मैं आपकी कृषि संबंधी समस्याओं में मदद कर सकूं। कृपया अपना प्रश्न फिर से पूछें या फसल, मौसम, मिट्टी, या सरकारी योजनाओं के बारे में पूछें।",
      english: "I'd be happy to help with your agricultural questions. Please ask again about crops, weather, soil, or government schemes.",
      kannada: "ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡಲು ನನಗೆ ಸಂತೋಷವಾಗುತ್ತದೆ. ಬೆಳೆಗಳು, ಹವಾಮಾನ, ಮಣ್ಣು, ಅಥವಾ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಮತ್ತೆ ಕೇಳಿ."
    };
    
    return new Response(JSON.stringify({
      success: true,
      response: fallbackResponses[language] || fallbackResponses.hindi
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  }
});
