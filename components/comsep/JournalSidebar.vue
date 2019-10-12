<template>
    <div>
        <ul class="sidebar-menu">
            <h3 class='menu-subheader'>Офис автора</h3>
            <li class="menu-item-incut">
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
            </li>

            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']+'author'">
                    Мои статьи
                </nuxt-link>
            </li>
            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']+'author/new?event=create_new_submission'">
                    Новая статья
                </nuxt-link>
            </li>
            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']+'author/archive'">
                    Мой архив
                </nuxt-link>
            </li>


            <h3 class='menu-subheader'>Офис рецензента</h3>
            <li class="menu-item-incut">
                <span class="menu-text">
                    инструкции:
                    <a href="https://gn.comsep.ru/docs/Guidelines_for_Peer_Reviewers.pdf" style="padding: 0;">англ</a> / <a href="https://gn.comsep.ru/docs/Guidelines_for_Peer_Reviewers_ru.pdf" style="padding: 0;">рус</a>
                </span>
            </li>
            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']+'reviewer'">
                    Мои рецензии
                </nuxt-link>
            </li>

            <h3 class='menu-subheader'>Офис редактора</h3>
            <li class="menu-item">
                <nuxt-link class="" :to="$store.getters['wp/getCurrentComsepContextPath']+'editor'">
                    Поданные статьи
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

