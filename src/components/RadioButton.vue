<template>
	<template v-for="option in options" :key="option">
		<input type="radio"
			:id="option.value"
			:name="name"
			:value="option.value"
			v-model="selectedOption"
			@input="validateField"
			:class="{ 'is-invalid': errorMessage }"
			class="btn-check"
		>
		<label :for="option.value" class="btn btn-outline-secondary">{{ option.label }}</label>
	</template>
	<div v-if="errorMessage" class="form-field__error">{{ errorMessage }}</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useField } from 'vee-validate';

export default defineComponent({
	name: 'RadioButton',
	props: {
		name: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		options: {
			type: Array,
			required: true,
		},
		rules: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const { value: selectedOption, errorMessage, validate } = useField(props.name, ...props.rules);
		const validateField = () => validate(selectedOption);
		
		return {
			selectedOption,
			errorMessage,
			validateField,
		};
	},
});
</script>