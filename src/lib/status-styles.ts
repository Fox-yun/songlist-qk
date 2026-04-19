import type { SongStatus } from '$lib/types';

export const songStatusClasses: Record<SongStatus, string> = {
  ready: 'border-[#10b981]/30 bg-[#10b981]/10 text-[#27a644]',
  learning: 'border-[#7170ff]/30 bg-[#7170ff]/10 text-[#5e6ad2]',
  resting: 'border-[#d0d6e0] bg-[#f3f4f5] text-[#62666d]'
};
