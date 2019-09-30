export default async function ({ store, route, redirect }) {
    const path = route.path;
    await store.dispatch('wp/loadPageDataByPath', { path });
    await store.dispatch('workflow/loadCurrentContextData', {route});
}