<script lang="ts">
  import { songStatusLabels, type Song, type SongStatus } from '$lib/types';
  import type { ActionData, PageData } from './$types';

  let { data, form }: { data: PageData; form?: ActionData } = $props();

  let query = $state('');
  let selectedLanguage = $state('all');
  let selectedTag = $state('all');
  let selectedStatus = $state<'all' | SongStatus>('all');

  const normalize = (value: string) => value.trim().toLowerCase();

  const statusClass = (status: SongStatus) => {
    switch (status) {
      case 'ready': return 'ui-badge-accent';
      case 'learning': return 'ui-badge-muted';
      case 'resting': return 'ui-badge-soft';
    }
  };

  const matchesKeyword = (song: Song, keyword: string) => {
    if (!keyword) return true;
    return [song.title, song.artist, ...song.tags].some((value) => normalize(value).includes(keyword));
  };

  const filteredSongs = $derived.by(() => {
    const keyword = normalize(query);
    return data.catalog.songs.filter((song) => {
      const matchesLanguage = selectedLanguage === 'all' || song.language === selectedLanguage;
      const matchesTag = selectedTag === 'all' || song.tags.includes(selectedTag);
      const matchesStatus = selectedStatus === 'all' || song.status === selectedStatus;
      return matchesKeyword(song, keyword) && matchesLanguage && matchesTag && matchesStatus;
    });
  });
</script>

