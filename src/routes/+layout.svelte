<script lang="ts">
  import '../app.css';

  import type { Snippet } from 'svelte';

  import type { LayoutData } from './$types';

  let { data, children } = $props<{ data: LayoutData; children: Snippet }>();
</script>

<svelte:head>
  <title>VTuber Songboard</title>
  <meta
    name="description"
    content="单主播 VTuber 歌单站，支持公开歌单展示、搜索筛选、愿望单提交与后台管理。"
  />
</svelte:head>

<div class="min-h-screen">
  <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
      <a href="/" class="flex min-w-0 items-center gap-3 text-sm font-medium text-slate-900">
        <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-teal-400 via-lime-300 to-rose-300 text-base font-semibold text-slate-950 shadow-sm">
          歌
        </span>
        <span class="flex min-w-0 flex-col">
          <span class="text-base font-semibold">VTuber Songboard</span>
          <span class="text-xs text-slate-500">单主播歌单与愿望单管理</span>
        </span>
      </a>

      <nav class="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <a
          href="/"
          class="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
        >
          公开歌单
        </a>

        {#if data.viewer.isAdmin}
          <a
            href="/admin"
            class="rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-teal-800 transition hover:border-teal-300 hover:bg-teal-100"
          >
            后台管理
          </a>
        {:else}
          <a
            href="/admin/login"
            class="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-800"
          >
            管理员登录
          </a>
        {/if}
      </nav>
    </div>
  </header>

  <main class="mx-auto max-w-7xl px-4 pb-16 pt-8 lg:px-6 lg:pt-10">
    {@render children()}
  </main>
</div>
