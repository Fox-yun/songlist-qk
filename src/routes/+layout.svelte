<script lang="ts">
  import '../app.css';

  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { onMount } from 'svelte';

  let { data, children } = $props<{ data: LayoutData; children: Snippet }>();
  let isDark = $state(false);

  onMount(() => {
    isDark = document.documentElement.classList.contains('dark');
  });

  const toggleTheme = () => {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };
</script>

<svelte:head>
  <title>songlist-qk</title>
</svelte:head>

<div class="min-h-screen">
  <div class="pointer-events-none fixed inset-0 -z-10 opacity-0 transition-opacity duration-300 dark:opacity-100">
    <div class="absolute left-[-14rem] top-[-18rem] h-[36rem] w-[36rem] rounded-full bg-[#2563eb]/20 blur-[120px]"></div>
    <div class="absolute right-[-16rem] top-24 h-[34rem] w-[34rem] rounded-full bg-[#14b8a6]/10 blur-[120px]"></div>
  </div>

  <header class="sticky top-0 z-20 border-b border-[#e6e6e6] bg-white/90 shadow-sm backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
      <a href="/" class="flex min-w-0 items-center gap-3 text-sm font-medium text-[#191a1b]">
        <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#5e6ad2] text-base font-semibold text-white shadow-sm">
          歌
        </span>
        <span class="flex flex-col">
          <span class="text-base font-semibold tracking-tight">songlist-qk</span>
          <span class="text-xs text-[#87867f] transition-colors duration-300 dark:text-slate-400">管理控制台</span>
        </span>
      </a>

      <nav class="flex flex-wrap items-center gap-2 text-sm text-[#62666d]">
        <button
          type="button"
          class="button button-neutral button-small"
          aria-pressed={isDark}
          onclick={toggleTheme}
        >
          {isDark ? '亮色' : '暗色'}
        </button>

        <a
          href="/"
          class="button button-neutral button-small"
        >
          公开歌单
        </a>

        {#if data.viewer.isAdmin}
          <a
            href="/admin"
            class="rounded-full border border-[#b05a3c] bg-[#c96442] px-4 py-2 text-[#faf9f5] shadow-[0_12px_26px_-18px_rgba(201,100,66,0.8)] transition-all hover:border-[#d97757] hover:bg-[#d97757] dark:border-transparent dark:bg-white dark:text-slate-900 dark:shadow-[0_0_15px_rgba(255,255,255,0.2)] dark:hover:bg-slate-200"
          >
            后台管理
          </a>
        {:else}
          <a href="/admin/login" class="ui-btn-secondary ui-btn-secondary-soft ui-btn-pill">
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