<template>
  <section v-if="page_data" cclass="width-container">
    <article v-if="page_data.is_singular">
      <h1 v-html="post_title"></h1>
      <div v-html="post_content"></div>
    </article>
    <div v-else>
      <article v-for="(p, index) in page_data.posts" v-bind:key="index" class="posts-list-item">
        <h1><a :href="filter_strip_base_url(p.permalink)" v-html="apply_content_filters(p.title.rendered)"></a></h1>
        <img v-if="p.thumbnail_url" :src="p.thumbnail_url">
        <div v-if="p.excerpt" v-html="apply_content_filters(p.excerpt.raw)"></div>
      </article>
    </div>
    <!--div>
      <hr style="clear: both;">
      {{$store.state.wp.page_data.path_meta.comsep_context_name}}
    </div-->
  </section>
</template>

<script>


export default {
    name: 'WpPage',
  components: {
  },
  head () {
    return {
      title: this.$store.getters['wp/getPageTitle']
    }
  },
  data() {
    return {
    }
  },
  computed: {
    page_data() {
      return this.$store.state.wp.page_data;
    },
    post_title() {
      return (
        this.page_data &&
        this.page_data.post &&
        this.page_data.post.title ?
          this.apply_content_filters( this.page_data.post.title.rendered ) :
          ""
      );
    },
    post_content() {
      return (
        this.page_data &&
        this.page_data.post &&
        this.page_data.post.content ?
          this.apply_content_filters( this.page_data.post.content.rendered ) :
          ""
      );
    },
  },
  methods: {
    apply_content_filters(content) {
      content = this.filter_strip_base_url(content);
      return content;
    },
    filter_strip_base_url(content) {
      const fake_url = "https://ewqrtqeywruetirotyioyuipoyupyu";
      if(content) {
        content = content.replace(new RegExp(process.env.ANUD_BASE_URL+'/wp', 'g'), fake_url);
        content = content.replace(new RegExp(process.env.ANUD_BASE_URL, 'g'), '');
        content = content.replace(new RegExp(fake_url, 'g'), process.env.ANUD_BASE_URL+'/wp');
      }
      return content;
    }
  }
}

// /wp-content/uploads/2019/04/IMGP3360-300x200.jpg

</script>

<style lang="scss">
.posts-list-item {
  border: thin solid gray;
  cclear: both;
  margin-bottom: 10px;
  img {
    width: 200px;
    clear: both;
  }
}
.clear:after, .wrapper:after {
  clear: both;
  -content: "@@@@@";
}

.clear:before,
.clear:after,
.wrapper:before,
.wrapper:after {
  display: table;
  content: "";
}


</style>

