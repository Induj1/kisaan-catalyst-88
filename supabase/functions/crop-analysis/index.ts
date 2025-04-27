
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
    const { cropData } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    // Construct a more comprehensive and nuanced prompt
    const prompt = `
      As an expert agricultural consultant, provide a detailed, actionable analysis of this crop cultivation data:

      Crop Specifics:
      - Type: ${cropData.crop_type}
      - Land Size: ${cropData.land_size}
      - Sowing Date: ${cropData.sowing_date}
      - Cultivation Method: ${cropData.cultivation_method}
      - Watering Method: ${cropData.watering_method}

      Key Observations and Analysis:
      1. Provide 3-4 specific strengths in the current cultivation approach
      2. Identify 3-4 critical areas for improvement
      3. Offer targeted, practical recommendations for enhancing crop yield and sustainability
      4. Assess overall agricultural practices with a comprehensive score (0-100)

      Response Format (STRICT JSON):
      {
        "positives": [
          "Specific positive observation 1",
          "Specific positive observation 2",
          "Specific positive observation 3"
        ],
        "improvements": [
          "Critical area of improvement 1",
          "Critical area of improvement 2", 
          "Critical area of improvement 3"
        ],
        "recommendations": [
          "Practical recommendation 1",
          "Practical recommendation 2", 
          "Practical recommendation 3",
          "Practical recommendation 4"
        ],
        "overallScore": number
      }

      Note: Provide realistic, data-driven insights based on the specific crop type and cultivation details.
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert agricultural consultant providing detailed, actionable crop analysis.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
    }

    // Parse the AI-generated analysis
    const analysisText = data.choices[0].message.content;
    const analysisJson = JSON.parse(analysisText);

    return new Response(JSON.stringify({
      success: true,
      data: analysisJson
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in crop analysis:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
