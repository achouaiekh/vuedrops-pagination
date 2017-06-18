<template>

    <ul class="pagination">

        <li v-if="navigation">
            <a href="link(value-1)"
               :class="{disabled: value === 1 && !cycle}"
               class="pagination__navigation prev"
               @click.prevent="previousPage"

            >
                <i class="material-icons">chevron_left</i>
            </a>
        </li>


        <li>
            <transition-group tag="ul" name="pages" class="pages">
        <li class="pages__item" v-for="n in items" :key="n">
            <a v-if="!isNaN(n)"
               :href="link(n)"
               v-text="n"
               @click.prevent="toPage(n)"
               :class="{active: value === n}"
               class="pages__link"
            ></a>

            <span v-else class="pages__more"><i class="material-icons">more_horiz</i></span>

        </li>
        </transition-group>
        </li>


        <li v-if="navigation">
            <a href="link(value+1)"
               :class="{disabled: value === length && !cycle}"
               class="pagination__navigation next"
               @click.prevent="nextPage()"
            >
                <i class="material-icons">chevron_right</i>
            </a>
        </li>

    </ul>


</template>

<script>
    export default {

        name: 'pagination',

        props: {

            href: {
                type: String,
                default: "#"
            },

            length: {
                type: Number,
                default: 1
            },

            current: {
                type: Number,
                default: 1
            },

            cycle: Boolean,

            navigation: Boolean,

            prevent: Boolean,

            shownPage: {
                type: Number,
                default: 5
            }
        },

        data(){
            return {
                value: this.current,
                shown: this.even(this.shownPage)
            }
        },

        computed: {

            items () {

                let shown = this.shown,
                    value = this.value,
                    length = this.length,
                    center = Math.ceil(shown / 2)

                if (length <= shown) return this.range(1, length)

                let min = value - center
                min = min > 0 ? min : 1

                let max = min + shown + 1
                max = max <= length ? max : length

                if (max === length)
                    min = length - shown - 1


                const range = this.range(min, max)

                if (value >= center + 1 && length > shown + 1)
                    range.splice(0, 2, 1, '...')

                if (this.value + center < length && length > shown + 1)
                    range.splice(range.length - 2, 2, '...', length)


                return range
            }
        },


        methods: {

            link(n){
                return this.href.replace('<page>', n)
            },

            range (start, end) {
                return Array.from({length: (end - start + 1)}, (v, k) => k + start);
            },

            previousPage(){
                if (this.value <= 1 && !this.cycle) return
                this.value--
                if (this.value < 1) this.value = this.length
                this.$emit("previousPage", this.value)
                return false
            },

            toPage(value){
                this.value = value
                this.$emit("toPage", this.value)
                return false
            },

            nextPage(){
                if (this.value >= this.length && !this.cycle) return

                this.value++
                if (this.value > this.length) this.value = 1

                this.$emit("nextPage", this.value)

                return false
            },

            currentPage(value){
                this.value = value
            },

            even(value){
                return value % 2 ? value : value + 1
            }
        },

        mounted(){
            this.$on('currentPage', this.currentPage)
        }
    }
</script>

<style lang="scss">
    .pagination {

        &, .pages {
            position: relative;
            list-style-type: none;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin: 0;
        }

        li {
            position: relative;
            padding: 0;
            align-items: center;
            margin: .3em;

            a, span {
                padding: 0;
                margin: 0;
                color: coral;
                text-decoration: none;

                &.active {
                    color: cornflowerblue;
                }

                &.disabled {
                    opacity: .2;
                    pointer-events: none;
                }
            }
        }
    }

    /*.pages-enter-active, .pages-leave-active {
        transition: opacity .5s
    }
    .pages-enter, .pages-leave-to !* .fade-leave-active in <2.1.8 *! {
        opacity: 0
    }*/

    .pages-move {
        transition: transform 1s;
    }


</style>
