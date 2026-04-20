<script lang="ts">
  import type { ActionData, PageData } from './$types';

  let { data, form }: { data: PageData; form?: ActionData } = $props();
</script>

<svelte:head>
  <title>管理员登录 | songlist-qk</title>
</svelte:head>

<div class="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_420px]">
  <section class="rounded-[32px] border border-[#d6ccb8] bg-[#f6f0e4] p-7 shadow-[0_36px_96px_-48px_rgba(20,20,19,0.24)] ring-1 ring-[#fff9ef]/75 transition-colors duration-300 dark:rounded-3xl dark:border-white/10 dark:bg-[#11151D]/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:ring-white/5 dark:backdrop-blur-2xl lg:p-10">
    <p class="text-sm font-medium text-[#c96442] transition-colors duration-300 dark:text-[#38BDF8]">后台入口</p>
    <h1 class="mt-3 text-3xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white lg:text-5xl">主播后台管理</h1>
    <p class="mt-4 max-w-2xl text-sm leading-7 text-[#5e5d59] transition-colors duration-300 dark:text-slate-400 lg:text-base">
      在这里维护公开歌单、处理观众愿望单，并统一管理歌曲状态。当前实现兼容 Supabase 模式与本地演示模式，方便你先开发再接入真实后端。
    </p>

    <div class="mt-8 grid gap-4 sm:grid-cols-2">
      <div class="rounded-3xl border border-[#d8cebb] bg-[#eee4d4] p-5 shadow-[inset_0_1px_0_rgba(255,249,239,0.75)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:shadow-none">
        <p class="ui-pill ui-pill-muted w-fit uppercase tracking-[0.18em]">鉴权模式</p>
        <p class="mt-3 text-xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">
          {data.authMode === 'supabase' ? 'Supabase Auth' : '演示登录'}
        </p>
        <p class="mt-2 text-sm text-[#5e5d59] transition-colors duration-300 dark:text-slate-400">
          {data.authMode === 'supabase'
            ? '已检测到 Supabase 配置，登录将走真实管理员账号。'
            : '当前未配置 Supabase，使用本地演示账号体验后台。'}
        </p>
      </div>

      <div class="rounded-3xl border border-[#ddd3c0] bg-[#fbf8f1] p-5 shadow-[0_12px_26px_-22px_rgba(20,20,19,0.35)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:shadow-none">
        <p class="ui-pill ui-pill-soft w-fit uppercase tracking-[0.18em]">当前目标</p>
        <p class="mt-3 text-xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">单主播 MVP</p>
        <p class="mt-2 text-sm text-[#5e5d59] transition-colors duration-300 dark:text-slate-400">
          保持轻量全栈结构，先完成桌面优先的管理效率，再兼顾移动端可用性。
        </p>
      </div>
    </div>
  </section>

  <section class="rounded-[32px] border border-[#d6ccb8] bg-[#fbf8f1] p-6 shadow-[0_36px_96px_-48px_rgba(20,20,19,0.24)] ring-1 ring-[#fff9ef]/75 transition-colors duration-300 dark:rounded-3xl dark:border-white/10 dark:bg-[#11151D]/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:ring-white/5 dark:backdrop-blur-2xl lg:p-7">
    <div>
      <p class="text-sm font-medium text-[#c96442] transition-colors duration-300 dark:text-[#38BDF8]">登录后台</p>
      <h2 class="mt-1 text-2xl font-semibold text-[#141413] transition-colors duration-300 dark:text-white">管理员身份验证</h2>
    </div>

    {#if data.demoCredentials}
      <div class="mt-5 rounded-3xl border border-[#d8cebb] bg-[#eee4d4] p-4 text-sm text-[#4d4c48] shadow-[inset_0_1px_0_rgba(255,249,239,0.75)] transition-colors duration-300 dark:rounded-xl dark:border-white/5 dark:bg-black/20 dark:text-slate-300 dark:shadow-none">
        <p class="font-medium text-[#141413] dark:text-white">当前为演示模式</p>
        <p class="mt-2">邮箱：{data.demoCredentials.email}</p>
        <p class="mt-1">密码：{data.demoCredentials.password}</p>
      </div>
    {/if}

    {#if form?.message}
      <div class="mt-5 rounded-2xl border border-[#b53333] bg-[#f8ebe6] px-4 py-3 text-sm text-[#b53333] transition-colors duration-300 dark:rounded-xl dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400">
        {form.message}
      </div>
    {/if}

    <form method="POST" class="mt-6 space-y-4 rounded-[28px] border border-[#e2d7c5] bg-[#f1e8db] p-4 shadow-[inset_0_1px_0_rgba(255,249,239,0.75)] transition-colors duration-300 dark:rounded-2xl dark:border-white/5 dark:bg-black/20 dark:shadow-none sm:p-5">
      <label class="block space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
        <span>邮箱</span>
        <input
          name="email"
          type="email"
          value={form?.values?.email ?? ''}
          class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] shadow-[0_10px_20px_-20px_rgba(20,20,19,0.6)] outline-none transition-all placeholder:text-[#87867f] focus:border-[#3898ec] focus:bg-[#ffffff] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:shadow-none dark:placeholder:text-slate-600 dark:focus:border-[#38BDF8] dark:focus:bg-black/60 dark:focus:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
          placeholder="admin@example.com"
        />
      </label>

      <label class="block space-y-2 text-sm font-medium text-[#4d4c48] transition-colors duration-300 dark:text-slate-300">
        <span>密码</span>
        <input
          name="password"
          type="password"
          class="w-full rounded-2xl border border-[#d6ccb9] bg-[#fffdf8] px-4 py-3 text-[#141413] shadow-[0_10px_20px_-20px_rgba(20,20,19,0.6)] outline-none transition-all placeholder:text-[#87867f] focus:border-[#3898ec] focus:bg-[#ffffff] dark:rounded-xl dark:border-white/10 dark:bg-black/40 dark:text-white dark:shadow-none dark:placeholder:text-slate-600 dark:focus:border-[#38BDF8] dark:focus:bg-black/60 dark:focus:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
          placeholder="请输入管理员密码"
        />
      </label>

      <button
        type="submit"
        class="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#c96442] px-5 py-3.5 text-sm font-semibold text-[#faf9f5] shadow-[0_12px_28px_-18px_rgba(201,100,66,0.82)] ring-1 ring-[#a95437]/35 transition-all hover:bg-[#d97757] dark:rounded-xl dark:bg-white dark:text-slate-900 dark:shadow-md dark:ring-transparent dark:hover:-translate-y-[1px] dark:hover:bg-slate-200"
      >
        登录后台
      </button>
    </form>
  </section>
</div>