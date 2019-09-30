

export const state = () => ({
    mobileMenuOn: false,
})

export const mutations = {
    setMobileMenu (state, flag) {
        state.mobileMenuOn = !!flag;
    },
    toggleMobileMenu (state) {
        state.mobileMenuOn = !state.mobileMenuOn;
    },
}

