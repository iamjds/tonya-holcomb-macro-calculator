<script>
export default {
    name: 'Loader'    
}
</script>

<template>
    <div id="loader-container" class="mt-6">
        <p class="text-2xl text-center">We are calculating your custom macro results</p>

        <div class="circ" style="--color: #612472; --size: 150px; margin: 60px auto 0;">
            <div class="circ" style="--color: #cecece; --size: 125px;">
                <div class="circ" style="--color: #9b59b6; --size: 100px;"> </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .circ {
        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 50%;
        border-bottom: 8px var(--color) solid;
        height: var(--size);
        width: var(--size);

        animation: rotation 2s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>