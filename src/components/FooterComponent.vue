<script>
export default {
  name: "FooterComponent",
};
</script>

<template>
  <footer>
    <div class="container">
      <div>© 1997-2024 Boolflix, Inc</div>
      <div class="socials">
        <i class="fab fa-facebook"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-youtube"></i>
        <i class="fab fa-instagram"></i>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  height: 150px;
  background-color: black;
  .container {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 86%;
    color: lightgrey;
    margin: 0 auto;
    align-items: center;
    .socials svg {
      margin-left: 10px;
      font-size: 25px;
    }
  }
}
</style>
