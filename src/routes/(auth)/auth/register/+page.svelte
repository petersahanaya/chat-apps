<script lang='ts'>
    import FaGoogle from 'svelte-icons/fa/FaGoogle.svelte'
    import Error from '$lib/components/Error.svelte';
    import { enhance } from '$app/forms';

    export let form: {msg : string};
    let toggle = false
    $: { 
        if(form?.msg)  {
            toggle = true

            setTimeout(() => {
                toggle = false
            }, 1500)
        }
    }

</script>

{#if toggle}
    <Error data={form.msg}/>
{/if}


<svelte:head>
    <title>Register - p3chat</title>
    <meta name="description" content="Register and find out how to meet your friend's!">
</svelte:head>

<main class='w-screen h-screen bg-stone-800 flex flex-col justify-center items-center'>
    <form method="POST" action="?/register" use:enhance class='flex flex-col justify-center items-center gap-4'>
        <nav class="mb-[3rem] w-[17rem]">
            <h4 class="text-6xl text-white mb-3">Register</h4>
            <p class='text-[.8rem] text-stone-300'>Create and account and interact with your friend's</p>
        </nav>
        <section class="flex justify-around items-center gap-1 bg-white transition-[200ms] border-[.4px] border-stone-600 rounded-lg w-[17rem] hover:bg-stone-200 p-3 ">
            <p class="text-stone-700">Login with</p>
            <button class="w-5 h-5 text-stone-700">
                <FaGoogle/>
            </button> 
        </section>
        <section class='flex flex-col justify-center gap-1'>
            <label class="text-stone-400" for="username">Username</label>
            <input minlength="4" required name='username'  class="bg-stone-700 outline-none text-white rounded-md p-3 w-[17rem] placeholder:text-[.8rem]  placeholder:text-stone-400" id="username" type="text" placeholder="e.g sarah wong">
        </section>
        <section class='flex flex-col justify-center gap-1'>
            <label class="text-stone-400" for="username">Email</label>
            <input minlength="8" required name='email' type='email' class="bg-stone-700 outline-none text-white rounded-md p-3 w-[17rem] placeholder:text-[.8rem] placeholder:text-stone-400 " id="username"  placeholder="e.g sarah@example.com">
        </section>
        <section class='flex flex-col justify-center gap-1'>
            <label class="text-stone-400" for="password">Password</label>
            <input minlength="4" required name="password" type='password' class="bg-stone-700 outline-none text-white rounded-md p-3 w-[17rem] placeholder:text-[.8rem] placeholder:text-stone-400" placeholder="e.g secret">
        </section>
            <button type="submit" class="bg-[greenyellow] text-stone-800  p-3 w-[12rem] rounded-lg text-[.9rem] transition-[200ms] hover:bg-[#a8c914]">Submit</button>

        <section class='mt-[1rem] flex justify-around items-center gap-3'>
            <p class='text-[.9rem] text-stone-300'>Already have an account?</p>
            <a class='text-sky-500 border-b-[1px] border-b-sky-600' href="/auth/login">Sign-in</a>
        </section>
    </form>
</main>
