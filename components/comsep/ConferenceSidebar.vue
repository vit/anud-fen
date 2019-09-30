<template>
    <div>
        <ul class="sidebar-menu">
            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']">
                    О конференции {{$store.getters['wp/getCurrentComsepContextName']}}
                </nuxt-link>
            </li>
                <h3 class='menu-subheader'>Офис автора</h3>
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

            <!--li class="menu-item-incut">
                <span class="menu-text">
                    инструкции:
                    <a href="https://gn.comsep.ru/docs/Rules_for_Authors.pdf" style="padding: 0;">англ</a> / <a href="https://gn.comsep.ru/docs/Rules_for_Authors_ru.pdf" style="padding: 0;">рус</a>
                </span>
            </li>
            <li class="menu-item-incut">
                <span class="menu-text">
                    про рецензии:
                    <a href="https://gn.comsep.ru/docs/Short_Instruction_for_Authors.pdf" style="padding: 0;">англ</a> / <a href="https://gn.comsep.ru/docs/Short_Instruction_for_Authors_ru.pdf" style="padding: 0;">рус</a>
                </span>
            </li-->

                <h3 class='menu-subheader'>Офис рецензента</h3>
            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']+'r_submissions'">
                    Мои рецензии
                </nuxt-link>
            </li>

            <!--li class="menu-item-incut">
                <span class="menu-text">
                    инструкции:
                    <a href="https://gn.comsep.ru/docs/Guidelines_for_Peer_Reviewers.pdf" style="padding: 0;">англ</a> / <a href="https://gn.comsep.ru/docs/Guidelines_for_Peer_Reviewers_ru.pdf" style="padding: 0;">рус</a>
                </span>
            </li-->
                <h3 class='menu-subheader'>Офис редактора</h3>
            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']+'e_submissions'">
                    Поданные статьи
                </nuxt-link>
            </li>



        </ul>
    </div>
</template>

