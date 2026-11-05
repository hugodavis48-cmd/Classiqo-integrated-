/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

// Lazy load Gemini AI client to prevent crash on startup if Key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY') {
      console.warn('GEMINI_API_KEY is not configured or holds a placeholder. Falling back to high-quality responsive template engine.');
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // API endpoint for dynamic engineering and machinery consultation
  app.post('/api/consult', async (req, res) => {
    try {
      const { projectType, location, soilType, pumpingHeight, pumpingDistance, estimatedDurationDays, additionalDetails } = req.body;

      const client = getGeminiClient();

      if (!client) {
        // Fallback response with excellent matching logic for a seamless offline or missing API key experience
        const responseData = generateMockConsultation(projectType, location, soilType, pumpingHeight, pumpingDistance);
        return res.json(responseData);
      }

      const prompt = `Analyze this civil engineering project requirement in Nigeria and provide a professional consulting assessment:
      - Project Type: ${projectType || 'General Construction'}
      - Location: ${location || 'Lagos, Nigeria'}
      - Soil Type: ${soilType || 'Untested / Sandy (Typical coastal Lagos)'}
      - Concrete Pumping Height requirement: ${pumpingHeight || 0} meters vertical
      - Concrete Pumping Horizontal distance: ${pumpingDistance || 0} meters horizontal
      - Estimated project duration: ${estimatedDurationDays || 30} days
      - Extra project details: ${additionalDetails || 'None provided'}

      Lagos coastal geography has structural sandy strata, a extremely high water table (especially around Lekki, Victoria Island, and Ikoyi), and highly congested logistics corridors (like Lekki-Epe expressway and Apapa port congestion). Provide a detailed analysis including soil safety concerns, concrete line pressure and pipe wear concerns, recommended machinery IDs, recommended concrete pipe part IDs, concrete pumping safety parameters, and Lagos low-bed truck container transport advice.`;

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an expert civil engineering consultant and logistical procurement officer at Clasqo Integrated Nigeria Limited. Your job is to analyze client requirements, cross-reference high-performance Sany heavy machinery (like Sany excavators, concrete pumps, cranes, piling rigs) and Turkish-sourced high-pressure concrete pipe lines/couplings, and return a structured JSON assessment matching the exact schema.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              analysis: {
                type: Type.STRING,
                description: 'A 2-3 paragraph professional engineering assessment analyzing the soil conditions (e.g., Lekki sand beds, swampy ground, piling requirements), aggregate/concrete pumping pressure demands, and equipment capacity selections.'
              },
              recommendedMachineryIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Exact matching IDs from Sany equipment data: sany-pump-56m, sany-trailer-hbt80, sany-excavator-sy215c, sany-excavator-sy365h, sany-crane-stc500, sany-drilling-sr285, sany-roller-ssr120, sany-stacker-srsc45.'
              },
              recommendedPartIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Exact matching IDs from Clasqo parts catalog: pipe-dn125-3m, pipe-dn125-2m, coupling-dn125-clamp, coupling-dn125-screw, elbow-dn125-r275-90, valve-slide-dn125, seal-rubber-dn125, wear-plate-sany.'
              },
              safetyGuidelines: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3-5 safety recommendations covering concrete pipe pressure tests, pipeline block purging, boom stabilization on sandy ground, or hydraulic checks.'
              },
              logisticsAssessment: {
                type: Type.STRING,
                description: 'A paragraph detailing transport logistics inside Nigeria (e.g. transit routing via Lekki-Epe corridor, low-bed towing hours, barge options, or customs clearing for Turkish sourcing).'
              }
            },
            required: ['analysis', 'recommendedMachineryIds', 'recommendedPartIds', 'safetyGuidelines', 'logisticsAssessment']
          }
        }
      });

      const responseText = response.text || '{}';
      const responseJSON = JSON.parse(responseText.trim());
      res.json(responseJSON);
    } catch (error: any) {
      console.error('Error handling engineering consultation:', error);
      res.status(500).json({ error: 'Failed to complete engineering assessment: ' + error.message });
    }
  });

  // Local static asset server or Vite compilation handler
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Clasqo Integrated Server running on http://0.0.0.0:${PORT}`);
  });
}

/**
 * Generate a highly context-specific mock engineering consultation
 * when the Gemini API service is offline or key is missing.
 */
