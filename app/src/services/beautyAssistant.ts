import { useBeautyEcosystemStore } from '../store/useBeautyEcosystemStore';

export interface BeautyMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface BeautyProvider {
  sendMessage(message: string, history: BeautyMessage[]): Promise<string>;
}

class MockBeautyProvider implements BeautyProvider {
  async sendMessage(message: string, history: BeautyMessage[]): Promise<string> {
    // Artificial delay for premium typing effect (1.5s to 2.5s)
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    const lowerMessage = message.toLowerCase();

    // Context-aware memory check from global store (Zustand)
    const ecosystem = useBeautyEcosystemStore.getState();
    const face = ecosystem.faceAnalysis;
    const skin = ecosystem.skinAdvisor;
    const hair = ecosystem.hairstyleSimulator;
    const event = ecosystem.eventPlanner;

    // History Context
    const hasOilySkin = history.some(m => m.content.toLowerCase().includes('oily skin')) || skin?.skinType === 'Oily';
    const mentionedAcne = history.some(m => m.content.toLowerCase().includes('acne'));

    // HAIR EXPERT
    if (lowerMessage.includes('hairstyle') || lowerMessage.includes('hair') || lowerMessage.includes('bangs') || lowerMessage.includes('cut') || lowerMessage.includes('fringe') || lowerMessage.includes('layer') || lowerMessage.includes('volume') || lowerMessage.includes('hairfall')) {
      const faceShape = face?.faceShape || 'Oval';
      const topMatch = hair?.topHairstyleMatches?.[0] || { name: 'Curtain Bangs', match: 95 };
      
      return `**Assessment**\nBased on your ${faceShape} face shape and previous analysis, you have versatile styling options.\n\n**Recommendation**\nThe ${topMatch.name} received a ${topMatch.match}% compatibility score and would suit you exceptionally well.\n\n**Why This Works**\nThese styles add volume and perfectly frame your facial strengths.\n\n[Try Hairstyle Simulator](/hairstyle-simulator)`;
    }

    // SKIN EXPERT
    if (lowerMessage.includes('acne') || lowerMessage.includes('skin') || lowerMessage.includes('routine') || lowerMessage.includes('hydration') || lowerMessage.includes('serum') || lowerMessage.includes('moisturizer') || lowerMessage.includes('pigmentation') || lowerMessage.includes('pores')) {
      const skinType = skin?.skinType || 'Combination';
      const concerns = skin?.detectedConcerns?.join(' and ') || 'mild dehydration';
      
      if (lowerMessage.includes('acne') || mentionedAcne || skin?.detectedConcerns?.includes('Acne')) {
        return `**Assessment**\nSince your skin analysis detected ${skinType} skin with signs of ${concerns || 'inflammation'}, your routine needs targeted care.\n\n**Recommended Routine**\n- **Morning**: Gentle salicylic acid cleanser, oil-free moisturizer, SPF.\n- **Night**: Niacinamide serum, spot treatment, barrier repair cream.\n\n**Why This Works**\nSalicylic acid clears pores while Niacinamide reduces redness.\n\n[Open Skin Advisor](/skin-advisor)`;
      }

      return `**Assessment**\nSince your skin analysis detected ${skinType} skin with ${concerns}, I can help you build the perfect routine.\n\n**Recommendation**\nI recommend a hydrating cleanser, niacinamide serum to improve pigmentation, and SPF 50 daily.\n\n**Next Step**\nLet's ensure your canvas is perfectly hydrated.\n\n[Open Skin Advisor](/skin-advisor)`;
    }

    // MAKEUP EXPERT
    if (lowerMessage.includes('makeup') || lowerMessage.includes('foundation') || lowerMessage.includes('lipstick') || lowerMessage.includes('blush')) {
      if (hasOilySkin || lowerMessage.includes('oily')) {
        return `**Assessment**\nSince we previously noted your oily skin profile, your makeup routine needs oil-control strategies.\n\n**Recommendation**\n- Use a mattifying primer.\n- Opt for oil-free, liquid-to-powder foundations.\n- Set with translucent powder.\n\n**Next Step**\nLet's ensure your canvas is perfect.\n\n[Open Skin Advisor](/skin-advisor)`;
      }
      return `**Assessment**\nI can help you build a flawless makeup routine for any occasion.\n\n**Recommendation**\nSoft glam makeup would suit your features. Peach tones complement warm undertones beautifully. Start with a solid hydration base, light skin tint, cream blush, and mascara.\n\n**Next Step**\n[Open Face Analysis](/face-analysis)`;
    }

    // BEAUTY PLANNER
    if (lowerMessage.includes('event') || lowerMessage.includes('bridal') || lowerMessage.includes('wedding') || lowerMessage.includes('party') || lowerMessage.includes('date') || lowerMessage.includes('engagement') || lowerMessage.includes('festival')) {
      const selectedEvent = event?.selectedEvent || 'your upcoming event';
      return `**Assessment**\nI see you're preparing for ${selectedEvent}!\n\n**Recommendation**\nFor weddings and big events, schedule skincare treatments at least 3 weeks prior. Book salon appointments 7 days before the event for hair coloring or major styling.\n\n**Next Step**\nLet's map out your timeline.\n\n[Open Event Planner](/event-planner)`;
    }

    // GRACEFUL FALLBACK
    return `I'm here to help with skincare, hairstyles, beauty planning, and personalized recommendations. Could you tell me a little more about what you'd like help with?`;
  }
}

// Export a singleton instance. Later, swap MockBeautyProvider with GeminiProvider.
export const beautyAssistant: BeautyProvider = new MockBeautyProvider();
