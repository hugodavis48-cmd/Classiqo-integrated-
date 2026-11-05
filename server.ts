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

      try {
        const response = await client.models.generateContent({
          model: 'gemini-2.5-flash',
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
        return res.json(responseJSON);
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to mock consultation:', geminiError.message);
        const fallbackData = generateMockConsultation(projectType, location, soilType, pumpingHeight, pumpingDistance);
        return res.json(fallbackData);
      }
    } catch (error: any) {
      console.error('Error handling engineering consultation:', error);
      res.status(500).json({ error: 'Failed to complete engineering assessment: ' + error.message });
    }
  });

  // API endpoint for Clasqo Live Support AI assistant
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      const userMsg = (message || '').trim();

      if (!userMsg) {
        return res.status(400).json({ error: 'Message cannot be empty.' });
      }

      const client = getGeminiClient();

      if (!client) {
        const fallback = generateLiveSupportFallback(userMsg);
        return res.json(fallback);
      }

      const prompt = `User inquiry: "${userMsg}"
      Conversation history summary: ${Array.isArray(history) ? JSON.stringify(history.slice(-4)) : 'None'}

      Respond as "Clasqo Live Support" representing Clasqo Integrated Nigeria Limited. Provide a direct, professional, technically authoritative answer. If applicable, recommend specific Sany machinery or investment tiers, mention our Lekki Yard staging, and offer direct WhatsApp or quote assistance.`;

      try {
        const response = await client.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction: `You are Clasqo Live Support, the premier AI engineering, heavy machinery leasing, and investor support concierge for Clasqo Integrated Nigeria Limited.
            Clasqo Integrated is a Lagos-based leader in heavy construction machinery leasing, Sany equipment dealership/fleet operations, bored piling foundations, and high-pressure concrete casting operations.
            Central Depot & Yard: 1 Dr Babatunde Ayeni St, Lekki Scheme, Eti-Osa, Lagos.
            Operations & Services:
            1. Sany Heavy Machinery Fleet: Sany 56m concrete boom pumps, Sany HBT80 trailer pumps, Atabey towable site pumps, Sany SR285 rotary drilling rigs (up to 84m), Sany SY215C & SY365H heavy excavators, Sany STC500 (50T) telescopic mobile cranes, Sany SSR120 vibratory rollers.
            2. High-Pressure Concrete Pipeline & Parts: Istanbul Turkish-sourced DN125 twin-wall pipes (3m/2m), high-chromium 90° wear elbows, quick-snap coupling clamps, slide valves, wear plates, rubber gaskets.
            3. Geotechnical & Piling Services: Bored piling, bentonite slurry mud casing, underwater tremie concrete pours for Lekki, Eko Atlantic, Banana Island coastal wetlands.
            4. Partners Investment & USD Profit Share Program: Minimum $3,000 USD entry, 18.5% to 32.4% Annualized APY in USD, 70/30 Net Lease Profit model (70% net lease income directly to investors, 30% retained for operations/operators/insurance/LASTMA permits), monthly direct wire to USD domiciliary accounts, CAC registered co-ownership deeds, real-time GPS telematics login, 100% maintenance guarantee by Clasqo.
            5. Direct Contacts: Phone +234 802 087 9468, WhatsApp Desk +234 806 334 2947, Email info@clasqo.com.ng.
            
            Keep answers concise (2-4 clear paragraphs or bullet points). Always be courteous, precise, and practical for construction contractors and serious diaspora/local investors.`,
          }
        });

        const reply = response.text || '';
        const metadata = generateActionMetadata(userMsg, reply);
        return res.json({
          reply: reply.trim(),
          ...metadata
        });
      } catch (geminiErr: any) {
        console.warn('Gemini chat error, falling back to smart engine:', geminiErr.message);
        const fallback = generateLiveSupportFallback(userMsg);
        return res.json(fallback);
      }
    } catch (err: any) {
      console.error('Error handling live support chat:', err);
      res.status(500).json({ error: 'Live support service encountered an issue: ' + err.message });
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

/**
 * Determine interactive quick actions and site card previews based on user inquiry.
 */
function generateActionMetadata(userMsg: string, reply: string) {
  const query = (userMsg + ' ' + reply).toLowerCase();
  
  if (query.includes('invest') || query.includes('roi') || query.includes('usd') || query.includes('profit') || query.includes('yield') || query.includes('co-own')) {
    return {
      quickActions: [
        { label: '📊 Open USD ROI Calculator', action: 'navigate', tab: 'invest' },
        { label: '💼 Fleet Admin & Telematics', action: 'navigate', tab: 'investor-admin' },
        { label: '💬 WhatsApp Investor Desk', action: 'whatsapp', text: 'Hello Clasqo, I am interested in the Partners USD Co-Ownership Program (Min. $3,000 USD).' }
      ],
      card: {
        type: 'investment',
        title: 'Partners USD Co-Ownership Program',
        subtitle: '18.5% – 32.4% Annualized APY • 70/30 Net Lease Revenue Split',
        metric: '$3,000 Min Entry',
        tag: 'USD Hard Currency Yield',
        tab: 'invest',
        linkText: 'Configure Investment & Calculate ROI →'
      }
    };
  }

  if (query.includes('pump') || query.includes('boom') || query.includes('crane') || query.includes('excavat') || query.includes('sany') || query.includes('equip') || query.includes('lease') || query.includes('hire') || query.includes('rent')) {
    return {
      quickActions: [
        { label: '🚜 Browse Sany Heavy Fleet', action: 'navigate', tab: 'equipment' },
        { label: '📝 Build Instant Quote', action: 'navigate', tab: 'quote' },
        { label: '💬 WhatsApp Fleet Dispatcher', action: 'whatsapp', text: 'Hello Clasqo, I want to inquire about leasing Sany heavy machinery in Lagos.' }
      ],
      card: {
        type: 'equipment',
        title: 'Sany Heavy Machinery Fleet',
        subtitle: '56m Boom Pumps, HBT80 Line Pumps, Rotary Piling Rigs & 50T Cranes',
        metric: 'Staged at Lekki Yard',
        tag: 'Sany OEM Certified',
        tab: 'equipment',
        linkText: 'Explore Equipment Specifications & Rates →'
      }
    };
  }

  if (query.includes('piling') || query.includes('foundation') || query.includes('bored') || query.includes('drilling') || query.includes('wetland') || query.includes('soil')) {
    return {
      quickActions: [
        { label: '🏗️ Piling & Casting Services', action: 'navigate', tab: 'construction' },
        { label: '🤖 AI Engineering Assessment', action: 'navigate', tab: 'consultant' },
        { label: '💬 WhatsApp Geotechnical Lead', action: 'whatsapp', text: 'Hello Clasqo, I need to discuss bored piling and geotechnical foundation works in Lagos.' }
      ],
      card: {
        type: 'service',
        title: 'Deep Foundation Bored Piling',
        subtitle: 'Sany SR285 Rotary Rig • Depths to 84m in Coastal Sand Beds',
        metric: 'Bentonite Slurry Casing',
        tag: 'Lagoon & High-Rise Verified',
        tab: 'construction',
        linkText: 'View Bored Piling & Casting Specifications →'
      }
    };
  }

  if (query.includes('pipe') || query.includes('part') || query.includes('coupling') || query.includes('clamp') || query.includes('elbow') || query.includes('valve') || query.includes('turkish') || query.includes('istanbul')) {
    return {
      quickActions: [
        { label: '🔩 Turkish DN125 Hardware', action: 'navigate', tab: 'parts' },
        { label: '📝 Add Parts to Quotation', action: 'navigate', tab: 'quote' },
        { label: '💬 WhatsApp Parts Specialist', action: 'whatsapp', text: 'Hello Clasqo, I need Turkish twin-wall pipes and coupling clamps dispatched.' }
      ],
      card: {
        type: 'parts',
        title: 'Turkish High-Pressure Pipelines',
        subtitle: 'DN125 Twin-Wall Pipes, 90° Wear Elbows, Snap-Clamps & Seals',
        metric: '250 Bar Integrity',
        tag: 'Lekki Depot Staged',
        tab: 'parts',
        linkText: 'Browse Parts & Hardware Catalog →'
      }
    };
  }

  // Default quick actions
  return {
    quickActions: [
      { label: '💰 USD Investment Program', action: 'navigate', tab: 'invest' },
      { label: '🚜 Sany Equipment Fleet', action: 'navigate', tab: 'equipment' },
      { label: '💬 WhatsApp Direct Support', action: 'whatsapp', text: 'Hello Clasqo Live Support, I have an inquiry regarding your operations.' }
    ],
    card: {
      type: 'general',
      title: 'Clasqo Integrated Operations Hub',
      subtitle: 'Central Yard: 1 Dr Babatunde Ayeni St, Lekki Scheme, Eti-Osa, Lagos',
      metric: 'Hotline: +234 802 087 9468',
      tag: 'Tier-1 Engineering',
      tab: 'equipment',
      linkText: 'View Clasqo Fleets & Services →'
    }
  };
}

/**
 * Generate comprehensive context-specific live support responses when Gemini is offline.
 */
function generateLiveSupportFallback(userMsg: string) {
  const query = userMsg.toLowerCase();
  let reply = '';

  if (query.includes('invest') || query.includes('roi') || query.includes('usd') || query.includes('profit') || query.includes('tier') || query.includes('co-own')) {
    reply = `Welcome to Clasqo Integrated! Our Partners Investment & USD Profit Share Program allows local and diaspora partners to co-own revenue-generating heavy construction machinery staged at our Lekki Depot.

Key Highlights of the Program:
• Minimum Capital Entry: $3,000 USD (Starter Unit) up to $250,000+ USD (Institutional Syndicate)
• Target Annualized APY: 18.5% to 32.4% in hard currency USD
• 70/30 Net Lease Revenue Split: 70% of machine charter revenue is transferred directly to co-owners, while Clasqo covers 100% of certified operators, fuel handling, LASTMA permits, and preventative maintenance.
• Payout Cycles: Monthly direct wire transfer into your USD domiciliary account or quarterly compounding.
• Security & Titling: Registered CAC Deed of Co-Ownership, live 24/7 GPS telematics login, and comprehensive All-Risks Heavy Equipment Insurance underwritten by Tier-1 Nigerian insurers.

Would you like to simulate your monthly USD returns on our interactive calculator or speak directly with our Senior Investment Partner on WhatsApp?`;
  } else if (query.includes('pump') || query.includes('boom') || query.includes('sany') || query.includes('trailer') || query.includes('concrete') || query.includes('rent') || query.includes('lease')) {
    reply = `Clasqo Integrated maintains the most modern Sany heavy concrete pumping fleet in Lagos, staged at our central depot in Lekki Scheme (1 Dr Babatunde Ayeni St).

Featured Equipment Ready for Charter:
• Sany 56m Truck-Mounted Boom Pump: 180 m³/h volumetric output, 5-section high-stability boom with active anti-oscillation dampening. Ideal for high-rise slabs across Victoria Island, Ikoyi, and Lekki.
• Sany HBT80 Stationary Trailer Pump & Atabey Towable Units: High-pressure piston design reaching up to 200m vertical and 500m horizontal pipeline reach.
• Sany SY215C (21-ton) & SY365H (36-ton) Heavy Hydraulic Excavators: High-breakout force for bulk earthworks and coastal sand reclamation.
• Sany STC500 (50-ton) Mobile Telescopic Crane: 43m main boom reach with full outrigger load-monitoring.

All machines include Sany-certified operators, daily maintenance logs, and pre-cleared LASTMA night transit permits. You can add any machine to your quote or contact our dispatcher directly on WhatsApp.`;
  } else if (query.includes('piling') || query.includes('bored') || query.includes('foundation') || query.includes('rotary') || query.includes('drill')) {
    reply = `Clasqo Integrated provides full-scope bored piling and deep civil foundation works across Lagos' coastal sand formations and high tidal water tables.

Our Geotechnical Piling Capabilities:
• Machinery: Sany SR285 Rotary Drilling Rig delivering 285 kN·m torque, boring down to 84m depth with diameters up to 2,500mm.
• Slurry Control: High-grade bentonite mud slurry systems engineered to prevent borehole collapse in loose Lekki/Banana Island sand beds.
• Continuous Tremie Pouring: High-pressure underwater tremie pipe installations ensuring zero slurry intrusion and pristine 4,500 kN bearing capacities.
• Verification: Digital ultrasonic shaft verticality logs and load bearing test certificates delivered with every project sign-off.

Our senior geotechnical engineers can visit your site for a free soil and access survey within 24 hours.`;
  } else if (query.includes('pipe') || query.includes('part') || query.includes('coupling') || query.includes('clamp') || query.includes('elbow') || query.includes('turkish') || query.includes('istanbul')) {
    reply = `Clasqo is Nigeria's direct import pipeline carrier for Istanbul, Turkish-manufactured concrete pumping hardware.

Catalog Availability at Lekki Yard:
• DN125 Twin-Wall Straight Pipes: 3-meter and 2-meter lengths with hardened high-chromium inner wear sleeves (65 HRC) rated up to 250 bar burst pressure.
• 90° & 45° High-Chromium Wear Elbows (R275): Reinforced outer wall backing to eliminate blowouts under continuous high-abrasion aggregate velocity.
• Heavy-Duty Quick-Snap Clamps & Screw Couplings: Metric 125mm with safety pins and high-grade heat-treated alloy forgings.
• Double-Lip Rubber Seal Gaskets & Hydraulic Slide Valves: 100% airtight compression seals preventing slurry leakage and pressure loss.

Stock is staged locally for same-day delivery across Lagos or 48-hour dispatch nationwide.`;
  } else if (query.includes('contact') || query.includes('whatsapp') || query.includes('phone') || query.includes('office') || query.includes('address') || query.includes('location')) {
    reply = `You can connect directly with our operations and investment leads through any of the following verified channels:

📍 Central Operations Depot & Staging Yard:
1 Dr Babatunde Ayeni St, Lekki Scheme, Eti-Osa, Lagos, Nigeria
(Physical yard inspections and equipment dry-runs are welcomed Monday - Saturday, 8:00 AM - 6:00 PM).

📞 Operations & Charter Hotline:
+234 802 087 9468

💬 Direct WhatsApp Dispatch Desk:
+234 806 334 2947 (Fastest response for machinery availability, rate sheets, and USD contracts).

✉️ Official Inquiries:
info@clasqo.com.ng

How may our dispatch team assist your project today?`;
  } else {
    reply = `Hello! I am Clasqo Live Support, representing Clasqo Integrated Nigeria Limited.

We specialize in three core divisions across West Africa:
1. Heavy Construction Machinery Leasing: Sany 56m boom pumps, high-pressure trailer pumps, 50T mobile cranes, and excavators staged at our Lekki Yard.
2. Bored Piling & Marine Foundations: Deep rotary drilling down to 84m for coastal and swampy terrain.
3. Partners Investment & USD Profit Share: Earn 18.5% to 32.4% annualized hard-currency ROI through equipment co-ownership (Min. $3,000 USD).

How can I help you today? Feel free to ask about machinery specs, pipeline hardware, investment returns, or connect with our dispatch team on WhatsApp.`;
  }

  const metadata = generateActionMetadata(userMsg, reply);
  return {
    reply,
    ...metadata
  };
}

startServer();

