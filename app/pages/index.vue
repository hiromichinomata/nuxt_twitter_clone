<template>
    <div>
        <MainSection title="Home" :loading="loading">
            {{ user }}
            <Head>
                <Title>Home / Twitter</Title>
            </Head>
        </MainSection>
    </div>
</template>
<script setup>
const { twitterBorderColor } = useTailwindConfig()
const loading = ref(true)

const { useAuthUser } = useAuth()
const user = useAuthUser()

</script>