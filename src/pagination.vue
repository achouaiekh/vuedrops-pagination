<template>

    <ul class="pagination">

        <li>
            <a href="#"
               :class="{disabled: value === 1}"
               class="pagination__navigation prev"
               @click="prev()"
            >
                <i class="material-icons">chevron_left</i>
            </a>
        </li>

        <li>
            <transition-group tag="ul" name="pages"
                              class="pages">
        <li class="pages__item" v-for="n in items" :key="n">
            <a v-if="!isNaN(n)"
               :href="link(n)"
               v-text="n"
               @click="to(n)"
               :class="{active: value === n,}"
               class="pages__link"
            ></a>

            <span v-else class="pages__more"><i class="material-icons">more_horiz</i></span>

        </li>

        </transition-group>

        </li>


        <li>
            <a href="#"
               :class="{disabled: value === length}"
               class="pagination__navigation next"
               @click="next()"
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
                default: 0
            },

            current: {
                type: Number,
                default: 0
            }
        },

        data(){
            return {
                value: this.current
            }
        },

        computed: {

            items () {

                if (this.length <= 5) return this.range(1, this.length)

                let min = this.value - 3
                min = min > 0 ? min : 1

                let max = min + 6
                max = max <= this.length ? max : this.length

                if (max === this.length) {
                    min = this.length - 6
                }

                const range = this.range(min, max)

                if (this.value >= 4 && this.length > 6) {
                    range.splice(0, 2, 1, '...')
                }

                if (this.value + 3 < this.length && this.length > 6) {
                    range.splice(range.length - 2, 2, '...', this.length)
                }

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

            prev(){
                if (this.value === 1) return
                this.value--
                this.$emit("prev")
            },

            to(value){
                this.value = value
                this.$emit("to")
            },

            next(){
                console.log(this.range(1, 7))
                if (this.value === this.length) return
                this.value++
                this.$emit("next")
            }
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
                margin:0;
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

    .pages-move {
        transition: transform 1s;
    }


</style>
