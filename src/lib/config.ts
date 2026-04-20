import type { StreamerProfile } from '$lib/types';

export const streamerProfile: StreamerProfile = {
  name: 'songlist-qk',
  tagline: '轻盈、桌面优先的直播歌单工具。',
  description:
    '面向单主播直播场景的现代歌单站。观众可以快速查歌、按标签筛选并提交愿望单，主播可以在后台统一管理曲库与请求。',
  accent: 'ui-pill-brand',
  platforms: [
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/'
    },
    {
      label: 'Bilibili',
      href: 'https://www.bilibili.com/'
    },
    {
      label: 'X / Twitter',
      href: 'https://x.com/'
    }
  ]
};