function generateMockConsultation(
  projectType: string,
  location: string,
  soilType?: string,
  pumpingHeight?: number,
  pumpingDistance?: number
) {
  const heightVal = Number(pumpingHeight || 0);
  const distVal = Number(pumpingDistance || 0);
  
  const mIds: string[] = [];
  const pIds: string[] = [];
  const safety: string[] = [
    'Always conduct a full ultrasonic pipe wall thickness check on used concrete lines prior to pumping.',
    'Clear safety perimeter must be established below Sany concrete booms during operation.',
    'Pipeline couplings must use fresh twin-wall rubber seal gaskets to completely block pressure leakage.',
    'For high pressure vertical pumping, anchor the stationary pipes firmly to building slabs every 3 meters.'
  ];

  let analysis = '';
  let logistics = '';

  // Classify requirements
  if (projectType.toLowerCase().includes('piling') || (soilType && soilType.toLowerCase().includes('sand'))) {
    analysis = `For the project in ${location || 'Lagos'}, the heavy coastal sand bed and high tidal table require specialized engineering stabilizers. Sandy soils have low shear strength; standard excavations tend to collapse easily under lateral loads. Spile drills and rotary casings are mandatory for deep foundations. We recommend the Sany SR285 Rotary Rig and Sany SY365H heavy excavator for sand sand-filling and stable pile casting operations.`;
    mIds.push('sany-drilling-sr285', 'sany-excavator-sy365h');
    pIds.push('coupling-dn125-screw', 'elbow-dn125-r275-90');
    safety.push('Deploy outrigger timber cribbing pads to distribute the Sany rig massive static weights on sandy ground.');
    logistics = `Heavy trailer rigs like the 100-ton Sany SR285 require specialized low-bed modular transport carriers. Movement along Dr Babatunde Ayeni St and the Lekki-Epe Expressway corridor is restricted to late-night and early-morning off-peak windows (11:00 PM - 5:00 AM) in accordance with Lagos State Traffic Management Authority (LASTMA) safety standards.`;
  } else if (heightVal > 30 || distVal > 100) {
    analysis = `High-volume concrete line pumping up to ${heightVal}m vertically or ${distVal}m horizontally demands substantial pipeline integrity. A Sany Stationary HBT80 trailer pump is ideal for the core block casting, which can be extended dynamically via secondary line layouts. High pressure DN125 twin-wall pipelines Sourced from Turkish steel mills will provide the required safety factor against backpressure ruptures.`;
    mIds.push('sany-trailer-hbt80', 'sany-pump-56m');
    pIds.push('pipe-dn125-3m', 'coupling-dn125-clamp', 'elbow-dn125-r275-90', 'valve-slide-dn125');
    safety.push('Monitor line backpressure using in-line dual gauge sensors; ensure pressure limits never exceed 130 bar.');
    logistics = `Sany concrete pumping trucks navigate Lagos arterial routes easily, though high-pressure pipelines, couplings, and sliding valve systems are imported directly through Turkish suppliers in Istanbul. Sourced batches clear through Apapa ports or Lekki deep sea port within 7 business days, bundled in custom high-density containers, then routed directly to site.`;
  } else {
    // General Building Construction
    analysis = `General construction in ${location || 'Eti-Osa, Lagos'} requires reliable earthmoving and precise concrete pouring. The Sany SY215C excavator handles foundation layout prep, while the Sany 56m truck-mounted pump provides lightning-fast overhead casting. Sany high-efficiency hydraulics minimize fuel consumption, a vital operational factor given local diesel prices in Nigeria.`;
    mIds.push('sany-pump-56m', 'sany-excavator-sy215c');
    pIds.push('pipe-dn125-2m', 'coupling-dn125-clamp', 'seal-rubber-dn125');
    logistics = `Routine earthmoving machinery and boom trucks are staged at Clasqo’s central Lekki yard. Delivery to local metropolitan target sites (Ikeja, Apapa, Ikoyi, Victoria Island) is coordinated via flatbed trailers, taking average Lagos bridge and expressway clearance schedules into strict account.`;
  }

  return {
    analysis,
    recommendedMachineryIds: mIds.length > 0 ? mIds : ['sany-pump-56m', 'sany-excavator-sy215c'],
    recommendedPartIds: pIds.length > 0 ? pIds : ['pipe-dn125-3m', 'coupling-dn125-clamp'],
    safetyGuidelines: safety,
    logisticsAssessment: logistics
  };
}

startServer();
