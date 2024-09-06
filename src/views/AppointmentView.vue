<template>
  <div class="main">
    <h1>預約紀錄</h1>
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
