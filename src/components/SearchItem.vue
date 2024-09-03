<script setup lang="ts">
import { ref ,computed } from 'vue'

const getAssetsFile = (url:string) => {
    return new URL(`../assets/${url}.jpg`, import.meta.url).href
}

const categories = ['全部', '環球', '哈利波特', '馬力歐', '魷魚遊戲', '三麗鷗', '迪士尼', '公主'];
const items = ref([
    { id: 1, src: getAssetsFile('LINE_ALBUM_240731_2'),categories:["環球","哈利波特"]},
    { id: 2, src: getAssetsFile('LINE_ALBUM_240731_3'),categories: ["環球","馬力歐"]},
    { id: 3, src: getAssetsFile('LINE_ALBUM_240731_4'),categories:["魷魚遊戲"] },
    { id: 4, src: getAssetsFile('LINE_ALBUM_240731_5'),categories:["三麗鷗"] },
    { id: 5, src: getAssetsFile('LINE_ALBUM_240731_6'),categories:["環球","馬力歐"] },
    { id: 6, src: getAssetsFile('LINE_ALBUM_240731_12'),categories:["迪士尼","公主","冰雪奇緣"] },
    { id: 7, src: getAssetsFile('LINE_ALBUM_240731_13'),categories:["迪士尼","公主","長髮公主"] },
    { id: 8, src: getAssetsFile('LINE_ALBUM_240731_14'),categories:["迪士尼","公主","小美人魚"] },
    { id: 9, src: getAssetsFile('LINE_ALBUM_240731_15'),categories:["迪士尼"]},
])

// 查詢輸入
const searchQuery = ref('')

// 查詢結果
const searchResults = computed(() => {
    console.log(searchQuery.value);
    if (searchQuery.value) {

        return items.value.filter((item: { categories: any[]; }) => {
            const matchesSearch = item.categories.includes(searchQuery.value.toLowerCase())
            const matchesCategory = selectedCategories.value.includes('全部') || 
            item.categories.some((cat: any) => selectedCategories.value.includes(cat));
            
            return matchesSearch && matchesCategory
        })
    } else {
        return items.value.filter((item: { categories: any[]; }) => {
            const matchesCategory = selectedCategories.value.includes('全部') || 
                item.categories.some((cat: any) => selectedCategories.value.includes(cat));
            
            return matchesCategory
        })
    }
})

const selectedCategories = ref(['全部']);
// 查詢方法
const selectCategory = (category: string) => {
    if (category === '全部') {
    selectedCategories.value = ['全部']
    } else {
    const index = selectedCategories.value.indexOf(category)
    if (index > -1) {
        selectedCategories.value.splice(index, 1)
    } else {
        selectedCategories.value.push(category)
    }
    const allIndex = selectedCategories.value.indexOf('全部')
    if (allIndex > -1) {
        selectedCategories.value.splice(allIndex, 1)
    }
    if (selectedCategories.value.length === 0) {
        selectedCategories.value = ['全部']
    }
    }
    console.log(selectedCategories)
}

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
                :key="category"
                @click="selectCategory(category)"
                :class="{ active: selectedCategories.includes(category) }"
            >
                {{ category }}
            </span>
            <!-- <span>全部</span>
            <span>迪士尼</span>
            <span>公主</span>
            <span>馬力歐</span>
            <span>哈利波特</span>
            <span>環球影城</span>
            <span>魷魚遊戲</span> -->
        </div>
        <div>
            <ul>
                <li v-for="item in searchResults" :key="item.id">
                    <img :src="item.src">
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
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
            /* color: rgb(50, 122, 151); */
        }
    }
    .typeChange{
        /* background-color: hsla(187, 100%, 37%, 0.2); */
        /* border: 1px solid hsla(187, 100%, 37%, 0.2); */
        /* border-radius: 30px; */
        /* margin-top: 1rem; */
        display: flex;
        align-items: center;
        /* overflow: hidden; */
        /* justify-content: space-around;*/
        span{
            padding: 0.5rem 0.5rem;
            line-height: 20px;
            cursor: pointer;
            margin: 0 0.5rem;
            /* border-bottom: 1px solid; */
            &:hover, &.active{
                /* background-color: hsla(187, 100%, 37%, 0.2); */
                /* background-color: #fff; */
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
            img {
                width: 260px;
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
