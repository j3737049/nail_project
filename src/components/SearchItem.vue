
<script setup lang="ts">
import { ref ,computed } from 'vue'
import { useCounterStore } from '../stores/counter'

const counter = useCounterStore();
// const getAssetsFile = (url:string) => {
//     return new URL(`../assets/${url}.jpg`, import.meta.url).href
// }

const categories = counter.nail_categories;
const items = counter.nail_items;

console.log("items"+items)

// 查詢輸入
const searchQuery = ref('')

// 查詢結果
const searchResults = computed(() => {
    console.log(searchQuery.value);
    if (searchQuery.value) {

        return items.filter((item: { categories: any[]; }) => {
            const matchesSearch = item.categories.includes(searchQuery.value.toLowerCase())
            const matchesCategory = selectedCategories.value.includes('all') || 
            item.categories.some((cat: any) => selectedCategories.value.includes(cat));
            
            return matchesSearch && matchesCategory
        })
    } else {
        return items.filter((item: { categories: any[]; }) => {
            const matchesCategory = selectedCategories.value.includes('all') || 
                item.categories.some((cat: any) => selectedCategories.value.includes(cat));
            
            return matchesCategory
        })
    }
})

const selectedCategories = ref(['all']);
// 查詢方法
const selectCategory = (category: string) => {
    if (category === 'all') {
    selectedCategories.value = ['all']
    } else {
    const index = selectedCategories.value.indexOf(category)
    if (index > -1) {
        selectedCategories.value.splice(index, 1)
    } else {
        selectedCategories.value.push(category)
    }
    const allIndex = selectedCategories.value.indexOf('all')
    if (allIndex > -1) {
        selectedCategories.value.splice(allIndex, 1)
    }
    if (selectedCategories.value.length === 0) {
        selectedCategories.value = ['all']
    }
    }
    console.log(selectedCategories)
}


//最愛功能
const changeStatue = (id:number) => {
    counter.changeFav(id.toString());
    console.log('Component sees value as:', counter.fav);
}

const selectFav = computed( ()=>{
    console.log("change:"+counter.fav);
    return counter.fav
})

</script>

<template>
    <div class="center" style="margin-top: 2rem;">
        <div class="search">
            <input type="text" v-model="searchQuery" placeholder="請輸入想搜尋的類型">
            <!-- <span>搜尋</span> -->
        </div>
        <div class="typeChange">
            <h2>熱門推薦:</h2>
            <span 
                v-for="category in categories" 
                :key="category.id"
                @click="selectCategory(category.id)"
                :class="{ active: selectedCategories.includes(category.id) }"
            >
                {{ category.name }}
            </span>
        </div>
        <div>
            <ul>
                <li v-for="item in searchResults" :key="item.id">
                    <span @click="changeStatue(item.id)"
                :class="{ fav: selectFav.includes(item.id.toString()) }" ></span>
                    <img :src="item.src">
                </li>
            </ul>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
.center{
    display: flex;
    flex-direction: column;
    width: 800px;
    h2{
        text-align: center;
        font-weight: bold;
    }
    >div{
        margin-bottom: 1rem;
    }
    .search{
        position: relative;
        span {
            cursor: pointer;
            position: absolute;
            right: 8px;
            bottom: 6px;
            border-radius: 5px;
            padding: 7px 9px;
            background-color: hsla(187, 100%, 37%, 0.2);
        }
        input{
            padding: 1rem;
            width: 100%;
            border: 1px solid rgb(50, 122, 151);
            border-radius: 5px;
        }
    }
    .typeChange{
        display: flex;
        align-items: center;
        span{
            padding: 0.5rem 0.5rem;
            line-height: 20px;
            cursor: pointer;
            margin: 0 0.5rem;
            &:hover, &.active{
                border-bottom: 1px solid;
            }
        }
    }
    
    ul{
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
        li {
            list-style: none;
            position: relative;
            img {
                width: 260px;
            }
            span{
                position: absolute;
                width: 40px;
                height: 40px;
                right: 0;
                border-radius: 50%;
                cursor: pointer;
                &:before,&:after{
                    content:'';
                    position: absolute;
                    top: 10px;
                    width: 20px;
                    height: 30px;
                    background-color: gray;
                    border-radius: 50px 50px 0 0;
                }
                &:before{
                    right: 22px;
                    transform: rotate(-45deg);
                }
                &:after{
                    right: 15px;
                    transform: rotate(45deg);
                }
                &.fav:before,&.fav:after{
                    background-color: red;

                }
            }
        }
    }
}

@media (max-width: 768px){
    .center{
        width: 90%;
        .search{
            input{
                font-size: 0.8rem;
                padding: 0.7rem;
            }
        }
        .typeChange{
            flex-direction: row;
            flex-wrap: wrap;
            h2{
                font-size: 1.3rem;
                margin: 0;
            }
            span{
                font-size: 0.85rem;
                margin: 0 0.2rem;
            }
        }
        ul{
            li{
                img{
                    width: 100%;
                }
            }
        }
    }
}
</style>
