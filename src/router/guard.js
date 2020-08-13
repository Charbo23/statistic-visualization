import router from './index';

router.afterEach((to) => {
  // 更新页面标题
  const metaTitle = to.meta.title || (!!to.matched[0] && to.matched[0].meta.title) || document.title;
  document.title = metaTitle;
});
