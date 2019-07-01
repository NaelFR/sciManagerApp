<template>
    <div>{{ building.address_line_1 }}</div>
</template>

<script>
export default {
    name: "building-line",  // using EXACTLY this name is essential


    props: ['building'],
}
</script>