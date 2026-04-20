<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { onMount } from 'svelte';

  let { data, children } = $props<{ data: LayoutData; children: Snippet }>();

  let isDark = $state(false);

  onMount(() => {
    isDark = document.documentElement.classList.contains('dark');
  });

  function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      isDark = false;
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      isDark = true;
    }
  }
</script>

<svelte:head>
  <title>songlist-qk</title>
</svelte:head>

<div class="min-h-screen">
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-opacity duration-500 dark:opacity-0">
    <div class="absolute left-[8%] top-0 h-64 w-64 rounded-full bg-[#d8c8b2]/55 blur-3xl"></div>
    <div class="absolute right-[10%] top-16 h-72 w-72 rounded-full bg-[#f4eadc]/68 blur-3xl"></div>
    <div class="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#d8ccb8]/50 blur-3xl"></div>
  </div>

  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-0 transition-opacity duration-500 dark:opacity-100">
    <div class="absolute left-[-10%] top-[-10%] h-[50rem] w-[50rem] rounded-full bg-[#0284C7]/15 blur-[120px]"></div>
    <div class="absolute right-[-5%] top-[20%] h-[40rem] w-[40rem] rounded-full bg-[#6366F1]/10 blur-[150px]"></div>
    <div class="absolute bottom-[-20%] left-[20%] h-[60rem] w-[60rem] rounded-full bg-[#0EA5E9]/10 blur-[130px]"></div>
  </div>

  <header class="sticky top-0 z-20 border-b border-[#d8cfbd] bg-[#ede6d8]/88 shadow-[0_12px_40px_-24px_rgba(20,20,19,0.28)] backdrop-blur-xl transition-colors duration-300 dark:border-white/5 dark:bg-[#090B10]/60 dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] dark:backdrop-blur-2xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-6">
      <a href="/" class="flex items-center gap-3 text-sm font-medium text-[#141413] transition-colors duration-300 dark:text-white">
        <span class="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-[#c96442] text-sm font-semibold text-[#faf9f5] shadow-[0_12px_30px_-18px_rgba(201,100,66,0.75)] ring-1 ring-[#a95437]/40 transition-all duration-300 dark:rounded-2xl dark:bg-gradient-to-br dark:from-[#38BDF8] dark:to-[#0284C7] dark:text-white dark:shadow-[0_0_20px_rgba(2,132,199,0.5)] dark:ring-white/20">
          qk
        </span>
        <span class="flex flex-col">
          <span class="text-base font-semibold tracking-tight">songlist-qk</span>
          <span class="text-xs text-[#87867f] transition-colors duration-300 dark:text-slate-400">管理控制台</span>
        </span>
      </a>

      <nav class="flex items-center gap-2 text-sm sm:gap-3">
        <button
          onclick={toggleTheme}
          class="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8cebb] bg-[#fbf8f1] text-[#4d4c48] transition-colors hover:bg-[#eee4d4] dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
          aria-label="切换亮暗主题"
        >
          {#if isDark}
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          {:else}
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          {/if}
        </button>

        <a href="/" class="ui-btn-secondary ui-btn-secondary-soft ui-btn-pill hidden sm:inline-flex">
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