<script lang='ts'>
    import GiPaperPlane from "svelte-icons/gi/GiPaperPlane.svelte";
    export let handleInput : any
    export let handleChange : any
    export let input : string
    export let handleSend : any
</script>

<footer
		class="fixed bottom-0 right-0 shadow-md shadow-white flex justify-center gap-2 items-center w-screen bg-stone-800 py-7"
	>
		<input
			on:keydown={handleInput}
			on:change={handleChange}
			class="w-60 outline-none rounded-full bg-stone-700 text-white placeholder:text-stone-400 p-4"
			value={input}
			type="text"
			placeholder="e.g hi there..."
		/>
		<div on:click={handleSend} class="text-stone-700 w-[50px] bg-[greenyellow] rounded-full p-3">
			<GiPaperPlane />
		</div>
	</footer>