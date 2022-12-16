<script lang="ts">
  import { fly } from "svelte/transition"
    export let data : string;
</script>

<div class="bg-red-600 w-[20rem] m-auto absolute top-[10%] right-[50%] translate-x-[50%] rounded-lg p-3 shadow-lg" transition:fly="{{y : -200, duration : 600, opacity : 0}}">
    <div class='flex justify-around items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span class="text-[.8rem]">{data}</span>
    </div>
</div>