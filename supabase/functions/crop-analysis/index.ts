
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

    // Construct a comprehensive prompt based on the crop data
    const prompt = `
      As an agricultural expert AI, analyze the following crop data and provide three sections of feedback:
      1. What They Did Well (3 points)
      2. Areas for Improvement (3 points)
      3. Recommendations (4 specific suggestions)
      
      Also provide an overall health score from 0-100.

      Crop Information:
      - Crop Type: ${cropData.crop_type}
      - Land Size: ${cropData.land_size}
      - Sowing Date: ${cropData.sowing_date}
      - Cultivation Method: ${cropData.cultivation_method}
      - Watering Method: ${cropData.watering_method}
      - Seed Type: ${cropData.seed_type}
      - Seed Source: ${cropData.seed_source}
      - Fertilizers Used: ${cropData.fertilizers || 'None specified'}
      - Pesticides Used: ${cropData.pesticides || 'None specified'}
      - Problems Reported: ${cropData.problems}
      - Harvest Outcome: ${cropData.harvest_outcome}
      - Additional Notes: ${cropData.additional_notes || 'None'}

      Provide the response in the following JSON format:
      {
        "positives": ["point1", "point2", "point3"],
        "improvements": ["point1", "point2", "point3"],
        "recommendations": ["rec1", "rec2", "rec3", "rec4"],
        "overallScore": number
      }
      
      Be realistic, practical, and provide actionable advice. The content should be specific to this crop data.
    `;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an agricultural expert AI that provides crop analysis and recommendations.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
    }

    const analysisText = data.choices[0].message.content;
    let analysisJson;
    
    try {
      // Extract JSON from the response (in case there's additional text)
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisJson = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not extract JSON from response');
      }
    } catch (error) {
      throw new Error(`Failed to parse AI response: ${error.message}`);
    }

    return new Response(JSON.stringify({
      success: true,
      data: analysisJson
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
