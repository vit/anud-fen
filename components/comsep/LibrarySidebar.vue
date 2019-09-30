<template>
    <div>
        <ul class="sidebar-menu">
            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']">
                    Библиотека
                </nuxt-link>
            </li>

            <h3 class='menu-subheader'>Sidebar библиотеки</h3>
            <p>
                Меню операций с библиотекой, информация.
            </p>


                <!--h3 class='menu-subheader'>Офис автора</h3>
            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']+'submissions'">
                    Мои статьи
                </nuxt-link>
            </li>
            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']+'submissions/new'">
                    Новая статья
                </nuxt-link>
            </li>
            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']+'participation'">
                    Мое участие
                </nuxt-link>
            </li>

                <h3 class='menu-subheader'>Офис рецензента</h3>
            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']+'r_submissions'">
                    Мои рецензии
                </nuxt-link>
            </li>

                <h3 class='menu-subheader'>Офис редактора</h3>
            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']+'e_submissions'">
                    Поданные статьи
                </nuxt-link>
            </li-->



        </ul>
    </div>
</template>

