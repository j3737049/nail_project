<template>
  <div class="main">
    <h1>品牌故事</h1>
    <p>成立於2024年</p>
    <p>成立的初衷是希望營造一個像家一樣溫馨的美甲店</p>
    <p>以日式專業技術及可愛精神</p>
    <p>帶給每位喜歡指彩藝術的女孩</p>
    <p>同時我們致力於將美甲服務專業化</p>
    <p>期許我們的工作夥伴</p>
    <p>持續精進專業技術</p>
    <p>將美的藝術設計</p>
    <p>愉快的帶入生活及服務</p>
    <h1>產品部份</h1>
    <p>產品採用日製凝膠，施華洛世奇水晶鑽和日製手部保養產品</p>
    <img src="../assets/LINE_ALBUM_240731_16.jpg" />
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;
}
h1 {
  margin: 1rem;
  padding-bottom: 0.1rem;
  border-bottom: 1px solid;
}
@media (max-width: 768px){
  .main{
    h1{
      font-size: 1.5rem;
    }
    p{
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
      text-align: center;
      max-width: 88%;
    }
    img {
      width: 100%;
    }
  }
}
</style>
