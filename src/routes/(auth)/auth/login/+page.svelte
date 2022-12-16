<script lang='ts'>
	import { enhance } from "$app/forms";
    import Error from "$lib/components/Error.svelte";
    export let form : {msg : string};
    let toggle = false

    $: {
        if(form?.msg){
            toggle = true

            setTimeout(() => {
                toggle = false
            }, 1500)
        }
    }

</script>

{#if toggle}
    <Error data={form?.msg}/>
{/if}

<svelte:head>
    <title>Login - p3chat</title>
    <meta name="description" content="Login and find out how to meet your friend's!">
</svelte:head>

<main class='w-screen h-screen bg-stone-800 flex flex-col justify-center items-center'>
    <form method="POST" action="?/login" use:enhance class='flex flex-col justify-center items-center gap-4'>
        <nav class="mb-[3rem] w-[17rem]">
            <h4 class="text-6xl text-white mb-3">Login</h4>
            <p class='text-[.8rem] text-stone-400'>Login and interact with your friend's</p>
        </nav>
        <section class='flex flex-col justify-center gap-1'>
            <label class="text-stone-400" for="username">Username</label>
            <input name="username" required class="bg-stone-700 outline-none text-white rounded-md p-3 w-[17rem] placeholder:text-[.8rem] placeholder:text-stone-400" id="username" type="text" placeholder="e.g sarah wong">
        </section>
        <section class='flex flex-col justify-center gap-1'>
            <label class="text-stone-400" for="password">Password</label>
            <input required class="bg-stone-700 text-white outline-none rounded-md p-3 w-[17rem] placeholder:text-stone-400 placeholder:text-[.8rem]" name="password" type="password" placeholder="e.g secret">
        </section>
            <button type="submit" class="bg-[greenyellow] text-stone-800 p-3 w-40 rounded-lg text-[.9rem] transition-[200ms] hover:bg-[#a8c914]">Submit</button>

        <section class='mt-[1rem] flex justify-around items-center gap-3'>
            <p class='text-[.9rem] text-stone-300'>Not register yet?</p>
            <a class='text-sky-500 border-b-[1px] border-b-sky-600' href="/auth/register">Create an Account</a>
        </section>
    </form>
</main>