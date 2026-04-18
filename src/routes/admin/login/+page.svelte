<script lang="ts">
  import type { ActionData, PageData } from './$types';

  let { data, form }: { data: PageData; form?: ActionData } = $props();

  const fieldClass =
    'w-full rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100';
</script>

<svelte:head>
  <title>管理员登录 | VTuber Songboard</title>
</svelte:head>

<div class="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_420px]">
  <section class="space-y-6">
    <div>
      <p class="text-sm font-medium text-teal-700">后台入口</p>
      <h1 class="mt-3 text-3xl font-semibold text-slate-950 lg:text-5xl">主播后台管理</h1>
      <p class="mt-4 max-w-2xl text-sm leading-7 text-slate-700 lg:text-base">
        维护公开歌单、处理观众愿望单，并统一管理歌曲状态。
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-xs uppercase tracking-[0.14em] text-slate-500">鉴权模式</p>
        <p class="mt-3 text-xl font-semibold text-slate-950">
          {data.authMode === 'supabase' ? 'Supabase Auth' : '演示登录'}
        </p>
        <p class="mt-2 text-sm leading-6 text-slate-600">
          {data.authMode === 'supabase'
            ? '已检测到 Supabase 配置，登录将走真实管理员账号。'
            : '当前未配置 Supabase，使用本地演示账号体验后台。'}
        </p>
      </div>

      <div class="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-xs uppercase tracking-[0.14em] text-slate-500">当前目标</p>
        <p class="mt-3 text-xl font-semibold text-slate-950">单主播 MVP</p>
        <p class="mt-2 text-sm leading-6 text-slate-600">
          先完成轻量管理流程，再接入真实后端。
        </p>
      </div>
    </div>
  </section>

  <section class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm lg:p-7">
    <div>
      <p class="text-sm font-medium text-teal-700">登录后台</p>
      <h2 class="mt-1 text-2xl font-semibold text-slate-950">管理员身份验证</h2>
    </div>

    {#if data.demoCredentials}
      <div class="mt-5 rounded-[20px] border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
        <p class="font-medium">当前为演示模式</p>
        <p class="mt-2">邮箱：{data.demoCredentials.email}</p>
        <p class="mt-1">密码：{data.demoCredentials.password}</p>
      </div>
    {/if}

    {#if form?.message}
      <div class="mt-5 rounded-[18px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {form.message}
      </div>
    {/if}

    <form method="POST" class="mt-6 space-y-4">
      <label class="block space-y-2 text-sm text-slate-700">
        <span>邮箱</span>
        <input
          name="email"
          type="email"
          value={form?.values?.email ?? ''}
          class={fieldClass}
          placeholder="admin@example.com"
        />
      </label>

      <label class="block space-y-2 text-sm text-slate-700">
        <span>密码</span>
        <input
          name="password"
          type="password"
          class={fieldClass}
          placeholder="请输入管理员密码"
        />
      </label>

      <button
        type="submit"
        class="inline-flex w-full items-center justify-center rounded-[18px] bg-gradient-to-r from-teal-400 via-lime-300 to-rose-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:brightness-105"
      >
        登录后台
      </button>
    </form>
  </section>
</div>
