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

  const fieldClass =
    'w-full rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100';
  const inlineFieldClass =
    'w-full rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100';

  const songStatusClass = (status: SongStatus) => {
    switch (status) {
      case 'ready':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700';
      case 'learning':
        return 'border-amber-200 bg-amber-50 text-amber-700';
      case 'resting':
        return 'border-slate-200 bg-slate-100 text-slate-600';
    }
  };

  const requestStatusClass = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return 'border-rose-200 bg-rose-50 text-rose-700';
      case 'reviewing':
        return 'border-amber-200 bg-amber-50 text-amber-700';
      case 'planned':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700';
      case 'declined':
        return 'border-slate-200 bg-slate-100 text-slate-600';
    }
  };
</script>

<svelte:head>
  <title>后台管理 | VTuber Songboard</title>
</svelte:head>

<div class="space-y-8">
  <section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
    <div class="space-y-6">
      <div>
        <div class="flex flex-wrap items-center gap-3">
          <span class="rounded-full border border-teal-200 bg-teal-50 px-4 py-1 text-sm font-medium text-teal-800">
            后台控制台
          </span>
          <span class="rounded-full border border-slate-200 bg-white px-4 py-1 text-xs text-slate-600">
            {data.dashboard.backendMode === 'supabase' ? 'Supabase 数据模式' : '内存演示模式'}
          </span>
        </div>

        <h1 class="mt-4 text-3xl font-semibold text-slate-950 lg:text-4xl">管理歌曲与愿望单</h1>
        <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-700 lg:text-base">
          维护公开歌单、调整歌曲状态，并处理观众提交的点歌请求。
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <p class="text-xs uppercase tracking-[0.14em] text-slate-500">总歌曲数</p>
          <p class="mt-3 text-3xl font-semibold text-slate-950">{data.dashboard.overview.totalSongs}</p>
        </div>
        <div class="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <p class="text-xs uppercase tracking-[0.14em] text-slate-500">公开歌曲数</p>
          <p class="mt-3 text-3xl font-semibold text-slate-950">{data.dashboard.overview.publicSongs}</p>
        </div>
        <div class="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <p class="text-xs uppercase tracking-[0.14em] text-slate-500">待处理愿望</p>
          <p class="mt-3 text-3xl font-semibold text-slate-950">{data.dashboard.overview.pendingRequests}</p>
        </div>
      </div>
    </div>

    <div class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm lg:p-7">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-medium text-teal-700">会话</p>
          <h2 class="mt-1 text-2xl font-semibold text-slate-950">管理员操作</h2>
        </div>
        <form method="POST" action="?/logout">
          <button
            type="submit"
            class="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
          >
            退出登录
          </button>
        </form>
      </div>

      {#if form?.adminMessage}
        <div class="mt-5 rounded-[18px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {form.adminMessage}
        </div>
      {/if}

      {#if form?.adminError}
        <div class="mt-5 rounded-[18px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {form.adminError}
        </div>
      {/if}

      <div class="mt-6 rounded-[24px] border border-lime-200 bg-lime-50 p-5 text-sm text-slate-700">
        <p class="font-medium text-slate-950">当前数据来源</p>
        <p class="mt-2 leading-7 text-slate-600">
          {data.dashboard.backendMode === 'supabase'
            ? '已接入 Supabase，增删改查会落到真实数据库。'
            : '当前使用内存演示数据。你现在可以完整体验流程，刷新后数据会回到示例状态。'}
        </p>
      </div>
    </div>
  </section>

  <section class="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
    <div class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm lg:p-7">
      <div>
        <p class="text-sm font-medium text-teal-700">新增歌曲</p>
        <h2 class="mt-1 text-2xl font-semibold text-slate-950">创建公开歌单条目</h2>
      </div>

      <form method="POST" action="?/saveSong" class="mt-6 space-y-4">
        <label class="block space-y-2 text-sm text-slate-700">
          <span>歌曲名</span>
          <input name="title" class={fieldClass} placeholder="例如：祝福" />
        </label>

        <label class="block space-y-2 text-sm text-slate-700">
          <span>原唱</span>
          <input name="artist" class={fieldClass} placeholder="例如：YOASOBI" />
        </label>

        <div class="grid gap-4 sm:grid-cols-2">
          <label class="block space-y-2 text-sm text-slate-700">
            <span>语言</span>
            <input name="language" class={fieldClass} placeholder="例如：日语" />
          </label>

          <label class="block space-y-2 text-sm text-slate-700">
            <span>状态</span>
            <select name="status" class={fieldClass}>
              {#each songStatusOptions as status}
                <option value={status}>{songStatusLabels[status]}</option>
              {/each}
            </select>
          </label>
        </div>

        <label class="block space-y-2 text-sm text-slate-700">
          <span>标签（逗号分隔）</span>
          <input name="tagsInput" class={fieldClass} placeholder="例如：高能, 日语, 动画" />
        </label>

        <label class="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <input name="isPublic" type="checkbox" class="h-4 w-4 rounded border-slate-300 accent-teal-500" checked />
          <span>公开展示到前台歌单</span>
        </label>

        <button
          type="submit"
          class="inline-flex w-full items-center justify-center rounded-[18px] bg-gradient-to-r from-teal-400 via-lime-300 to-rose-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:brightness-105"
        >
          保存歌曲
        </button>
      </form>
    </div>

    <div class="space-y-6">
      <section class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm lg:p-7">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-teal-700">歌曲列表</p>
            <h2 class="mt-1 text-2xl font-semibold text-slate-950">已录入曲目</h2>
          </div>
          <span class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
            {data.dashboard.songs.length} 首
          </span>
        </div>

        <div class="mt-6 space-y-4">
          {#each data.dashboard.songs as song}
            <details class="group rounded-[24px] border border-slate-200 bg-slate-50 p-5 open:bg-white">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4">
                <div class="min-w-0">
                  <h3 class="truncate text-lg font-semibold text-slate-950">{song.title}</h3>
                  <p class="mt-1 truncate text-sm text-slate-600">{song.artist} · {song.language}</p>
                </div>
                <div class="flex flex-wrap items-center justify-end gap-2">
                  <span class={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${songStatusClass(song.status)}`}>
                    {songStatusLabels[song.status]}
                  </span>
                  <span class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                    {song.isPublic ? '公开' : '隐藏'}
                  </span>
                </div>
              </summary>

              <div class="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_140px]">
                <form method="POST" action="?/saveSong" class="grid gap-4 lg:grid-cols-2">
                  <input type="hidden" name="id" value={song.id} />

                  <label class="block space-y-2 text-sm text-slate-700 lg:col-span-2">
                    <span>歌曲名</span>
                    <input name="title" value={song.title} class={inlineFieldClass} />
                  </label>

                  <label class="block space-y-2 text-sm text-slate-700">
                    <span>原唱</span>
                    <input name="artist" value={song.artist} class={inlineFieldClass} />
                  </label>

                  <label class="block space-y-2 text-sm text-slate-700">
                    <span>语言</span>
                    <input name="language" value={song.language} class={inlineFieldClass} />
                  </label>

                  <label class="block space-y-2 text-sm text-slate-700">
                    <span>状态</span>
                    <select name="status" class={inlineFieldClass}>
                      {#each songStatusOptions as status}
                        <option value={status} selected={song.status === status}>{songStatusLabels[status]}</option>
                      {/each}
                    </select>
                  </label>

                  <label class="block space-y-2 text-sm text-slate-700">
                    <span>标签</span>
                    <input name="tagsInput" value={song.tags.join(', ')} class={inlineFieldClass} />
                  </label>

                  <label class="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 lg:col-span-2">
                    <input
                      name="isPublic"
                      type="checkbox"
                      class="h-4 w-4 rounded border-slate-300 accent-teal-500"
                      checked={song.isPublic}
                    />
                    <span>在公开歌单展示</span>
                  </label>

                  <button
                    type="submit"
                    class="inline-flex items-center justify-center rounded-[18px] border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800 transition hover:bg-teal-100 lg:col-span-2"
                  >
                    保存修改
                  </button>
                </form>

                <form method="POST" action="?/deleteSong" class="flex flex-col justify-end">
                  <input type="hidden" name="id" value={song.id} />
                  <button
                    type="submit"
                    class="inline-flex items-center justify-center rounded-[18px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
                  >
                    删除歌曲
                  </button>
                </form>
              </div>
            </details>
          {/each}
        </div>
      </section>

      <section class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm lg:p-7">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-teal-700">愿望单管理</p>
            <h2 class="mt-1 text-2xl font-semibold text-slate-950">观众提交记录</h2>
          </div>
          <span class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
            {data.dashboard.requests.length} 条
          </span>
        </div>

        <div class="mt-6 space-y-4">
          {#each data.dashboard.requests as item}
            <article class="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="break-words text-lg font-semibold text-slate-950">{item.songTitle}</h3>
                    <span class={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${requestStatusClass(item.status)}`}>
                      {requestStatusLabels[item.status]}
                    </span>
                  </div>
                  <p class="mt-2 text-sm text-slate-600">原唱：{item.artist || '未填写'}</p>
                  <p class="mt-3 text-sm leading-7 text-slate-700">{item.message}</p>
                  <div class="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span>提交者：{item.requesterName || '匿名'}</span>
                    <span>时间：{new Date(item.createdAt).toLocaleString('zh-CN')}</span>
                  </div>
                </div>

                <form method="POST" action="?/updateRequestStatus" class="flex w-full shrink-0 gap-3 lg:w-auto lg:min-w-[260px] lg:flex-col">
                  <input type="hidden" name="id" value={item.id} />
                  <select name="status" class={inlineFieldClass}>
                    {#each requestStatusOptions as status}
                      <option value={status} selected={item.status === status}>{requestStatusLabels[status]}</option>
                    {/each}
                  </select>
                  <button
                    type="submit"
                    class="inline-flex items-center justify-center rounded-[18px] border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800 transition hover:bg-teal-100"
                  >
                    更新状态
                  </button>
                </form>
              </div>
            </article>
          {/each}
        </div>
      </section>
    </div>
  </section>
</div>
