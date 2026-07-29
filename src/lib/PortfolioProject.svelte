<script>
  /**
   * @param {string} name  - project name, used for alt text
   * @param {string} note  - short description displayed below the image
   */
  let { name, note } = $props();
</script>

<div
  class="bg-gray-950 border border-gray-800 rounded p-4 font-mono text-gray-200 max-w-sm"
>
  <img
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23aaa' font-family='monospace' font-size='16'%3EPreview%3C/text%3E%3C/svg%3E"
    alt={name}
    class="w-full border border-gray-800 rounded"
  />
  {#if note}
    <p class="mt-2 text-sm">{note}</p>
  {/if}
</div>
