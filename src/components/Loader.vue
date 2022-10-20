<script>
// import { Circle10 } from 'vue-loading-spinner';
export default {
    name: 'Loader'    
}
</script>

<template>
    <div id="loader-container" class="mt-6">
        <p class="text-2xl text-center">We are calculating your custom macro results</p>

        <div class="circ" style="--color: rgb(111, 140, 222); --size: 150px;">
            <div class="circ" style="--color: rgb(248, 10, 105); --size: 125px;">
                <div class="circ" style="--color: white; --size: 100px;"> </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* .spinner.spinner--circle-10 {
        height: 100px !important;
        width: 100px !important;
        margin: 40px auto 0;
        transform: scale(2);
    }     */

    

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