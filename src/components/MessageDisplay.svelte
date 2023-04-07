<script lang="ts">
import { fade, slide } from 'svelte/transition';
import MessagesList, { selectedMessage } from './MessagesList.svelte';
import { sidebarContent } from '../store/sidebar';
import MdiClose from '~icons/mdi/close';
    
    
sidebarContent.set(MessagesList);
    
    
</script>
        
{#if !!$selectedMessage}
    <div class="wrapper" transition:slide>
        <div class="content" transition:fade>
            <div class="title-bar">
                <h3>{$selectedMessage?.title || ''}</h3>
                <button on:click={
                    selectedMessage.clear
                }> <MdiClose /> </button>
            </div>
            <p>
                {$selectedMessage?.text || ''}
            </p>
        </div>
    </div>
{/if}
        
        
<style lang="postcss">
        .wrapper {
            height: 100%;
            width: 100%;
            overflow: hidden;
            display: grid;
            --content-padding: 2.5em;
            backdrop-filter: blur(4px);
        }
    
        .content {
            overflow: auto;
            background-color: var(--overlayBG);
            & p {
                padding: 0 var(--content-padding);
            }
        }
    
    
        .title-bar {
            position: sticky;
            inset: 0 0 auto 0;
            backdrop-filter: blur(10px);
            padding-right: 1em;
            display: grid;
            grid-template-columns: 1fr auto;
            :first-child {
                padding: 1.6em;
            }
            & button {
                margin: auto 0 auto;
                width: 4em;
                height: 4em;
                background-color: transparent;
                box-shadow: none;
                :global(svg) {
                    width: 100%;
                    height: 100%;
                }
                &:is(:hover, :focus) :global(svg) {
                    filter: drop-shadow(0 0 0.2em var(--textColor));
                }
            }
        }
    
    </style>
        
        