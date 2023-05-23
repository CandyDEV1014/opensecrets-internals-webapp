<template>
    <input type="checkbox"
            :id="option.value"
            :name="name"
            :value="option.value"
            v-model="selectedOptions"
            @input="validateField"
            :class="{ 'is-invalid': errorMessage }"
            class="btn-check"
    >
    <label :for="option.value" class="btn btn-outline-secondary">{{ option.label }}</label>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    option: {
        type: Object,
        required: true,
    },
    rules: {
        type: Array,
        default: () => [],
    },
});

const { value: selectedOptions, errorMessage, validate } = useField(props.name, ...props.rules);
const validateField = () => validate(selectedOptions);

defineEmits(['update:modelValue']);
</script>