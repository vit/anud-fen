<template>
    <div sstyle="border: 3px solid red;">
                    <b-field v-if="['email', 'password', 'text'].includes(field.type)" :label="field.label">
                        <b-input
                            :useHtml5Validation="false"
                            :type="field.type"
                            :name="field.name"
                            v-model="formData[field.name]"
                            :password-reveal="field.type=='password'"
                            :placeholder="field.placeholder || field.label || ''"
                            :ref="field.type"
                            autofocus
                            rrequired
                        >
                        </b-input>
                    </b-field>
                    <b-field v-if="['textarea'].includes(field.type)" :label="field.label" :key="field.name">
                        <b-input style="width: 100%;"
                            :useHtml5Validation="false"
                            :type="field.type"
                            :name="field.name"
                            v-model="formData[field.name]"
                            :password-reveal="field.type=='password'"
                            :pplaceholder="field.placeholder || field.label || ''"
                            :ref="field.type"
                            autofocus
                            rrequired
                            ccontenteditable
                            v-my-autosize
                        >
                        </b-input>
                    </b-field>
                    <b-checkbox
                        v-if="['checkbox'].includes(field.type)"
                        :name="field.name"
                        v-model="formData[field.name]"
                        :key="field.name"
                    >{{field.label}}</b-checkbox>
    </div>
</template>

<script>

const autosize = require('autosize')

export default {
    components: {
    },
    props: [
        'field',
        'formData'
    ],
    data () {
        return {
        };
    },

    computed: {
    },
    methods: {
    },
    mounted() {
    },
    directives: {
        'my-autosize': {
            update: function (el) {
                if("TEXTAREA"!=el.tagName)
                    el = el.getElementsByTagName("TEXTAREA");
                autosize(el);
            }
        }
    }
}
</script>

