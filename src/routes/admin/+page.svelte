<script lang="ts">
  import {
    requestStatusLabels,
    requestStatusOptions,
    songStatusLabels,
    songStatusOptions,
    type RequestStatus,
    type SongStatus
  } from '$lib/types';
  import type { ActionData, PageData } from './$types';

  let { data, form }: { data: PageData; form?: ActionData } = $props();

  const songStatusClass = (status: SongStatus) => {
    switch (status) {
      case 'ready':
        return 'ui-badge-accent';
      case 'learning':
        return 'ui-badge-muted';
      case 'resting':
        return 'ui-badge-soft';
    }
  };

  const requestStatusClass = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return 'ui-badge-accent';
      case 'reviewing':
        return 'ui-badge-muted';
      case 'planned':
        return 'ui-badge-neutral';
      case 'declined':
        return 'ui-badge-soft';
    }
  };
</script>

<svelte:head>
  <title>后台管理 | songlist-qk</title>
</svelte:head>

<div class="space-y-8">
  <section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
    <div class="rounded-[32px] border border-[#d6ccb8] bg-[#f6f0e4] p-7 shadow-[0_36px_96px_-48px_rgba(20,20,19,0.24)] ring-1 ring-[#fff9ef]/75 transition-colors duration-300 dark:rounded-3xl dark:border-white/10 dark:bg-[#11151D]/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:ring-white/5 dark:backdrop-blur-2xl lg:p-8">
      <div class="flex flex-wrap items-center gap-3">
        <span class="ui-pill ui-pill-md ui-pill-accent">
          后台控制台
        </span>
        <span class="ui-pill ui-pill-soft">
          {data.dashboard.backendMode === 'supabase' ? 'Supabase 数据模式' : '内存演示模式'}
        </span>
      </div>

      <h1 class="mt-4 text-3xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white lg:text-4xl">管理歌曲与愿望单</h1>
      <p class="mt-3 max-w-3xl text-sm leading-7 text-[#5e5d59] transition-colors duration-300 dark:text-slate-400 lg:text-base">
        这里优先面向桌面端管理效率设计。你可以新增或编辑歌曲、切换公开状态，并快速处理观众提交的愿望单。
      </p>

      <div class="mt-6 grid gap-4 sm:grid-cols-3">
        <div class="rounded-3xl border border-[#d8cebb] bg-[#eee4d4] p-5 shadow-[inset_0_1px_0_rgba(255,249,239,0.75)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:shadow-none">
          <p class="text-xs uppercase tracking-[0.18em] text-[#87867f] transition-colors duration-300 dark:text-slate-500">总歌曲数</p>
          <p class="mt-3 text-3xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">{data.dashboard.overview.totalSongs}</p>
        </div>
        <div class="rounded-3xl border border-[#ddd3c0] bg-[#fbf8f1] p-5 shadow-[0_12px_26px_-22px_rgba(20,20,19,0.35)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:shadow-none">
          <p class="text-xs uppercase tracking-[0.18em] text-[#87867f] transition-colors duration-300 dark:text-slate-500">公开歌曲数</p>
          <p class="mt-3 text-3xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">{data.dashboard.overview.publicSongs}</p>
        </div>
        <div class="rounded-3xl border border-[#d8cebb] bg-[#efe4d2] p-5 shadow-[0_12px_26px_-22px_rgba(20,20,19,0.35)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:shadow-none">
          <p class="text-xs uppercase tracking-[0.18em] text-[#87867f] transition-colors duration-300 dark:text-slate-500">待处理愿望</p>
          <p class="mt-3 text-3xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">{data.dashboard.overview.pendingRequests}</p>
        </div>
      </div>
    </div>

    <div class="rounded-[32px] border border-[#d6ccb8] bg-[#fbf8f1] p-6 shadow-[0_36px_96px_-48px_rgba(20,20,19,0.24)] ring-1 ring-[#fff9ef]/75 transition-colors duration-300 dark:rounded-3xl dark:border-white/10 dark:bg-[#11151D]/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:ring-white/5 dark:backdrop-blur-2xl lg:p-7">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-medium text-[#c96442] transition-colors duration-300 dark:text-[#38BDF8]">会话</p>
          <h2 class="mt-1 text-2xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">管理员操作</h2>
        </div>
        <form method="POST" action="?/logout">
          <button
            type="submit"
            class="ui-btn-secondary ui-btn-secondary-soft ui-btn-pill"
          >
            退出登录
          </button>
        </form>
      </div>

      {#if form?.adminMessage}
        <div class="mt-5 rounded-2xl border border-[#d7cdb9] bg-[#f4eddf] px-4 py-3 text-sm text-[#3d3d3a] transition-colors duration-300 dark:rounded-xl dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
          {form.adminMessage}
        </div>
      {/if}

      {#if form?.adminError}
        <div class="mt-5 rounded-2xl border border-[#b53333] bg-[#f8ebe6] px-4 py-3 text-sm text-[#b53333] transition-colors duration-300 dark:rounded-xl dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400">
          {form.adminError}
        </div>
      {/if}

      <div class="mt-6 rounded-3xl border border-[#d8cebb] bg-[#eee4d4] p-5 text-sm text-[#5e5d59] shadow-[inset_0_1px_0_rgba(255,249,239,0.75)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:text-slate-400 dark:shadow-none">
        <p class="font-medium text-[#141413] transition-colors duration-300 dark:text-white">当前数据来源</p>
        <p class="mt-2 leading-7 text-[#5e5d59] transition-colors duration-300 dark:text-slate-400">
          {data.dashboard.backendMode === 'supabase'
            ? '已接入 Supabase，增删改查会落到真实数据库。'
            : '当前使用内存演示数据。'}
        </p>
      </div>
    </div>
  </section>

  <section class="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
    <div class="rounded-[32px] border border-[#d6ccb8] bg-[#f3ebde] p-6 shadow-[0_36px_96px_-48px_rgba(20,20,19,0.24)] ring-1 ring-[#fff9ef]/75 transition-colors duration-300 dark:rounded-3xl dark:border-white/10 dark:bg-[#11151D]/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:ring-white/5 dark:backdrop-blur-2xl lg:p-7">
      <div>
        <p class="text-sm font-medium text-[#c96442] transition-colors duration-300 dark:text-[#38BDF8]">新增歌曲</p>
        <h2 class="mt-1 text-2xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">创建公开歌单条目</h2>
      </div>

      <form method="POST" action="?/saveSong" class="mt-6 space-y-4 rounded-[28px] border border-[#ddd2bf] bg-[#efe4d2] p-4 shadow-[inset_0_1px_0_rgba(255,249,239,0.75)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:shadow-none sm:p-5">
        <label class="block space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
          <span>歌曲名</span>
          <input name="title" class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-slate-600 outline-none transition-all focus:border-[#3898ec] dark:focus:border-[#38BDF8]" placeholder="例如：祝福" />
        </label>
        <label class="block space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
          <span>原唱</span>
          <input name="artist" class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-slate-600 outline-none transition-all focus:border-[#3898ec] dark:focus:border-[#38BDF8]" placeholder="例如：YOASOBI" />
        </label>
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="block space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
            <span>语言</span>
            <input name="language" class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-slate-600 outline-none transition-all focus:border-[#3898ec] dark:focus:border-[#38BDF8]" placeholder="例如：日语" />
          </label>
          <label class="block space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
            <span>状态</span>
            <select name="status" class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white outline-none transition-all focus:border-[#3898ec] dark:focus:border-[#38BDF8]">
              {#each songStatusOptions as status}
                <option value={status}>{songStatusLabels[status]}</option>
              {/each}
            </select>
          </label>
        </div>
        <label class="block space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
          <span>标签</span>
          <input name="tagsInput" class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-slate-600 outline-none transition-all focus:border-[#3898ec] dark:focus:border-[#38BDF8]" placeholder="高能, 日语, 动画" />
        </label>
        <label class="flex items-center gap-3 rounded-2xl border border-[#d8cebb] bg-[#eee4d4] px-4 py-3 text-sm text-[#4d4c48] transition-colors duration-300 dark:border-white/5 dark:bg-black/20 dark:text-slate-300">
          <input name="isPublic" type="checkbox" class="h-4 w-4 rounded dark:border-white/10 dark:bg-black/40" checked />
          <span>公开展示</span>
        </label>
        <button type="submit" class="inline-flex w-full items-center justify-center rounded-2xl bg-[#c96442] px-5 py-3.5 text-sm font-semibold text-[#faf9f5] transition-all hover:bg-[#d97757] dark:rounded-xl dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
          保存歌曲
        </button>
      </form>
    </div>

    <div class="space-y-6">
      <section class="rounded-[32px] border border-[#d6ccb8] bg-[#fbf8f1] p-6 shadow-[0_36px_96px_-48px_rgba(20,20,19,0.24)] ring-1 ring-[#fff9ef]/75 transition-colors duration-300 dark:rounded-3xl dark:border-white/10 dark:bg-[#11151D]/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:ring-white/5 dark:backdrop-blur-2xl lg:p-7">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-[#c96442] transition-colors duration-300 dark:text-[#38BDF8]">愿望单管理</p>
            <h2 class="mt-1 text-2xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">观众提交记录</h2>
          </div>
          <span class="ui-pill ui-pill-muted">
            {data.dashboard.requests.length} 条
          </span>
        </div>

        <div class="mt-6 space-y-4">
          {#each data.dashboard.requests as item}
            <article class="rounded-[28px] border border-[#d8cebb] bg-[#eee4d4] p-5 shadow-[0_18px_42px_-30px_rgba(20,20,19,0.28)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20">
              <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="text-lg font-semibold text-[#141413] transition-colors duration-300 dark:text-white">{item.songTitle}</h3>
                    <span class={`ui-badge ${requestStatusClass(item.status)}`}>
                      {requestStatusLabels[item.status]}
                    </span>
                  </div>
                  <p class="mt-2 text-sm text-[#5e5d59] transition-colors duration-300 dark:text-slate-400">原唱：{item.artist || '未填写'}</p>
                  <p class="mt-3 text-sm leading-7 text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">{item.message}</p>
                  <div class="mt-4 flex flex-wrap gap-3 text-xs text-[#87867f] dark:text-slate-500">
                    <span>提交者：{item.requesterName || '匿名'}</span>
                    <span>时间：{new Date(item.createdAt).toLocaleString('zh-CN')}</span>
                  </div>
                </div>

                <form method="POST" action="?/updateRequestStatus" class="flex w-full shrink-0 gap-3 rounded-[24px] border border-[#ddd2bf] bg-[#f6f0e4] p-3 transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 lg:w-auto lg:min-w-[260px] lg:flex-col">
                  <input type="hidden" name="id" value={item.id} />
                  <select name="status" class="min-w-0 flex-1 rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-sm text-[#141413] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white outline-none transition-all focus:border-[#3898ec] dark:focus:border-[#38BDF8]">
                    {#each requestStatusOptions as status}
                      <option value={status} selected={item.status === status}>{requestStatusLabels[status]}</option>
                    {/each}
                  </select>
                  <button type="submit" class="ui-btn-secondary">更新状态</button>
                </form>
              </div>
            </article>
          {/each}
        </div>
      </section>

      <section class="rounded-[32px] border border-[#d6ccb8] bg-[#fbf8f1] p-6 shadow-[0_36px_96px_-48px_rgba(20,20,19,0.24)] ring-1 ring-[#fff9ef]/75 transition-colors duration-300 dark:rounded-3xl dark:border-white/10 dark:bg-[#11151D]/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:ring-white/5 dark:backdrop-blur-2xl lg:p-7">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-[#c96442] transition-colors duration-300 dark:text-[#38BDF8]">歌曲列表</p>
            <h2 class="mt-1 text-2xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">已录入曲目</h2>
          </div>
          <span class="ui-pill ui-pill-muted">
            {data.dashboard.songs.length} 首
          </span>
        </div>

        <div class="mt-6 space-y-4">
          {#each data.dashboard.songs as song}
            <details class="group rounded-[28px] border border-[#d8cebb] bg-[#eee4d4] p-5 shadow-[0_18px_42px_-30px_rgba(20,20,19,0.28)] transition-colors duration-300 open:bg-[#fbf8f1] dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:open:bg-black/40">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4">
                <div class="min-w-0">
                  <h3 class="truncate text-lg font-semibold text-[#141413] dark:text-white">{song.title}</h3>
                  <p class="mt-1 truncate text-sm text-[#5e5d59] dark:text-slate-400">{song.artist} · {song.language}</p>
                </div>
                <div class="flex flex-wrap items-center justify-end gap-2">
                  <span class={`ui-badge ${songStatusClass(song.status)}`}>{songStatusLabels[song.status]}</span>
                  <span class="ui-pill ui-pill-soft">{song.isPublic ? '公开' : '隐藏'}</span>
                </div>
              </summary>

              <div class="mt-5 grid gap-5 rounded-[24px] border border-[#ddd2bf] bg-[#f6f0e4] p-4 transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 xl:grid-cols-[minmax(0,1fr)_140px]">
                <form method="POST" action="?/saveSong" class="grid gap-4 lg:grid-cols-2">
                  <input type="hidden" name="id" value={song.id} />
                  <label class="block space-y-2 text-sm font-medium text-[#4d4c48] dark:text-slate-300 lg:col-span-2">
                    <span>歌曲名</span>
                    <input name="title" value={song.title} class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white outline-none focus:border-[#3898ec] dark:focus:border-[#38BDF8]" />
                  </label>
                  <label class="block space-y-2 text-sm font-medium text-[#4d4c48] dark:text-slate-300">
                    <span>原唱</span>
                    <input name="artist" value={song.artist} class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white outline-none focus:border-[#3898ec] dark:focus:border-[#38BDF8]" />
                  </label>
                  <label class="block space-y-2 text-sm font-medium text-[#4d4c48] dark:text-slate-300">
                    <span>状态</span>
                    <select name="status" class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white outline-none focus:border-[#3898ec] dark:focus:border-[#38BDF8]">
                      {#each songStatusOptions as status}
                        <option value={status} selected={song.status === status}>{songStatusLabels[status]}</option>
                      {/each}
                    </select>
                  </label>
                  <button type="submit" class="ui-btn-secondary lg:col-span-2">保存修改</button>
                </form>
                <form method="POST" action="?/deleteSong" class="flex flex-col justify-end">
                  <input type="hidden" name="id" value={song.id} />
                  <button type="submit" class="ui-btn-secondary ui-btn-secondary-danger">删除</button>
                </form>
              </div>
            </details>
          {/each}
        </div>
      </section>
    </div>
  </section>
</div>