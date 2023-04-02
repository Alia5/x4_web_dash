<script lang="ts">
import MessageDisplay from '../components/MessageDisplay.svelte';
import SideBar from '../components/SideBar.svelte';
</script>

<div class="base-grid">
    <SideBar />
    <MessageDisplay />
</div>

<style>
  .base-grid {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 25% 1fr;
    position: absolute;
    inset: 0;
  }


  :global(html) {
    --scrollbarBG: hsla(0, 0%, 50%, 0.1);
    --thumbBG: hsla(0, 0%, 50%, 0.5);
    --textAlpha: 1;
    --textColor: rgba(255, 255, 255, var(--textAlpha));
    --colorPrimary: #273346;
    --colorPrimaryHover: #273a55;
    --colorPrimaryActive: #35598b;
    --scrollBarWidth: 0.65rem;
  }

  :global(body) {
    background-color: #22222f;
    color: var(--textColor);
    height: 100%;
    width: 100%;
    font-family: "Lato", Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
  }

  :global(p) {
    white-space: pre-line;
  }

  :global(button) {
    background-color: var(--colorPrimary);
    border: none;
    cursor: pointer;
    outline: none;
    padding: 1rem;
    color: var(--textColor);
    font-family: "Lato", Arial, Helvetica, sans-serif;
    font-size: 1em;
    border-radius: 0.5rem;
    margin: 0.25rem;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
    display: flex;
  }

  :global(button:is(:hover, :focus)) {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background-color: var(--colorPrimaryHover);
  }
  :global(button:is(:active)) {
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0);
    background-color: var(--colorPrimaryActive);
  }

  :global(::-webkit-scrollbar) {
    width: var(--scrollBarWidth);
    height: var(--scrollBarWidth);
  }
  :global(::-webkit-scrollbar-track) {
    background: transparent;
    border-radius: 100vw;
    margin-block: 0.5em;
  }
  :global(*:is(:hover, :focus)::-webkit-scrollbar-track) {
    background: var(--scrollbarBG);
  }
  :global(::-webkit-scrollbar-thumb) {
    background-color: transparent;
    border-radius: 100vw;
  }
  :global(*:is(:hover, :focus)::-webkit-scrollbar-thumb) {
    background-color: var(--thumbBG);
  }

  :global(input) {
    background-color: var(--colorPrimary);
    border: none;
    outline: none;
    padding: 0.25em 0.5em;
    color: var(--textColor);
    font-family: "Lato", Arial, Helvetica, sans-serif;
    font-size: 1em;
    border-radius: 0.5rem;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
  }

  :global(::placeholder) {
    color: var(--textColor);
    opacity: 0.5;
  }

</style>
