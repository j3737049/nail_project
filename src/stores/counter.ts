import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore(
  'counter',
  () => {

    //最愛功能
    const fav = ref("");
    const getAssetsFile = (url:string) => {
        return new URL(`../assets/${url}.jpg`, import.meta.url).href
    }
    const nail_items = ref([
      { id: 1, src: getAssetsFile('LINE_ALBUM_240731_2'),categories:["universal","harry"]},
      { id: 2, src: getAssetsFile('LINE_ALBUM_240731_3'),categories: ["universal","mario"]},
      { id: 3, src: getAssetsFile('LINE_ALBUM_240731_4'),categories:["squidgame"] },
      { id: 4, src: getAssetsFile('LINE_ALBUM_240731_5'),categories:["senrio"] },
      { id: 5, src: getAssetsFile('LINE_ALBUM_240731_6'),categories:["universal","mario"] },
      { id: 6, src: getAssetsFile('LINE_ALBUM_240731_12'),categories:["disney","priness","frozen"] },
      { id: 7, src: getAssetsFile('LINE_ALBUM_240731_13'),categories:["disney","priness","littlemermaid"] },
      { id: 8, src: getAssetsFile('LINE_ALBUM_240731_14'),categories:["disney","priness","littlemermaid"] },
      { id: 9, src: getAssetsFile('LINE_ALBUM_240731_15'),categories:["disney"]},
    ])
    
    const nail_categories = ref([
      {id:'all',name:'全部'},
      {id:'universal',name:'環球'},
      {id:'harry',name:'哈利波特'},
      {id:'mario',name:'馬力歐'},
      {id:'squidgame',name:'魷魚遊戲'},
      {id:'senrio',name:'三麗鷗'},
      {id:'disney',name:'迪士尼'},
      {id:'priness',name:'公主'}
    ]);

    function changeFav(id: string) {
      console.log("old:" + fav.value);
      const arr = fav.value.split(',');
      const index = arr.indexOf(id.toString());
      if(fav.value.indexOf(id) > -1){
        arr.splice(index, 1);
      } else {
        arr.push(id);
      }
      arr.sort();
      fav.value = arr.join(',');
      console.log("add:" + fav.value);
    }
    //最愛功能end
  
    return {  fav, changeFav, nail_items, nail_categories }
  },
  {
    persist: true,
  },
)