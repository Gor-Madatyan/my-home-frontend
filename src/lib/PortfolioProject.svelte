<script lang="ts">
  import { userGithub } from "../routes/+page.svelte"
  let { project_name, note, project_id }: {project_name:string, note:string, project_id:number} = $props();
</script>

<a
  href={`https://github.com/${userGithub}/${project_name}`}
  target="_blank"
  rel="noopener noreferrer"
  class="bg-gray-950 border border-gray-800 rounded p-4 font-mono text-gray-200 max-w-sm block"
>
  <img
    src="https://opengraph.githubassets.com/{project_id}/{userGithub}/{project_name}"
    alt={project_name}
    class="w-full border border-gray-800 rounded"
  />
  {#if note}
    <p class="mt-2 text-sm">{note}</p>
  {/if}
</a>
