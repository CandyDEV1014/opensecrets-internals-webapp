<template>
  <input v-if="editMode" type="text" v-model="value" v-on-click-outside="() => setEditMode(false)" ref="input">
  <span v-else @dblclick="setEditMode(true)" :style="{'background-color': changed ? '#cccccc' : 'transparent', display: 'block', width: '100%', height: '100%', 'white-space': 'nowrap', 'cursor': 'default'}" v-html="value || '&nbsp;'"></span>
</template>

<script setup>
import { defineProps, ref, watch, computed, toRef, nextTick, defineEmits } from 'vue';
import { get, set } from '@vueuse/core'
import {vOnClickOutside} from '@vueuse/components'
import axios from 'axios';
import store from '@/store';

const BASE_URL = process.env.VUE_APP_API_URL;

const emit = defineEmits(['edit'])

const editMode = ref(false)

const props = defineProps({
    id: [String, Number],
    field: String,
    text: [String, Number],
    edit: Boolean
})
const externalEdit = toRef(props, 'edit')
const externalText = toRef(props, 'text')

const text = ref(props.text)
const value = ref(get(text))
const changed = computed(() => get(text) !== get(value))
const input = ref(null)


const setEditMode = (value) => {
    set(editMode, value)
}

watch(externalText, (val) => {
    set(text, val)
})

watch(text, (val) => {
    set(value, val)
})

watch(editMode, async (val, oldVal) => {
    if ((oldVal && !val) && get(text) !== get(value)) {
        axios.defaults.headers.common["Authorization"] = store.state.sessionManager.auth_token
        const data = {}

        data[get(props.field)] = get(value)
        const response = await axios.patch(`${BASE_URL}/review_candidateperson_dupes/${props.id}`, {
            data
        });

        set(text, response.data[get(props.field)])
    }

    if (val === true) {
        nextTick(() => {
            get(input).focus()
        })
    }
    if (typeof val !== 'undefined') {
        emit('edit', val)
    }
})

watch(externalEdit, (val) => {
    set(editMode, val)
})
</script>