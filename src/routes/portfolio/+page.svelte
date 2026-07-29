<script lang="ts">
    import PortfolioProject from "$lib/PortfolioProject.svelte";

    interface Props {
        data: {
            projects?: Array<{ name: string; note: string, id:number }>;
        };
    }

    let { data }: Props = $props();
    let projects = $derived(data?.projects ?? []);
</script>

<div class="flex flex-col min-h-screen bg-black text-white p-6 md:p-8">
    <h2 class="text-2xl font-bold mb-6">The things I hacked so far 🛠️</h2>

    <p class="mb-8 text-gray-400 italic">[Write a note here…]</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each projects as project (project.name)}
            <PortfolioProject name={project.name} note={project.note} id = {project.id}/>
        {/each}
    </div>
</div>