<div class="space-y-8 lg:space-y-10">
  <section class="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_420px]">
    <div class="relative overflow-hidden rounded-[32px] border border-[#d6ccb8] bg-[#f8f4eb] p-6 shadow-[0_36px_96px_-48px_rgba(20,20,19,0.24)] ring-1 ring-[#fff9ef]/80 backdrop-blur transition-colors duration-300 dark:rounded-3xl dark:border-white/10 dark:bg-[#11151D]/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:ring-white/5 dark:backdrop-blur-2xl lg:p-8">
      <div class="relative flex flex-wrap items-center gap-3">
        <span class={`ui-pill ui-pill-md font-semibold ${data.catalog.streamer.accent}`}>
          {data.catalog.streamer.name}
        </span>
        <span class="ui-pill ui-pill-muted">
          搜索范围：歌名 / 原唱 / 标签
        </span>
        {#if data.catalog.backendMode === 'memory'}
          <span class="ui-pill ui-pill-accent">
            当前使用内存演示数据
          </span>
        {/if}
      </div>

      <div class="relative mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
        <div class="space-y-4">
          <p class="text-sm font-medium text-[#c96442] transition-colors duration-300 dark:text-[#38BDF8]">{data.catalog.streamer.tagline}</p>
          <h1 class="max-w-3xl text-4xl font-semibold tracking-tight text-[#141413] transition-colors duration-300 dark:text-white lg:text-5xl">
            主播会唱什么，一眼就找到
          </h1>
          <p class="max-w-3xl text-sm leading-7 text-[#5e5d59] transition-colors duration-300 dark:text-slate-400 lg:text-base">
            {data.catalog.streamer.description}
          </p>
        </div>

        <div class="rounded-[28px] border border-[#d9ceb9] bg-[#efe4d2] p-5 shadow-[inset_0_1px_0_rgba(255,249,239,0.75)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:shadow-inner">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#87867f] transition-colors duration-300 dark:text-slate-500">体验重点</p>
          <div class="mt-4 space-y-3 text-sm text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
            <div class="rounded-2xl border border-[#e3d8c6] bg-[#fbf8f1] px-4 py-3 shadow-[0_10px_24px_-22px_rgba(20,20,19,0.4)] transition-colors duration-300 dark:rounded-xl dark:border-white/5 dark:bg-white/[0.02] dark:shadow-none">桌面端优先的浏览效率</div>
            <div class="rounded-2xl border border-[#e3d8c6] bg-[#fbf8f1] px-4 py-3 shadow-[0_10px_24px_-22px_rgba(20,20,19,0.4)] transition-colors duration-300 dark:rounded-xl dark:border-white/5 dark:bg-white/[0.02] dark:shadow-none">公开愿望单提交无门槛</div>
            <div class="rounded-2xl border border-[#e3d8c6] bg-[#fbf8f1] px-4 py-3 shadow-[0_10px_24px_-22px_rgba(20,20,19,0.4)] transition-colors duration-300 dark:rounded-xl dark:border-white/5 dark:bg-white/[0.02] dark:shadow-none">后台支持直接对接真实库</div>
          </div>
        </div>
      </div>

      <div class="relative mt-8 grid gap-4 sm:grid-cols-3">
        <div class="rounded-[28px] border border-[#ddd3c0] bg-[#f3ebde] p-5 shadow-[0_12px_28px_-24px_rgba(20,20,19,0.36)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:shadow-none">
          <p class="text-xs uppercase tracking-[0.18em] text-[#87867f] transition-colors duration-300 dark:text-slate-500">公开曲目</p>
          <p class="mt-3 text-3xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">{data.catalog.stats.publicSongs}</p>
        </div>
        <div class="rounded-[28px] border border-[#ddd3c0] bg-[#fbf8f1] p-5 shadow-[0_12px_28px_-24px_rgba(20,20,19,0.36)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:shadow-none">
          <p class="text-xs uppercase tracking-[0.18em] text-[#87867f] transition-colors duration-300 dark:text-slate-500">待处理愿望</p>
          <p class="mt-3 text-3xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">{data.catalog.stats.pendingRequests}</p>
        </div>
        <div class="rounded-[28px] border border-[#ddd3c0] bg-[#efe4d2] p-5 shadow-[0_12px_28px_-24px_rgba(20,20,19,0.36)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:shadow-none">
          <p class="text-xs uppercase tracking-[0.18em] text-[#87867f] transition-colors duration-300 dark:text-slate-500">标签总览</p>
          <p class="mt-3 text-3xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">{data.catalog.tags.length}</p>
        </div>
      </div>

      <div class="relative mt-8 grid gap-3 sm:grid-cols-3">
        {#each data.catalog.streamer.platforms as platform}
          <a href={platform.href} target="_blank" rel="noreferrer" class="ui-btn-secondary ui-btn-secondary-soft">
            进入 {platform.label}
          </a>
        {/each}
      </div>
    </div>

    <div class="rounded-[32px] border border-[#d7cdb9] bg-[#fbf8f1] p-6 shadow-[0_36px_96px_-48px_rgba(20,20,19,0.24)] ring-1 ring-[#fff9ef]/80 backdrop-blur transition-colors duration-300 dark:rounded-3xl dark:border-white/10 dark:bg-[#11151D]/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:ring-white/5 dark:backdrop-blur-2xl lg:p-7">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-sm font-medium text-[#c96442] transition-colors duration-300 dark:text-[#38BDF8]">愿望单提交</p>
          <h2 class="mt-1 text-2xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">让主播知道你想听什么</h2>
        </div>
      </div>

      {#if form?.requestMessage}
        <div class="mt-5 rounded-2xl border border-[#d7cdb9] bg-[#f4eddf] px-4 py-3 text-sm text-[#3d3d3a] transition-colors duration-300 dark:rounded-xl dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
          {form.requestMessage}
        </div>
      {/if}

      {#if form?.requestError}
        <div class="mt-5 rounded-2xl border border-[#b53333] bg-[#f8ebe6] px-4 py-3 text-sm text-[#b53333] transition-colors duration-300 dark:rounded-xl dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400">
          {form.requestError}
        </div>
      {/if}

      <form method="POST" class="mt-5 space-y-4 rounded-[28px] border border-[#e4dac8] bg-[#f2e9dc] p-4 shadow-[inset_0_1px_0_rgba(255,249,239,0.75)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:shadow-none sm:p-5">
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
            <span>歌曲名</span>
            <input
              name="songTitle"
              value={form?.requestValues?.songTitle ?? ''}
              class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] shadow-[0_10px_20px_-20px_rgba(20,20,19,0.6)] outline-none transition-all placeholder:text-[#87867f] focus:border-[#3898ec] focus:bg-[#ffffff] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:shadow-none dark:placeholder:text-slate-600 dark:focus:border-[#38BDF8] dark:focus:bg-black/60 dark:focus:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
              placeholder="例如：群青"
            />
          </label>

          <label class="space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
            <span>原唱</span>
            <input
              name="artist"
              value={form?.requestValues?.artist ?? ''}
              class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] shadow-[0_10px_20px_-20px_rgba(20,20,19,0.6)] outline-none transition-all placeholder:text-[#87867f] focus:border-[#3898ec] focus:bg-[#ffffff] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:shadow-none dark:placeholder:text-slate-600 dark:focus:border-[#38BDF8] dark:focus:bg-black/60 dark:focus:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
              placeholder="例如：YOASOBI"
            />
          </label>
        </div>

        <label class="space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
          <span>留言</span>
          <textarea name="message" rows="4" class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] shadow-[0_10px_20px_-20px_rgba(20,20,19,0.6)] outline-none transition-all placeholder:text-[#87867f] focus:border-[#3898ec] focus:bg-[#ffffff] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:shadow-none dark:placeholder:text-slate-600 dark:focus:border-[#38BDF8] dark:focus:bg-black/60 dark:focus:shadow-[0_0_15px_rgba(56,189,248,0.15)]" placeholder="可以说说为什么想听。">{form?.requestValues?.message ?? ''}</textarea>
        </label>

        <label class="space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
          <span>你的昵称（可选）</span>
          <input
            name="requesterName"
            value={form?.requestValues?.requesterName ?? ''}
            class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] shadow-[0_10px_20px_-20px_rgba(20,20,19,0.6)] outline-none transition-all placeholder:text-[#87867f] focus:border-[#3898ec] focus:bg-[#ffffff] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:shadow-none dark:placeholder:text-slate-600 dark:focus:border-[#38BDF8] dark:focus:bg-black/60 dark:focus:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
            placeholder="例如：夜猫子"
          />
        </label>

        <button
          type="submit"
          class="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#c96442] px-5 py-3.5 text-sm font-semibold text-[#faf9f5] shadow-[0_12px_28px_-18px_rgba(201,100,66,0.82)] ring-1 ring-[#a95437]/35 transition-all hover:bg-[#d97757] dark:rounded-xl dark:bg-white dark:text-slate-900 dark:shadow-md dark:ring-transparent dark:hover:-translate-y-[1px] dark:hover:bg-slate-200"
        >
          提交愿望单
        </button>
      </form>
    </div>
  </section>

  <section class="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
    <aside class="h-fit rounded-[32px] border border-[#d6ccb8] bg-[#f3ebde] p-5 shadow-[0_30px_84px_-46px_rgba(20,20,19,0.22)] ring-1 ring-[#fff9ef]/75 backdrop-blur transition-colors duration-300 dark:rounded-3xl dark:border-white/10 dark:bg-[#11151D]/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:ring-white/5 dark:backdrop-blur-2xl lg:sticky lg:top-24 lg:p-6">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-medium text-[#c96442] transition-colors duration-300 dark:text-[#38BDF8]">公开歌单</p>
          <h2 class="mt-1 text-2xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">搜索与筛选</h2>
        </div>
      </div>

      <div class="mt-5 space-y-4 rounded-[28px] border border-[#ddd2bf] bg-[#efe4d2] p-4 shadow-[inset_0_1px_0_rgba(255,249,239,0.75)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:shadow-none">
        <label class="block space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
          <span>搜索</span>
          <input
            bind:value={query}
            class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] shadow-[0_10px_20px_-20px_rgba(20,20,19,0.6)] outline-none transition-all placeholder:text-[#87867f] focus:border-[#3898ec] focus:bg-[#ffffff] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:shadow-none dark:placeholder:text-slate-600 dark:focus:border-[#38BDF8] dark:focus:bg-black/60"
            placeholder="按歌名搜索"
          />
        </label>
        
        <label class="block space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
          <span>语言</span>
          <select bind:value={selectedLanguage} class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] shadow-[0_10px_20px_-20px_rgba(20,20,19,0.6)] outline-none transition-all focus:border-[#3898ec] focus:bg-[#ffffff] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:shadow-none dark:focus:border-[#38BDF8] dark:focus:bg-black/60">
            <option value="all">全部</option>
            {#each data.catalog.languages as language}<option value={language}>{language}</option>{/each}
          </select>
        </label>

        <label class="block space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
          <span>标签</span>
          <select bind:value={selectedTag} class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] shadow-[0_10px_20px_-20px_rgba(20,20,19,0.6)] outline-none transition-all focus:border-[#3898ec] focus:bg-[#ffffff] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:shadow-none dark:focus:border-[#38BDF8] dark:focus:bg-black/60">
            <option value="all">全部</option>
            {#each data.catalog.tags as tag}<option value={tag}>{tag}</option>{/each}
          </select>
        </label>

        <label class="block space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
          <span>当前状态</span>
          <select bind:value={selectedStatus} class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] shadow-[0_10px_20px_-20px_rgba(20,20,19,0.6)] outline-none transition-all focus:border-[#3898ec] focus:bg-[#ffffff] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:shadow-none dark:focus:border-[#38BDF8] dark:focus:bg-black/60">
            <option value="all">全部</option>
            {#each data.catalog.statuses as status}<option value={status}>{songStatusLabels[status]}</option>{/each}
          </select>
        </label>
      </div>
    </aside>

    <div class="space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-[#d6ccb8] bg-[#f6f1e6] px-5 py-4 shadow-[0_30px_84px_-46px_rgba(20,20,19,0.22)] ring-1 ring-[#fff9ef]/75 backdrop-blur transition-colors duration-300 dark:rounded-2xl dark:border-white/10 dark:bg-[#11151D]/60 dark:shadow-none dark:ring-transparent dark:backdrop-blur-2xl">
        <div>
          <p class="text-sm font-medium text-[#c96442] transition-colors duration-300 dark:text-[#38BDF8]">结果列表</p>
          <h3 class="mt-1 text-xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">按桌面端优先的信息密度展示</h3>
        </div>
        <div class="ui-pill ui-pill-md ui-pill-muted">
          命中 {filteredSongs.length} 首
        </div>
      </div>

      <div class="hidden overflow-hidden rounded-[32px] border border-[#d6ccb8] bg-[#fbf8f1] shadow-[0_30px_84px_-46px_rgba(20,20,19,0.22)] ring-1 ring-[#fff9ef]/75 transition-colors duration-300 dark:rounded-3xl dark:border-white/10 dark:bg-[#11151D]/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:ring-transparent dark:backdrop-blur-2xl lg:block">
        <div class="grid grid-cols-[minmax(0,2fr)_minmax(0,1.6fr)_120px_140px_1.7fr] gap-4 border-b border-[#ddd2bf] bg-[#f3ebde] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#7d7a72] transition-colors duration-300 dark:border-white/5 dark:bg-black/40 dark:text-slate-500">
          <div>歌曲名</div><div>原唱</div><div>语言</div><div>当前状态</div><div>标签</div>
        </div>

        {#if filteredSongs.length > 0}
          {#each filteredSongs as song, index}
            <div class={`grid grid-cols-[minmax(0,2fr)_minmax(0,1.6fr)_120px_140px_1.7fr] gap-4 px-6 py-5 transition-colors dark:hover:bg-white/5 ${index !== filteredSongs.length - 1 ? 'border-b border-[#ebe2d4] dark:border-white/5' : ''} ${index % 2 === 0 ? 'bg-[#fbf8f1] dark:bg-transparent' : 'bg-[#f7f1e6] dark:bg-black/20'}`}>
              <div><p class="text-base font-semibold text-[#141413] transition-colors duration-300 dark:text-white">{song.title}</p></div>
              <div class="text-sm text-[#4d4c48] transition-colors duration-300 dark:text-slate-400">{song.artist}</div>
              <div class="text-sm text-[#87867f] transition-colors duration-300 dark:text-slate-500">{song.language}</div>
              <div><span class={`ui-badge ${statusClass(song.status)}`}>{songStatusLabels[song.status]}</span></div>
              <div class="flex flex-wrap gap-2">
                {#each song.tags as tag}<span class="ui-pill ui-pill-muted">{tag}</span>{/each}
              </div>
            </div>
          {/each}
        {:else}
          <div class="px-6 py-16 text-center text-sm text-[#87867f] dark:text-slate-500">未找到歌曲。</div>
        {/if}
      </div>

      <div class="grid gap-4 lg:hidden">
        {#if filteredSongs.length > 0}
          {#each filteredSongs as song}
            <article class="rounded-[28px] border border-[#d6ccb8] bg-[#fbf8f1] p-5 shadow-[0_24px_64px_-38px_rgba(20,20,19,0.22)] ring-1 ring-[#fff9ef]/75 transition-colors duration-300 dark:rounded-2xl dark:border-white/10 dark:bg-[#11151D]/60 dark:shadow-none dark:ring-transparent dark:backdrop-blur-2xl">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-lg font-semibold text-[#141413] transition-colors duration-300 dark:text-white">{song.title}</h3>
                  <p class="mt-1 text-sm text-[#5e5d59] transition-colors duration-300 dark:text-slate-400">{song.artist}</p>
                </div>
                <span class={`ui-badge ${statusClass(song.status)}`}>{songStatusLabels[song.status]}</span>
              </div>
            </article>
          {/each}
        {:else}
           <div class="rounded-[28px] border border-dashed border-[#d6ccb8] bg-[#f6f0e4] px-4 py-12 text-center text-sm text-[#87867f] transition-colors duration-300 dark:rounded-2xl dark:border-white/10 dark:bg-black/20 dark:text-slate-500 dark:backdrop-blur-xl">没有相关歌曲。</div>
        {/if}
      </div>
    </div>
  </section>
</div>