// @/app/actions.ts
'use server';

import { trackEnvironmentalImpact, type TrackEnvironmentalImpactInput, type TrackEnvironmentalImpactOutput } from '@/ai/flows/track-environmental-impact';

type ActionResult = {
    success: boolean;
    data?: TrackEnvironmentalImpactOutput;
    error?: string;
};

export async function getImpact(data: TrackEnvironmentalImpactInput): Promise<ActionResult> {
    try {
        if (data.foodSavedKg < 0 || data.moneySaved < 0) {
            return { success: false, error: 'Please enter positive values.' };
        }
        const result = await trackEnvironmentalImpact(data);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error in getImpact action:", error);
        return { success: false, error: 'Failed to calculate impact due to a server error.' };
    }
}
