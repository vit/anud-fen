<template>
  <div id="app">

    <header>
        <NavbarA></NavbarA>
    </header>
    <div sstyle="padding: 10px;">
        <nuxt/>
    </div>

  </div>

</template>


<script>
  import NavbarA from '~/components/common/NavbarA.vue';

  export default {
    components: {
      NavbarA,
    },
    data() {
      return {
      }
    },
    mounted() {
//      this.$store.dispatch('user/initOnClient');
    }
  }
</script>



<style lang="scss">

@import "~/assets/variables.scss";

//$main-color: #07345b;
$main-color: $primary;

//@import url('https://fonts.googleapis.com/css?family=Russo+One&amp;subset=cyrillic');
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap&subset=cyrillic');
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800&display=swap&subset=cyrillic,cyrillic-ext');

html {
  font-size: 14px;
}

body {
  -background-color: #f7f7f7;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  margin-top: 90px;
}
#app {
//  font-family: 'Avenir', hHelvetica, aArial, sans-serif;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  //font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -text-align: center;
  -color: #2c3e50;
  -color: $main-color;
  color: #000000;
  background-color: #ffffff;

  header {
    -min-height: 100vh;
    -border: thin solid red;
    -background-image: url(http://www.elektropribor.spb.ru/upload/iblock/ec0/ec0cc4dbfe340c506228410648fee304.jpg);
    -background-origin: padding-box;
    -background-position-x: 50%;
    -background-position-y: 50%;
    -background-repeat-x: no-repeat;
    -background-repeat-y: no-repeat;
    -background-size: cover;
  }
}


.width-container {
  max-width: 1240px;
  margin: auto;
  padding: 0 20px;
//  display: block !important;
}

.clearfix {
    clear: both;
}

h1, h2, h3, h4, h5, h6 {
  clear: both;
}


h1 { 
  display: block;
  font-size: 2em;
  //font-size: 2.5em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h2 {
  display: block;
  font-size: 1.5em;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h3 { 
  display: block;
  font-size: 1.17em;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h4 { 
  display: block;
  font-size: 1em;
  margin-top: 1.33em;
  margin-bottom: 1.33em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h5 { 
  display: block;
  font-size: .83em;
  margin-top: 1.67em;
  margin-bottom: 1.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h6 { 
  display: block;
  font-size: .67em;
  margin-top: 2.33em;
  margin-bottom: 2.33em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
p {
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
}


.modal-card-title {
  margin: 0;
}

/*
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
*/
</style>

