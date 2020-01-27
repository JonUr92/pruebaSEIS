<template>
    <header class="header">
        <div>
            <b-navbar toggleable="lg" type="dark" variant="dark">
                <b-navbar-brand to="/">CRUD</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse class="nav" id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <template v-for="menu in menus">
                            <b-nav-item :to="menu.url">{{ menu.textHeader }}</b-nav-item>
                        </template>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <router-view/>
    </header>
</template>
<style scoped>
    .nav .router-link-exact-active{
        background-color: #17a2b8;
        color: #FFFFFF !important;
    }
    .nav .nav-link:hover{
        background-color: #17a2b8;
        color: #FFFFFF !important;
    }
</style>
<script>
    export default {
        name: 'header',
        data(){
            return {
                menus: this.$store.state.menus
            }
        },
        components: {
            
        }
    }
</script>