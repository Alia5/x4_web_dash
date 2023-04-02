<script lang="ts">
import BasePlayerInfo from '../components/BasePlayerInfo.svelte';
</script>

<div class="base-grid">
    <div >
        <BasePlayerInfo />
    </div>

    <div  />
</div>

<style>
  .base-grid {
    display: grid;
    grid-template-columns: 1fr 3fr;
    inset: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #22222f;
    color: white;
  }
</style>
